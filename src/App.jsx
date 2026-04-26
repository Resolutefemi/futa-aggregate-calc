import React, { useState } from 'react';

const GRADE_POINTS = { A1: 80, B2: 72, B3: 67, C4: 62, C5: 57, C6: 52 };
const GRADES = ["A1","B2","B3","C4","C5","C6"];
const SUBJECTS = [
  "English Language","Mathematics","Physics","Chemistry","Biology",
  "Further Mathematics","Agricultural Science","Economics","Geography",
  "Technical Drawing","Computer Studies","Civic Education","Literature in English",
  "Government","Commerce","Accounting","French","Yoruba","Igbo","Hausa",
  "Food & Nutrition","Home Economics","Visual Arts","Music","Physical Education",
  "Insurance","Marketing","Data Processing","Auto Mechanics",
  "Building Construction","Woodwork","Metal Work","Electronics"
];

function getStatus(s) {
  if (s >= 65)   return { label:'🟢 Excellent Chance', bg:'rgba(0,194,124,0.15)',  border:'rgba(0,194,124,0.4)',  color:'#4ADE80' };
  if (s >= 55)   return { label:'🔵 Good Chance',      bg:'rgba(0,150,200,0.12)',  border:'rgba(0,150,200,0.35)', color:'#60C0F0' };
  if (s >= 47.5) return { label:'🟡 Fair Chance',      bg:'rgba(240,165,0,0.12)',  border:'rgba(240,165,0,0.35)', color:'#FBBF24' };
  return               { label:'🔴 Below Average',     bg:'rgba(230,57,70,0.12)',  border:'rgba(230,57,70,0.35)', color:'#F87171' };
}

export default function FutaAggregateCalculator() {
  const [jamb, setJamb] = useState('');
  const [subjects, setSubjects] = useState(Array(5).fill(''));
  const [grades, setGrades] = useState(Array(5).fill('B2'));
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const jambNum = parseFloat(jamb);
  const jambPreview = (!isNaN(jambNum) && jambNum >= 0 && jambNum <= 400)
    ? `→ Contributes ${((jambNum/400)*75).toFixed(3)} to aggregate`
    : '';

  const handleSubject = (i, val) => {
    const copy = [...subjects];
    copy[i] = val;
    setSubjects(copy);
  };

  const handleGrade = (i, val) => {
    const copy = [...grades];
    copy[i] = val;
    setGrades(copy);
  };

  const calculate = () => {
    setError('');
    setShowResult(false);

    if (isNaN(jambNum) || jambNum < 0 || jambNum > 400) {
      setError('Enter a valid JAMB score between 0 and 400.');
      return;
    }
    for (let i = 0; i < 5; i++) {
      if (!subjects[i]) {
        setError(`Please select a subject for Subject ${i+1}.`);
        return;
      }
    }
    const jambScore = (jambNum / 400) * 75;
    let pts = 0;
    for (let i = 0; i < 5; i++) pts += GRADE_POINTS[grades[i]];
    const avg = pts / 5;
    const olevelScore = (avg / 100) * 25;
    const total = jambScore + olevelScore;
    const status = getStatus(total);

    setResult({ jambScore, jambRaw: jambNum, olevelScore, avg, total, status });
    setShowResult(true);
    setTimeout(() => {
      document.getElementById('resultCard')?.scrollIntoView({ behavior:'smooth', block:'nearest' });
    }, 50);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg:        #060D14;
          --surface:   #0D1B2A;
          --surface2:  #112233;
          --border:    #1E3A52;
          --green:     #00C27C;
          --green-dim: rgba(0,194,124,0.12);
          --gold:      #F0A500;
          --gold-dim:  rgba(240,165,0,0.12);
          --red:       #E63946;
          --text:      #E8F4F8;
          --muted:     #5E8A9E;
          --radius:    14px;
        }
        html { scroll-behavior: smooth; }
        body { min-height: 100vh; background: var(--bg); font-family: 'Space Grotesk', sans-serif; color: var(--text); padding-bottom: 60px; }
        header { background: linear-gradient(180deg, #040B12 0%, #081525 100%); border-bottom: 1px solid var(--border); padding: 30px 20px 24px; text-align: center; position: relative; overflow: hidden; }
        header::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,194,124,0.08) 0%, transparent 70%); pointer-events: none; }
        .logo-row { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 14px; }
        .logo-icon { width: 40px; height: 40px; border-radius: 11px; background: linear-gradient(135deg, var(--green), #00956A); display: flex; align-items: center; justify-content: center; font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 800; color: #fff; box-shadow: 0 4px 16px rgba(0,194,124,0.35); flex-shrink: 0; }
        .logo-text { text-align: left; }
        .academy-name { font-family: 'Sora', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--green); line-height: 1; }
        .logo-sub { font-size: 10px; color: var(--muted); letter-spacing: 1px; margin-top: 2px; }
        h1 { font-family: 'Sora', sans-serif; font-size: clamp(24px, 7vw, 34px); font-weight: 800; line-height: 1.15; color: #fff; margin-bottom: 6px; }
        h1 em { font-style: normal; color: var(--gold); }
        .header-sub { font-size: 12px; color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 14px; }
        .by-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--green-dim); border: 1px solid rgba(0,194,124,0.3); border-radius: 20px; padding: 5px 14px; font-size: 12px; color: var(--green); font-weight: 600; letter-spacing: 0.5px; }
        .by-badge::before { content: '●'; font-size: 7px; }
        .container { max-width: 480px; margin: 0 auto; padding: 0 14px; }
        .formula-strip { margin-top: 18px; background: var(--gold-dim); border: 1px solid rgba(240,165,0,0.2); border-radius: var(--radius); padding: 12px 16px; display: flex; align-items: center; gap: 10px; }
        .formula-icon { font-size: 18px; flex-shrink: 0; }
        .formula-text { font-size: 13px; color: var(--muted); line-height: 1.6; }
        .formula-text b { color: var(--gold); }
        .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; margin-top: 14px; }
        .section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .section-label { display: flex; align-items: center; gap: 8px; font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 1px; }
        .pct-badge { font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
        .pct-green { background: var(--green-dim); color: var(--green); border: 1px solid rgba(0,194,124,0.3); }
        .pct-gold  { background: var(--gold-dim);  color: var(--gold);  border: 1px solid rgba(240,165,0,0.3); }
        .field-label { display: block; font-size: 12px; color: var(--muted); margin-bottom: 8px; font-weight: 500; }
        input[type="number"], select { width: 100%; background: var(--surface2); border: 1.5px solid var(--border); border-radius: 10px; padding: 13px 14px; color: var(--text); font-size: 15px; font-family: 'Space Grotesk', sans-serif; font-weight: 500; outline: none; transition: border-color 0.2s, box-shadow 0.2s; -webkit-appearance: none; appearance: none; }
        input[type="number"]:focus, select:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(0,194,124,0.1); }
        input[type="number"]::placeholder { color: #2A4A5E; }
        select option { background: #0D1B2A; color: var(--text); }
        #jambPreview { font-size: 12px; color: var(--green); text-align: right; margin-top: 6px; min-height: 18px; font-weight: 600; }
        .grade-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .grade-chip { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 4px 10px; font-size: 11px; color: var(--muted); font-weight: 600; }
        .grade-chip b { color: var(--text); }
        .subject-num { font-size: 11px; color: var(--muted); margin-bottom: 5px; font-weight: 500; letter-spacing: 0.5px; }
        .subject-row { display: grid; grid-template-columns: 1fr 80px; gap: 8px; margin-bottom: 10px; }
        select.grade-sel { text-align: center; font-weight: 700; padding-left: 0; padding-right: 0; }
        .error-msg { background: rgba(230,57,70,0.1); border: 1px solid rgba(230,57,70,0.3); color: #FCA5A5; border-radius: 10px; padding: 10px 14px; font-size: 13px; margin-top: 14px; display: none; }
        .error-msg.show { display: block; animation: shake 0.3s; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        .calculate-btn-wrap { margin-top: 20px; }
        .calculate-btn { width: 100%; background: linear-gradient(135deg, var(--green), #00956A); border: none; border-radius: 12px; padding: 15px; color: #fff; font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; box-shadow: 0 6px 20px rgba(0,194,124,0.25); transition: transform 0.15s, box-shadow 0.15s; }
        .calculate-btn:active { transform: translateY(1px); box-shadow: 0 3px 12px rgba(0,194,124,0.2); }
        .result-card { background: linear-gradient(180deg, #0E2235 0%, #0A1826 100%); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px 20px; margin-top: 20px; text-align: center; display: none; position: relative; overflow: hidden; }
        .result-card::before { content: ''; position: absolute; inset: -1px; background: linear-gradient(135deg, rgba(0,194,124,0.15), transparent 40%, rgba(240,165,0,0.1)); pointer-events: none; }
        .result-card.show { display: block; animation: pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275); }
        @keyframes pop { 0%{opacity:0; transform:scale(0.95) translateY(8px)} 100%{opacity:1; transform:scale(1) translateY(0)} }
        .result-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; margin-bottom: 8px; }
        .result-total { font-family: 'Sora', sans-serif; font-size: 56px; font-weight: 800; line-height: 1; background: linear-gradient(135deg, #fff, #B8E4D5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 4px; }
        .total-sub { font-size: 12px; color: var(--muted); margin-bottom: 14px; }
        .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 18px; }
        .breakdown { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
        .break-item { background: rgba(17,34,51,0.7); border: 1px solid var(--border); border-radius: 10px; padding: 12px; }
        .break-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .break-value { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 700; color: #fff; }
        .break-sub { font-size: 10px; color: var(--muted); margin-top: 2px; }
        .result-note { font-size: 11px; color: var(--muted); line-height: 1.5; }
        .social-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .social-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border-radius: 10px; font-size: 13px; font-weight: 600; text-decoration: none; transition: transform 0.15s; }
        .social-btn:active { transform: scale(0.97); }
        .wa-btn { background: rgba(0,194,124,0.12); border: 1px solid rgba(0,194,124,0.3); color: #4ADE80; }
        .tg-btn { background: rgba(0,150,200,0.12); border: 1px solid rgba(0,150,200,0.3); color: #60C0F0; }
        footer { text-align: center; margin-top: 28px; font-size: 11px; color: #3A5A6E; line-height: 1.6; }
      `}</style>

      <div style={{background:'var(--bg)', minHeight:'100vh', paddingBottom:'60px'}}>
        <header>
          <div className="logo-row">
            <div className="logo-icon">PS</div>
            <div className="logo-text">
              <div className="academy-name">THE PACE SETTER</div>
              <div className="logo-sub">ACADEMY</div>
            </div>
          </div>
          <h1>FUTA Aggregate <em>Calculator</em></h1>
          <div className="header-sub">2025/2026 Admission Screening</div>
          <div className="by-badge">by OMOJ</div>
        </header>

        <div className="container">
          <div className="formula-strip">
            <div className="formula-icon">🧮</div>
            <div className="formula-text">
              <b>Formula:</b> JAMB (75%) + O'Level (25%) = <b>100%</b><br/>
              O'Level: Best 5 subjects (English & Maths compulsory)
            </div>
          </div>

          <div className="card">
            <div className="section-head">
              <div className="section-label">📊 JAMB Score</div>
              <div className="pct-badge pct-green">75%</div>
            </div>
            <label className="field-label">Enter your UTME score</label>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              max="400"
              placeholder="e.g., 280"
              value={jamb}
              onChange={e => setJamb(e.target.value)}
            />
            <div id="jambPreview">{jambPreview}</div>
          </div>

          <div className="card">
            <div className="section-head">
              <div className="section-label">📚 O'Level Grades</div>
              <div className="pct-badge pct-gold">25%</div>
            </div>
            <div className="grade-chips">
              <div className="grade-chip"><b>A1</b> = 80</div>
              <div className="grade-chip"><b>B2</b> = 72</div>
              <div className="grade-chip"><b>B3</b> = 67</div>
              <div className="grade-chip"><b>C4</b> = 62</div>
              <div className="grade-chip"><b>C5</b> = 57</div>
              <div className="grade-chip"><b>C6</b> = 52</div>
            </div>
            <div>
              {Array.from({length:5}).map((_, i) => (
                <div key={i}>
                  <div className="subject-num">Subject {i+1}{i===0?' — English': i===1?' — Mathematics':''}</div>
                  <div className="subject-row">
                    <select
                      value={subjects[i]}
                      onChange={e => handleSubject(i, e.target.value)}
                      style={{background:'#112233'}}
                    >
                      <option value="">Select subject…</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select
                      className="grade-sel"
                      value={grades[i]}
                      onChange={e => handleGrade(i, e.target.value)}
                    >
                      {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`error-msg ${error ? 'show' : ''}`} id="errorMsg">
            <span id="errorText">{error}</span>
          </div>

          <div className="calculate-btn-wrap">
            <button className="calculate-btn" onClick={calculate}>Calculate My Aggregate →</button>
          </div>

          <div className={`result-card ${showResult ? 'show' : ''}`} id="resultCard">
            <div className="result-label">Your FUTA Aggregate</div>
            <div className="result-total" id="res-total">{result ? result.total.toFixed(3) : '0.000'}</div>
            <div className="total-sub">out of 100</div>
            {result && (
              <div id="res-status" className="status-badge" style={{background: result.status.bg, border:`1px solid ${result.status.border}`, color: result.status.color}}>
                {result.status.label}
              </div>
            )}
            <div className="breakdown">
              <div className="break-item">
                <div className="break-label">JAMB (75%)</div>
                <div className="break-value" id="res-jamb">{result ? result.jambScore.toFixed(3) : '0.000'}</div>
                <div className="break-sub" id="res-jamb-raw">{result ? `${result.jambRaw} / 400` : ''}</div>
              </div>
              <div className="break-item">
                <div className="break-label">O'Level (25%)</div>
                <div className="break-value" id="res-olevel">{result ? result.olevelScore.toFixed(3) : '0.000'}</div>
                <div className="break-sub" id="res-olevel-avg">{result ? `avg ${result.avg.toFixed(1)} / 100` : ''}</div>
              </div>
            </div>
            <p className="result-note">Compare with your departmental cut-off mark to know your admission chances.</p>
          </div>

          <div className="card" style={{marginTop:'14px'}}>
            <div className="section-head" style={{marginBottom:'14px', justifyContent:'center'}}>
              <div className="section-label">🔔 Join Our Community</div>
            </div>
            <div className="social-grid">
              <a className="social-btn wa-btn" href="https://chat.whatsapp.com/HDGXEv5cjsS0eFxH4T8xl9?mode=gi_t" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#4ADE80"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.528 5.856L0 24l6.335-1.505A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.97 0-3.81-.538-5.386-1.472l-.386-.23-3.981.945.999-3.878-.252-.399A9.786 9.786 0 012.182 12c0-5.414 4.404-9.818 9.818-9.818 5.414 0 9.818 4.404 9.818 9.818 0 5.414-4.404 9.818-9.818 9.818z"/></svg>
                WhatsApp
              </a>
              <a className="social-btn tg-btn" href="https://t.me/+EXZJ60FYLZdkZTY8" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#60C0F0"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Telegram
              </a>
            </div>
          </div>

          <footer><b>The Pace Setter Academy</b> · by OMOJ<br/>FUTA 2025/2026 Admission Season</footer>
        </div>
      </div>
    </>
  );
}
