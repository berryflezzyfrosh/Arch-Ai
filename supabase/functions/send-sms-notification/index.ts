import { createClient } from 'npm:@supabase/supabase-js@2';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  project_type: string;
  budget: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req: Request) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { submission }: { submission: ContactSubmission } = await req.json();

    if (!submission) {
      return new Response(
        JSON.stringify({ error: 'Missing submission data' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Format SMS message
    const smsMessage = `
🚀 NEW DREAMARCH CONTACT FORM SUBMISSION

👤 Name: ${submission.name}
📧 Email: ${submission.email}
📱 Phone: ${submission.phone}
${submission.company ? `🏢 Company: ${submission.company}` : ''}
📋 Subject: ${submission.subject}
🏗️ Project: ${submission.project_type}
💰 Budget: ${submission.budget}

💬 Message: ${submission.message}

🌐 IP: ${submission.ip_address || 'Unknown'}
📅 Time: ${new Date(submission.created_at).toLocaleString()}

Visit your dashboard to respond!
    `.trim();

    // TODO: Replace with your actual phone number
    const YOUR_PHONE_NUMBER = '+1234567890'; // REPLACE THIS WITH YOUR ACTUAL PHONE NUMBER

    // Send SMS using Twilio (you'll need to set up Twilio credentials)
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      console.log('Twilio credentials not configured. SMS message would be:', smsMessage);
      
      // For now, just log the message and return success
      // In production, you would configure Twilio credentials
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Contact form submitted successfully',
          note: 'SMS notification would be sent with proper Twilio configuration'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Send SMS via Twilio
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
    const twilioAuth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);

    const twilioResponse = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${twilioAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: YOUR_PHONE_NUMBER,
        From: twilioPhoneNumber,
        Body: smsMessage,
      }),
    });

    if (!twilioResponse.ok) {
      const errorData = await twilioResponse.text();
      console.error('Twilio error:', errorData);
      throw new Error('Failed to send SMS notification');
    }

    const twilioData = await twilioResponse.json();
    console.log('SMS sent successfully:', twilioData.sid);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted and SMS notification sent',
        sms_sid: twilioData.sid
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in send-sms-notification function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});