// Centralized types for all app data

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string; // e.g. 'Full-time', 'Part-time'
  posted_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}
