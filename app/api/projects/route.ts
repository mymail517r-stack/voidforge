import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/data';
import { Project } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const projects = await getProjects();
    const category = request.nextUrl.searchParams.get('category');
    const search = request.nextUrl.searchParams.get('search');
    const sort = request.nextUrl.searchParams.get('sort') || 'latest';

    let filtered = projects;

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sort === 'trending') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sort === 'downloads') {
      filtered.sort((a, b) => b.downloads - a.downloads);
    } else if (sort === 'likes') {
      filtered.sort((a, b) => b.likes - a.likes);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const project = await request.json();
    await createProject(project);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
