export type View = 'landing' | 'interview' | 'report';

export interface JDInfo {
  company: string;
  department: string;
  responsibilities: string;
  skills: string[];
}

export interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}

export interface InterviewerPersona {
  id: string;
  name: string;
  type: 'professional' | 'approachable' | 'tech';
  description: string;
  image: string;
  greeting: string;
  roleDescription: string;
}
