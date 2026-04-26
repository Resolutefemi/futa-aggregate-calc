import { useState } from "react";

const GRADE_POINTS = { A1: 80, B2: 72, B3: 67, C4: 62, C5: 57, C6: 52 };
const GRADE_OPTIONS = ["A1", "B2", "B3", "C4", "C5", "C6"];

const SUBJECTS = [
  "English Language", "Mathematics", "Physics", "Chemistry", "Biology",
  "Further Mathematics", "Agricultural Science", "Economics", "Geography",
  "Technical Drawing", "Computer Studies", "Civic Education", "Literature in English",
  "Government", "Commerce", "Accounting", "French", "Yoruba", "Igbo", "Hausa",
  "Food & Nutrition", "Home Economics", "Visual Arts", "Music", "Physical Education",
];

const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0D0500 0%, #1A0A02 40%, #0F0300 100%)",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#F5ECD7",
    padding: "0 0 60px 0",
  },
  headerBg: {
    background: "linear-gradient(180deg, #1A0800 0%, #2C1205 60%, #3D1A08 100%)",
    borderBottom: "2px solid #C9A227",
    padding: "28px 20px 22px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 4px 30px rgba(201,162,39,0.15)",
  },
  ornament: {
    color: "#C9A227",
    fontSize: "18px",
    letterSpacing: "6px",
    display: "block",
    marginBottom: "4px",
  },
  academy: {
    fontSize: "11px",
    fontFamily: "'Georgia', serif",
    letterSpacing: "4px",
    textTransform: "uppercase",
    color: "#C9A227",
    fontWeight: "bold",
    marginBottom: "6px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#F5ECD7",
    margin: "0 0 4px",
    lineHeight: 1.2,
    textShadow: "0 2px 10px rgba(201,162,39,0.4)",
  },
  titleAccent: {
    color: "#C9A227",
  },
  subtitle: {
    fontSize: "12px",
    color: "#A07840",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  badge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #8B1A1A, #6B1010)",
    border: "1px solid #C9A227",
    borderRadius: "20px",
    padding: "3px 14px",
    fontSize: "11px",
    color: "#F5ECD7",
    letterSpacing: "1px",
    marginTop: "10px",
  },
  container: {
    maxWidth: "480px",
    margin: "0 auto",
    padding: "0 16px",
  },
  sectionCard: {
    background: "linear-gradient(145deg, #1E0C04, #2A1208)",
    border: "1px solid rgba(201,162,39,0.3)",
    borderRadius: "16px",
    padding: "20px",
    marginTop: "20px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,162,39,0.1)",
  },
  sectionTitle: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#C9A227",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  pill: {
    background: "#8B1A1A",
    borderRadius: "10px",
    padding: "2px 8px",
    fontSize: "10px",
    color: "#F5ECD7",
    fontWeight: "normal",
    letterSpacing: "0px",
  },
  inputGroup: {
    marginBottom: "14px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    color: "#A07840",
    marginBottom: "6px",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    background: "rgba(201,162,39,0.06)",
    border: "1px solid rgba(201,162,39,0.3)",
    borderRadius: "10px",
    padding: "12px 14px",
    color: "#F5ECD7",
    fontSize: "16px",
    fontFamily: "'Georgia', serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  subjectRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "8px",
    marginBottom: "10px",
    alignItems: "center",
  },
  select: {
    background: "rgba(20,8,2,0.9)",
    border: "1px solid rgba(201,162,39,0.3)",
    borderRadius: "10px",
    padding: "11px 12px",
    color: "#F5ECD7",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  gradeSelect: {
    background: "rgba(20,8,2,0.9)",
    border: "1px solid rgba(201,162,39,0.3)",
    borderRadius: "10px",
    padding: "11px 8px",
    color: "#C9A227",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    fontWeight: "bold",
    outline: "none",
    width: "72px",
  },
  subjectNum: {
    fontSize: "11px",
    color: "#A07840",
    marginBottom: "5px",
    letterSpacing: "1px",
  },
  calcBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #8B1A1A 0%, #C9A227 50%, #8B1A1A 100%)",
    backgroundSize: "200% 100%",
    border: "none",
    borderRadius: "14px",
    padding: "16px",
    fontSize: "15px",
    fontWeight: "bold",
    color: "#0D0500",
    fontFamily: "'Georgia', serif",
    letterSpacing: "2px",
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: "22px",
    boxShadow: "0 6px 20px rgba(201,162,39,0.3)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  resultCard: {
    background: "linear-gradient(145deg, #1A0800, #2A1408)",
    border: "2px solid #C9A227",
    borderRadius: "16px",
    padding: "22px",
    marginTop: "20px",
    boxShadow: "0 8px 40px rgba(201,162,39,0.2), inset 0 1px 0 rgba(201,162,39,0.2)",
  },
  resultTitle: {
    textAlign: "center",
    fontSize: "12px",
    color: "#C9A227",
    letterSpacing: "3px",
    textTransform: "uppercase",
    marginBottom: "18px",
  },
  scoreGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "16px",
  },
  scoreBox: {
    background: "rgba(201,162,39,0.07)",
    border: "1px solid rgba(201,162,39,0.25)",
    borderRadius: "12px",
    padding: "14px 12px",
    textAlign: "center",
  },
  scoreLabel: {
    fontSize: "10px",
    color: "#A07840",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "6px",
  },
  scoreVal: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#C9A227",
  },
  divider: {
    border: "none",
    borderTop: "1px solid rgba(201,162,39,0.25)",
    margin: "14px 0",
  },
  totalBox: {
    textAlign: "center",
    padding: "14px",
    background: "linear-gradient(135deg, rgba(139,26,26,0.3), rgba(201,162,39,0.15))",
    borderRadius: "12px",
    border: "1px solid rgba(201,162,39,0.4)",
  },
  totalLabel: {
    fontSize: "11px",
    color: "#A07840",
    letterSpacing: "2px",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "6px",
  },
  totalVal: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#F5ECD7",
    lineHeight: 1,
    textShadow: "0 0 20px rgba(201,162,39,0.5)",
  },
  statusBadge: {
    display: "inline-block",
    borderRadius: "20px",
    padding: "5px 16px",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1.5px",
    marginTop: "10px",
    textTransform: "uppercase",
  },
  socialSection: {
    marginTop: "22px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  socialBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px 10px",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "bold",
    fontFamily: "'Georgia', serif",
    letterSpacing: "0.5px",
    transition: "transform 0.15s",
  },
  waBtn: {
    background: "linear-gradient(135deg, #1A3C1A, #25531E)",
    border: "1px solid #3DBF3D",
    color: "#7FED7F",
  },
  tgBtn: {
    background: "linear-gradient(135deg, #0A2A40, #0F3A5C)",
    border: "1px solid #2D9DD4",
    color: "#7DD3F7",
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "11px",
    color: "#5A3820",
    letterSpacing: "1px",
  },
  errorText: {
    color: "#E05555",
    fontSize: "12px",
    marginTop: "4px",
  },
};

export default function FUTACalculator() {
  const [jamb, setJamb] = useState("");
  const [subjects, setSubjects] = useState(
    Array(5).fill(null).map(() => ({ name: "", grade: "B2" }))
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [pressed, setPressed] = useState(false);

  const updateSubject = (i, field, val) => {
    const updated = [...subjects];
    updated[i] = { ...updated[i], [field]: val };
    setSubjects(updated);
  };

  const getStatus = (score) => {
    if (score >= 65) return { label: "Excellent Chance", bg: "#1A3C1A", border: "#3DBF3D", color: "#7FED7F" };
    if (score >= 55) return { label: "Good Chance", bg: "#1A3020", border: "#2DA06A", color: "#7FE8B5" };
    if (score >= 47.5) return { label: "Fair Chance", bg: "#3A2A00", border: "#C9A227", color: "#F5D870" };
    return { label: "Below Average", bg: "#3A0A0A", border: "#C94040", color: "#F59090" };
  };

  const calculate = () => {
    setError("");
    const jambNum = parseFloat(jamb);
    if (!jamb || isNaN(jambNum) || jambNum < 0 || jambNum > 400) {
      setError("Enter a valid JAMB score (0–400).");
      setResult(null);
      return;
    }
    for (let i = 0; i < 5; i++) {
      if (!subjects[i].name) {
        setError(`Please select a subject for Subject ${i + 1}.`);
        setResult(null);
        return;
      }
    }

    const jambScore = (jambNum / 400) * 75;
    const points = subjects.map((s) => GRADE_POINTS[s.grade]);
    const avg = points.reduce((a, b) => a + b, 0) / 5;
    const olevelScore = (avg / 100) * 25;
    const total = jambScore + olevelScore;

    setResult({ jambScore, olevelScore, total, avg, points, jambRaw: jambNum });
  };

  return (
    <div style={styles.root}>
      {/* Header */}
      <div style={styles.headerBg}>
        <span style={styles.ornament}>✦ ✦ ✦</span>
        <div style={styles.academy}>The Pace Setter Academy</div>
        <h1 style={styles.title}>
          FUTA <span style={styles.titleAccent}>Aggregate</span> Calculator
        </h1>
        <div style={styles.subtitle}>2025/2026 Academic Session</div>
        <div style={styles.badge}>by OMOJ</div>
      </div>

      <div style={styles.container}>
        {/* Formula Info */}
        <div style={{ ...styles.sectionCard, marginTop: "22px", padding: "14px 18px" }}>
          <div style={{ fontSize: "12px", color: "#A07840", lineHeight: 1.7, textAlign: "center" }}>
            <span style={{ color: "#C9A227", fontWeight: "bold" }}>Formula:</span>{" "}
            (JAMB ÷ 400) × 75 &nbsp;+&nbsp; (O'Level avg ÷ 100) × 25
          </div>
        </div>

        {/* JAMB Section */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionTitle}>
            <span>📋 JAMB Score</span>
            <span style={styles.pill}>75%</span>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Your UTME Score (out of 400)</label>
            <input
              style={styles.input}
              type="number"
              min="0"
              max="400"
              placeholder="e.g. 270"
              value={jamb}
              onChange={(e) => setJamb(e.target.value)}
            />
          </div>
          {jamb && !isNaN(parseFloat(jamb)) && parseFloat(jamb) >= 0 && parseFloat(jamb) <= 400 && (
            <div style={{ fontSize: "12px", color: "#C9A227", textAlign: "right" }}>
              → JAMB contribution: {((parseFloat(jamb) / 400) * 75).toFixed(3)}
            </div>
          )}
        </div>

        {/* O'Level Section */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionTitle}>
            <span>📚 O'Level Results</span>
            <span style={styles.pill}>25%</span>
          </div>
          <div style={{ fontSize: "12px", color: "#A07840", marginBottom: "14px", lineHeight: 1.5 }}>
            Points: A1=80 · B2=72 · B3=67 · C4=62 · C5=57 · C6=52
          </div>
          {subjects.map((sub, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={styles.subjectNum}>Subject {i + 1}{i === 0 ? " (English)" : i === 1 ? " (Maths)" : ""}</div>
              <div style={styles.subjectRow}>
                <select
                  style={styles.select}
                  value={sub.name}
                  onChange={(e) => updateSubject(i, "name", e.target.value)}
                >
                  <option value="">Select subject…</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <select
                  style={styles.gradeSelect}
                  value={sub.grade}
                  onChange={(e) => updateSubject(i, "grade", e.target.value)}
                >
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {error && <div style={styles.errorText}>⚠ {error}</div>}

        {/* Calculate Button */}
        <button
          style={{
            ...styles.calcBtn,
            transform: pressed ? "scale(0.97)" : "scale(1)",
            boxShadow: pressed
              ? "0 2px 10px rgba(201,162,39,0.2)"
              : "0 6px 20px rgba(201,162,39,0.3)",
          }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => setPressed(false)}
          onClick={calculate}
        >
          ✦ Calculate Aggregate ✦
        </button>

        {/* Results */}
        {result && (() => {
          const status = getStatus(result.total);
          return (
            <div style={styles.resultCard}>
              <div style={styles.resultTitle}>✦ Your Results ✦</div>
              <div style={styles.scoreGrid}>
                <div style={styles.scoreBox}>
                  <span style={styles.scoreLabel}>JAMB (75%)</span>
                  <span style={styles.scoreVal}>{result.jambScore.toFixed(3)}</span>
                  <div style={{ fontSize: "11px", color: "#5A3820", marginTop: "4px" }}>
                    {result.jambRaw} / 400
                  </div>
                </div>
                <div style={styles.scoreBox}>
                  <span style={styles.scoreLabel}>O'Level (25%)</span>
                  <span style={styles.scoreVal}>{result.olevelScore.toFixed(3)}</span>
                  <div style={{ fontSize: "11px", color: "#5A3820", marginTop: "4px" }}>
                    avg {result.avg.toFixed(1)} / 100
                  </div>
                </div>
              </div>
              <hr style={styles.divider} />
              <div style={styles.totalBox}>
                <span style={styles.totalLabel}>Total Aggregate Score</span>
                <div style={styles.totalVal}>{result.total.toFixed(3)}</div>
                <span
                  style={{
                    ...styles.statusBadge,
                    background: status.bg,
                    border: `1px solid ${status.border}`,
                    color: status.color,
                  }}
                >
                  {status.label}
                </span>
              </div>
              <div style={{ fontSize: "11px", color: "#5A3820", textAlign: "center", marginTop: "12px", lineHeight: 1.6 }}>
                Compare with your departmental cut-off mark to assess admission chances.
              </div>
            </div>
          );
        })()}

        {/* Social Links */}
        <div style={{ ...styles.sectionCard, marginTop: "22px", padding: "18px" }}>
          <div style={{ ...styles.sectionTitle, justifyContent: "center", marginBottom: "14px" }}>
            Join Our Community
          </div>
          <div style={styles.socialSection}>
            <a
              href="https://chat.whatsapp.com/HDGXEv5cjsS0eFxH4T8xl9?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.socialBtn, ...styles.waBtn }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#7FED7F">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.528 5.856L0 24l6.335-1.505A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.97 0-3.81-.538-5.386-1.472l-.386-.23-3.981.945.999-3.878-.252-.399A9.786 9.786 0 012.182 12c0-5.414 4.404-9.818 9.818-9.818 5.414 0 9.818 4.404 9.818 9.818 0 5.414-4.404 9.818-9.818 9.818z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="https://t.me/+EXZJ60FYLZdkZTY8"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.socialBtn, ...styles.tgBtn }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#7DD3F7">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram
            </a>
          </div>
        </div>

        <div style={styles.footer}>
          <span style={{ color: "#C9A227" }}>✦</span> The Pace Setter Academy · by OMOJ <span style={{ color: "#C9A227" }}>✦</span>
          <br />FUTA 2025/2026 Admission Season
        </div>
      </div>
    </div>
  );
}
