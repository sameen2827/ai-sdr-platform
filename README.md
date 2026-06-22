AI SDR Platform
Overview

AI SDR Platform is an AI-powered Sales Development Representative (SDR) system that automates lead qualification, lead capture, CRM management, email follow-ups, and meeting booking.

The platform combines conversational AI with workflow automation to help businesses generate, qualify, and nurture leads automatically.

Features
AI Sales Agent
Conversational AI powered by Groq LLM
Real-time lead qualification
Sales-focused conversations
Captures customer requirements
Lead Extraction

Automatically extracts:

Name
Email
Phone Number
Company
Service Required
Budget
Timeline
Lead Scoring

Automatic lead scoring based on:

Email availability
Phone availability
Budget availability
Timeline availability
Company information

Maximum Score: 100

CRM Dashboard

Provides:

Total Leads
New Leads
Qualified Leads
Won Leads
Lost Leads
Lead Management
View all leads
Update lead status
Delete leads
Track sales pipeline
Email Automation

Powered by n8n workflows:

New lead notifications
Automated follow-up emails
Lead nurturing sequence
Meeting Booking

Integrated with Calendly:

One-click meeting scheduling
Automatic calendar invitations
Sales consultation booking
System Workflow

Visitor
→ AI Chat Agent
→ Lead Qualification
→ Lead Extraction
→ Lead Scoring
→ Save to NeonDB
→ Trigger n8n Workflow
→ Send Follow-up Email
→ Book Calendly Meeting
→ CRM Dashboard

Tech Stack
Frontend
Next.js 16
React
TypeScript
Tailwind CSS
Backend
Next.js API Routes
Groq SDK
Database
Neon PostgreSQL
Automation
n8n
Scheduling
Calendly
Deployment
GitHub
Vercel
Project Structure

app/

├── api/

│ ├── chat/

│ ├── extract-lead/

│ ├── leads/

│ └── proposal/

│

├── chat/

├── dashboard/

│ ├── leads/

│ └── lead/[id]/

│

├── components/

├── data/

└── lib/

API Routes
POST /api/chat

Handles AI conversations using Groq.

POST /api/extract-lead

Extracts structured lead information from conversations.

GET /api/leads

Fetch all leads.

POST /api/leads

Save lead to database and trigger n8n workflow.

Environment Variables

Create a .env.local file:

GROQ_API_KEY=YOUR_GROQ_API_KEY

DATABASE_URL=YOUR_NEON_DATABASE_URL
Installation

Clone repository:

git clone https://github.com/sameen2827/ai-sdr-platform.git

Install dependencies:

npm install

Run development server:

npm run dev

Open:

http://localhost:3000
Deployment
GitHub
git add .
git commit -m "Initial Release"
git push origin main
Vercel
Import GitHub Repository
Add Environment Variables
Deploy
Integrations
Groq AI

Used for:

Conversational AI
Lead qualification
Lead extraction
NeonDB

Used for:

Lead storage
CRM data management
n8n

Used for:

Workflow automation
Email follow-ups
Lead notifications
Calendly

Used for:

Meeting scheduling
Consultation booking
Future Enhancements
Voice AI Agent
WhatsApp Integration
Proposal Generator
AI Email Personalization
Sales Analytics Dashboard
Multi-Agent System
Role-Based Access Control
Lead Forecasting