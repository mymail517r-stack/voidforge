import { promises as fs } from 'fs';
import path from 'path';
import { Project, Admin, Submission, Creator } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readJsonFile<T>(filename: string): Promise<T> {
  await ensureDataDir();
  try {
    const content = await fs.readFile(path.join(DATA_DIR, filename), 'utf-8');
    const parsed = JSON.parse(content);
    
    // Handle both array and object formats
    if (Array.isArray(parsed)) {
      return parsed as T;
    } else if (parsed.projects && Array.isArray(parsed.projects)) {
      return parsed.projects as T;
    }
    
    return parsed as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return (Array.isArray(null) ? [] : {}) as T;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

// Projects
export async function getProjects(): Promise<Project[]> {
  const data = await readJsonFile<any>('projects.json');
  return Array.isArray(data) ? data : [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(p => p.slug === slug) || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(p => p.id === id) || null;
}

export async function createProject(project: Project): Promise<void> {
  const projects = await getProjects();
  const newProject = {
    ...project,
    id: project.id || Date.now().toString(),
    createdAt: project.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  projects.push(newProject);
  await writeJsonFile('projects.json', projects);
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  const projects = await getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates, updatedAt: new Date().toISOString() };
    await writeJsonFile('projects.json', projects);
  }
}

export async function deleteProject(id: string): Promise<void> {
  const projects = await getProjects();
  await writeJsonFile('projects.json', projects.filter(p => p.id !== id));
}

// Admins
export async function getAdmins(): Promise<Admin[]> {
  const data = await readJsonFile<any>('admins.json');
  return Array.isArray(data) ? data : [];
}

export async function getAdminByUsername(username: string): Promise<Admin | null> {
  const admins = await getAdmins();
  return admins.find(a => a.username === username) || null;
}

export async function createAdmin(admin: Admin): Promise<void> {
  const admins = await getAdmins();
  admins.push(admin);
  await writeJsonFile('admins.json', admins);
}

// Submissions
export async function getSubmissions(): Promise<Submission[]> {
  const data = await readJsonFile<any>('submissions.json');
  return Array.isArray(data) ? data : [];
}

export async function createSubmission(submission: Submission): Promise<void> {
  const submissions = await getSubmissions();
  submissions.push({
    ...submission,
    id: submission.id || Date.now().toString(),
    status: submission.status || 'pending',
    createdAt: new Date().toISOString(),
  });
  await writeJsonFile('submissions.json', submissions);
}

export async function updateSubmission(id: string, updates: Partial<Submission>): Promise<void> {
  const submissions = await getSubmissions();
  const index = submissions.findIndex(s => s.id === id);
  if (index !== -1) {
    submissions[index] = { ...submissions[index], ...updates };
    await writeJsonFile('submissions.json', submissions);
  }
}

// Creators
export async function getCreators(): Promise<Creator[]> {
  const data = await readJsonFile<any>('creators.json');
  return Array.isArray(data) ? data : [];
}
