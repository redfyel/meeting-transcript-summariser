# AI Meeting Notes Summarizer

A full-stack application to generate and share AI-powered meeting summaries.

## Overview

This project allows users to:

- Upload meeting transcripts (text)
- Input custom summarization instructions (prompt)
- Generate a structured summary using AI (Groq Llama-3)
- Edit the generated summary
- Share the summary via email

## Approach & Process

1. **Requirements Analysis**Focused on core functionality: transcript upload, custom prompt, AI summary, editing, and email sharing.
2. **Tech Stack Selection**

   - **Frontend:** React + Vite (for rapid prototyping and simplicity)
   - **Backend:** Node.js + Express (easy API setup)
   - **AI Service:** Groq Llama-3 (fast, accurate summarization)
   - **Email:** Resend API (simple transactional email)
3. **Implementation Steps**

   - Set up backend API endpoints for summarization and email.
   - Integrate Groq for AI-powered summaries.
   - Build a minimal React frontend for transcript upload, prompt input, summary editing, and email sending.
   - Connect frontend and backend via REST API.
   - Add environment variables for API keys and configuration.
   - Test end-to-end flow.
4. **Deployment**

   - Deployed using [Vercel](https://vercel.com/) for frontend and [Render](https://render.com/) for backend.
   - Ensured CORS and environment variable security.

## Tech Stack

- **Frontend:** React 19, Vite
- **Backend:** Node.js, Express
- **AI:** Groq Llama-3 API
- **Email:** Resend API
- **Deployment:** Vercel (frontend), Render (backend)

## Usage

1. Upload or paste your meeting transcript.
2. Enter a custom instruction (e.g., "Summarize in bullet points for executives").
3. Click **Generate Summary**.
4. Edit the summary as needed.
5. Enter recipient email addresses and click **Send**.

## Running Locally

1. Clone the repo and install dependencies in both `backend` and `frontend`.
2. Add API keys to `backend/.env`.
3. Start backend (`node server.js`) and frontend (`npm run dev`).
4. Access the app at [http://localhost:5173](http://localhost:5173).

## Deployed Link

[Live Demo](https://meeting-transcript-summariser.vercel.app/)

## Demo Video
[Watch Demo](https://drive.google.com/file/d/1YGvhl4U9Sx2za6pezsQohL94HXx7dA0r/view?usp=sharing)

## License

MIT

---

**For interview review:**

- Focused on functionality and clean code.
- Minimal UI as per instructions.
- All features implemented and tested.
