import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions, createSubmission, updateSubmission } from '@/lib/data';
import { Submission } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const submissions = await getSubmissions();
    const status = request.nextUrl.searchParams.get('status');
    
    if (status) {
      return NextResponse.json(submissions.filter(s => s.status === status));
    }
    
    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const submission: Submission = {
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...data,
    };
    await createSubmission(submission);
    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status, rejectionReason } = await request.json();
    await updateSubmission(id, { status, rejectionReason });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}
