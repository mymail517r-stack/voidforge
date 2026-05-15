import { promises as fs } from 'fs';
import path from 'path';
import { Project, Admin, Submission, Creator, Comment } from '@/types';

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
    return JSON.parse(content);
  } catch {
    return null as any;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

// Projects
export async function getProjects(): Promise<Project[]> {
  return readJsonFile<Project[]>('projects.json') || [];
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
  projects.push(project);
  await writeJsonFile('projects.json', projects);
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  const projects = await getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    await writeJsonFile('projects.json', projects);
  }
}

export async function deleteProject(id: string): Promise<void> {
  const projects = await getProjects();
  await writeJsonFile('projects.json', projects.filter(p => p.id !== id));
}

// Admins
export async function getAdmins(): Promise<Admin[]> {
  return readJsonFile<Admin[]>('admins.json') || [];
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

export async function updateAdmin(id: string, updates: Partial<Admin>): Promise<void> {
  const admins = await getAdmins();
  const index = admins.findIndex(a => a.id === id);
  if (index !== -1) {
    admins[index] = { ...admins[index], ...updates };
    await writeJsonFile('admins.json', admins);
  }
}

export async function deleteAdmin(id: string): Promise<void> {
  const admins = await getAdmins();
  await writeJsonFile('admins.json', admins.filter(a => a.id !== id));
}

// Submissions
export async function getSubmissions(): Promise<Submission[]> {
  return readJsonFile<Submission[]>('submissions.json') || [];
}

export async function createSubmission(submission: Submission): Promise<void> {
  const submissions = await getSubmissions();
  submissions.push(submission);
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
  return readJsonFile<Creator[]>('creators.json') || [];
}

export async function getCreatorByUsername(username: string): Promise<Creator | null> {
  const creators = await getCreators();
  return creators.find(c => c.username === username) || null;
}

export async function createCreator(creator: Creator): Promise<void> {
  const creators = await getCreators();
  creators.push(creator);
  await writeJsonFile('creators.json', creators);
}

export async function updateCreator(id: string, updates: Partial<Creator>): Promise<void> {
  const creators = await getCreators();
  const index = creators.findIndex(c => c.id === id);
  if (index !== -1) {
    creators[index] = { ...creators[index], ...updates };
    await writeJsonFile('creators.json', creators);
  }
}

// Comments
export async function getComments(projectId: string): Promise<Comment[]> {
  const comments = await readJsonFile<Comment[]>('comments.json') || [];
  return comments.filter(c => c.projectId === projectId);
}

export async function createComment(comment: Comment): Promise<void> {
  const comments = await readJsonFile<Comment[]>('comments.json') || [];
  comments.push(comment);
  await writeJsonFile('comments.json', comments);
}

// Analytics
export async function incrementProjectViews(projectId: string): Promise<void> {
  const project = await getProjectById(projectId);
  if (project) {
    await updateProject(projectId, { views: project.views + 1 });
  }
}

export async function incrementProjectDownloads(projectId: string): Promise<void> {
  const project = await getProjectById(projectId);
  if (project) {
    await updateProject(projectId, { downloads: project.downloads + 1 });
  }
}

export async function toggleProjectLike(projectId: string, liked: boolean): Promise<void> {
  const project = await getProjectById(projectId);
  if (project) {
    await updateProject(projectId, { likes: liked ? project.likes + 1 : Math.max(0, project.likes - 1) });
  }
}
