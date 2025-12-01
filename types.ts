export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  PROPOSAL = 'Proposal',
  NEGOTIATION = 'Negotiation',
  WON = 'Won',
  LOST = 'Lost'
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  value: number;
  status: LeadStatus;
  priority: Priority;
  createdAt: Date;
  email: string;
  avatar?: string;
  tags: string[];
}

export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Void';
  dueDate: string;
  service: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'Standup' | 'Meeting' | 'Review';
  attendees: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
