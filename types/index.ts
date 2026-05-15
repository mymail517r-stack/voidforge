export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  bio?: string;
  role: 'admin' | 'editor' | 'user';
  createdAt: string;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
  email?: string;
  role: 'Owner' | 'Admin' | 'Moderator' | 'Editor';
  createdAt: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail: string;
  screenshots: string[];
  downloadLink: string;
  category: string;
  tags: string[];
  version: string;
  fileSize: string;
  author: Creator;
  views: number;
  downloads: number;
  likes: number;
  featured: boolean;
  trending: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  changelog: string;
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  discord?: string;
  github?: string;
  instagram?: string;
  skills: string[];
  badges: string[];
  role: string;
}

export interface Submission {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  screenshots: string[];
  downloadLink: string;
  category: string;
  tags: string[];
  authorName: string;
  authorEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  rejectionReason?: string;
}

export interface Comment {
  id: string;
  projectId: string;
  authorName: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface AuthPayload {
  username: string;
  password: string;
}

export interface JWTPayload {
  username: string;
  role: string;
  iat: number;
  exp: number;
}
