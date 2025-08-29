export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string;
  subject: string;
  projectType: string;
  budget: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
}