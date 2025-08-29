# DreamArch - AI Dream Architecture Visualizer

A futuristic contact form website with SMS integration that captures visitor data and sends notifications to your phone.

## Features

- 🎨 Beautiful, futuristic design with animations
- 📱 SMS notifications for every form submission
- 🗄️ Supabase database integration
- 📊 Visitor tracking (IP address, user agent)
- 🔒 Secure form validation
- 📱 Fully responsive design
- ⚡ Real-time notifications

## Setup Instructions

### 1. Supabase Setup
1. Click "Connect to Supabase" button in the top right
2. The database tables will be created automatically via migrations

### 2. SMS Integration Setup
To receive SMS notifications when someone fills out your contact form:

1. **Sign up for Twilio** (free trial available):
   - Go to https://www.twilio.com/try-twilio
   - Create a free account
   - Get a free phone number

2. **Get your Twilio credentials**:
   - Account SID
   - Auth Token  
   - Your Twilio phone number

3. **Configure your phone number**:
   - Open `supabase/functions/send-sms-notification/index.ts`
   - Replace `+1234567890` with your actual phone number
   - Format: `+1234567890` (include country code)

4. **Add Twilio environment variables** in your Supabase project:
   - Go to your Supabase dashboard
   - Navigate to Settings > Edge Functions
   - Add these environment variables:
     - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
     - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
     - `TWILIO_PHONE_NUMBER`: Your Twilio phone number

### 3. What You'll Receive
When someone submits the contact form, you'll get an SMS with:
- 👤 Visitor's name, email, and phone
- 🏢 Company (if provided)
- 📋 Subject and project type
- 💰 Budget range
- 💬 Their message
- 🌐 IP address and timestamp
- 📱 Device information

## How It Works

1. **Visitor fills out contact form** → Data is validated and stored in Supabase
2. **SMS notification sent** → You receive instant notification on your phone
3. **Data stored securely** → All submissions are saved for follow-up

## Development

```bash
npm run dev
```

## Deployment

The website can be deployed to any hosting platform. The Supabase backend and SMS functionality will work automatically once configured.

## Security Features

- Form validation with Zod
- SQL injection protection
- Rate limiting ready
- Secure environment variable handling
- Row Level Security (RLS) enabled

## Customization

- Update your phone number in the edge function
- Modify the contact form fields as needed
- Customize the SMS message format
- Add additional validation rules