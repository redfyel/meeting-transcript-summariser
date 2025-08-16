import { useState } from "react";
import Result from "./Result";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function App() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("home");
  const [error, setError] = useState("");

  // Call backend summarize API
  const handleSummarize = async () => {
    if (!transcript.trim()) {
      alert("Please paste a transcript before summarizing.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: transcript.trim(),
          prompt:
            prompt.trim() ||
            "Summarize this meeting clearly with action items",
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const data = await res.json();
      if (!data.summary) {
        setError("No summary was generated.");
      }
      setSummary(data.summary || "");
      setView("result");
    } catch (err) {
      console.error("Summarize error:", err);
      setError("Failed to summarize. Check console for details.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>AI Meeting Notes Summarizer</h1>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setView("home")}
          className={view === "home" ? "tab active" : "tab"}
        >
          Home
        </button>
        <button
          onClick={() => setView("result")}
          className={view === "result" ? "tab active" : "tab"}
        >
          Result
        </button>
      </nav>

      {view === "home" && (
        <>
          <textarea
            placeholder="Paste transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={6}
            className="input-area"
          />

          <input
            type="text"
            placeholder="Enter custom instruction (e.g. bullet points, action items)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input-text"
          />

          <button
            onClick={handleSummarize}
            disabled={loading}
            className="btn primary"
            style={{ display: "block", margin: "10px auto" }}
          >
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>
        </>
      )}

      {view === "result" &&
        (summary ? (
          <Result
            summary={summary}
            setSummary={setSummary}
            email={email}
            setEmail={setEmail}
            goBack={() => setView("home")}
          />
        ) : (
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <p style={{ color: "red", fontWeight: "500" }}>
              Add transcript for a summary
            </p>
            <button className="btn secondary" onClick={() => setView("home")}>
              Back to Home
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;
