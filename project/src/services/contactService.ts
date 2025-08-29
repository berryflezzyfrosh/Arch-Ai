import { supabase } from '../lib/supabase';
import { ContactFormData, ContactSubmission } from '../types/contact';

export class ContactService {
  static async submitContact(data: ContactFormData): Promise<ContactSubmission> {
    try {
      // Get visitor information
      const visitorInfo = {
        ip_address: await this.getVisitorIP(),
        user_agent: navigator.userAgent,
      };

      // Insert contact submission into database
      const { data: submission, error } = await supabase
        .from('contact_submissions')
        .insert([{
          ...data,
          ...visitorInfo,
        }])
        .select()
        .single();

      if (error) throw error;

      // Send SMS notification
      await this.sendSMSNotification(submission);

      return submission;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to submit contact form. Please try again.');
    }
  }

  private static async getVisitorIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'Unknown';
    }
  }

  private static async sendSMSNotification(submission: ContactSubmission): Promise<void> {
    try {
      const { data, error } = await supabase.functions.invoke('send-sms-notification', {
        body: { submission }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sending SMS notification:', error);
      // Don't throw here - we still want the form submission to succeed
      // even if SMS fails
    }
  }
}