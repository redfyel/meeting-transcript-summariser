const API_BASE_URL =
  "https://meeting-transcript-summariser.onrender.com" || "http://localhost:5000";

function Result({ summary, setSummary, email, setEmail, goBack }) {
  const handleSendEmail = async () => {
    if (!summary.trim() || !email.trim()) {
      alert("Please enter both summary and recipient email.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email.trim(),
          subject: "AI Meeting Summary",
          text: summary.trim(),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const data = await res.json();
      alert(data.message || "Email sent!");
    } catch (err) {
      console.error("Email error:", err);
      alert("Failed to send email. Check console for details.");
    }
  };

  return (
    <div className="card">
      <h2>Generated Summary</h2>

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={8}
        className="input-area"
      />

      {/* Instruction hint */}
      <p className="hint">
        You can also send this summary directly to your email
      </p>

      <input
        type="email"
        placeholder="Enter recipient email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-text"
      />

      <div className="actions">
        <button className="btn secondary" onClick={goBack} style={{ marginRight: "15px" }}>
          New Summary
        </button>
        <button className="btn primary" onClick={handleSendEmail}>
          Send via Email
        </button>
      </div>
    </div>
  );
}

export default Result;
