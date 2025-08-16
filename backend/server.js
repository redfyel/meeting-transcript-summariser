import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);



const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN.split(",")
}));
app.use(bodyParser.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Summarizer
app.post("/summarize", async (req, res) => {
  try {
    const { transcript, prompt } = req.body;

    if (!transcript || !prompt) {
      return res.status(400).json({ error: "Transcript and prompt are required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an AI meeting notes summarizer." },
        { role: "user", content: `Transcript: ${transcript}\n\nInstruction: ${prompt}` },
      ],
    });

    const summary = completion.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error("Error with Groq API:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

// Email
app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    const data = await resend.emails.send({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
    });

    res.json({ message: "Email sent successfully", data });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
