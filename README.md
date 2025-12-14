# Balance

Balance is a web-based AI assistant with two interaction modes — **Reflect** and **Focus** — built to explore how tone, intent, and context shape chat-based user experiences.

---

## What Balance Does

- Chat-based AI interface with switchable modes
- **Reflect Mode** → supportive, journaling-style responses
- **Focus Mode** → direct, task-oriented responses
- Optional **Canvas integration** to provide course-aware responses
- Shared UI with mode-specific backend behavior

---

## Tech Stack

**Frontend**
- React
- TypeScript
- Tailwind CSS

**Backend**
- Node.js
- Express

**Auth & Data**
- Supabase

**AI**
- OpenAI API

**Integrations**
- Canvas LMS API

---

## Architecture (High-Level)

- React frontend sends chat messages to an Express API
- Requests are routed by active mode (Reflect vs Focus)
- Focus Mode can optionally fetch Canvas course data using a user-provided API key
- Canvas API keys are stored securely per user
- Each mode applies different prompting and response logic
- Supabase handles authentication and user data
- Responses are returned and rendered in the chat UI

---

## Project Structure

```txt
frontend/
  ├── components/
  ├── pages/
  ├── auth/
  └── styles/

backend/
  ├── routes/
  ├── controllers/
  ├── services/
  └── app.js
```
---
## Local Setup
Prerequisites:

Node.js (v18+ recommended)
npm
Supabase project
OpenAI API key
Canvas API key (per user)

1. Clone the Repository
```bash

git clone https://julieamononce/Balance--Final-Project
cd balance
```
3. Install Dependencies
```bash
cd frontend
npm install
cd ../backend
npm install
```
3. Environment Variables

Create a .env file in both frontend/ and backend/.
backend/.env
```bash
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=5001
```
frontend/.env
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_anon_public_key
VITE_API_BASE_URL=http://localhost:5001
```
4. Canvas API Setup (Optional)

Focus Mode can use Canvas data (courses, assignments) to generate more context-aware responses. Generate a Canvas API key from your institution’s Canvas settings. Enter the API key in the app when prompted. The key is stored securely and associated with your user account. Focus Mode uses this key to fetch course-specific data as needed. No Canvas data is fetched unless a user explicitly provides a key.

5. Run the App

Backend:
```bash

cd backend
npm run dev
```
Frontend (new terminal):
```bash

cd frontend
npm run dev
````
Frontend:
http://localhost:5173
Backend:
http://localhost:5001

---
## Current Status
- Core chat flow implemented
- Reflect and Focus modes separated at the backend
- Supabase authentication working
- Canvas API integration partially implemented
- Some planned features (e.g., long-term conversation memory) are incomplete
  
--- 
## Authors
#Carlyce McIntosh
#Julie Amon

##Disclaimer
This project is experimental and not production-ready. APIs, prompts, and integrations may change.
