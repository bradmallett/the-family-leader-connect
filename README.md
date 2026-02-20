
# The Family Leader – Email Grouping Web App (Demo)

Live Demo:
[https://the-family-leader-connect.vercel.app/](https://the-family-leader-connect.vercel.app/)


## Overview

This is a full-stack internal web application built to organize and send targeted emails to state legislators.

The application allows admin users to:
- Filter and group legislators by district, county, party, or chamber
- Create dynamic recipient groups
- Build and manage reusable email templates
- Enable constituents to send messages to multiple legislators through a single form submission
- This demo version showcases the core architecture and feature set.


## Demo Login

- Username: bmallett2@gmail.com
- Password: bmallett2

(Note: This is a demo environment. Email sending is simulated.)


## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Supabase (PostgreSQL)
- SendGrid (email service)
- Vercel (deployment)


## Architecture Highlights

- Server Actions for secure data mutations
- Dynamic form generation
- Full vertical slice from UI → Server → Database → Email service
- Admin form activation toggle (is_active) with server-side enforcement


## Key Features

- Admin dashboard to create and manage forms
- Legislator filtering + grouping system
- Constituent submission tracking
- Email template reuse 
- Active/inactive form control with both client and server validation
- Production deployment workflow using feature branches + preview builds