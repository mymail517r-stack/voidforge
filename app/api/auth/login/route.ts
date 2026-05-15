import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    console.log('Login attempt:', { username, adminUsername });
    console.log('Password match:', password === adminPassword);

    // Validate credentials
    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials. Use admin / admin123' },
        { status: 401 }
      );
    }

    // Create a simple token (just a base64 encoded string for demo)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    
    // Create response
    const response = NextResponse.json(
      { success: true, message: 'Login successful', token },
      { status: 200 }
    );

    // Set secure cookie with token
    response.cookies.set('vf_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
