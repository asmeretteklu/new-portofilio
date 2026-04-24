import { useEffect } from 'react';
import { digitalMarketingCreds } from '../data/portfolio';

const certificates = [
  {
    id: 1,
    title: 'CS50x — Intro to Computer Science',
    issuer: 'Harvard / edX',
    year: '2022',
    icon: '🏆',
    accent: 'gold', // gold accent for Harvard
    link: '/cs50.pdf'
  },
  {
    id: 2,
    title: 'Diploma in English Language',
    issuer: 'Language School, Mekelle',
    year: '2017',
    icon: '📜',
    accent: 'lavender', // lavender accent
    note: 'Distinction — Full professional English fluency',
    link: null
  },
  {
    id: 3,
    title: '5 Million Ethiopian Coders',
    issuer: 'AI & Fundamental Programming',
    year: '2023',
    icon: '⭐',
    accent: 'default',
    link: null
  },
  {
    id: 4,
    title: 'UAE 5 Million Coders',
    issuer: 'Advanced Programming Track',
    year: 'In Progress',
    icon: '🚀',
    accent: 'default',
    link: null
  },
  {
    id: 5,
    title: 'FreeCodeCamp Certificates',
    issuer: 'Web Design · JS · Python · Front End Libraries',
    year: '2022–2023',
    icon: '💻',
    accent: 'default',
    link: null
  },
];

const Certificates = () => {
  useEffect(() => {
    // ── SCRATCH CARDS ──
    document.querySelectorAll(".cert-card").forEach(card => {
      const scratchEl = card.querySelector(".cert-scratch");
      const canvas = card.querySelector(".scratch-canvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let isDrawing = false;
      let scratched = 0;

      function initCanvas() {
        canvas.width = canvas.offsetWidth || 260;
        canvas.height = canvas.offsetHeight || 220;
        ctx.fillStyle = "#ED93B1";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Polka dot pattern
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        for (let x = 0; x < canvas.width; x += 20) {
          for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      function scratch(x, y) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fill();
        scratched++;
        if (scratched > 30) {
          scratchEl.dataset.scratched = "true";
          setTimeout(() => { scratchEl.style.display = "none"; }, 400);
        }
      }

      function getPos(e, canvas) {
        const rect = canvas.getBoundingClientRect();
        if (e.touches) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }

      // Cleanup existing listeners to avoid duplicates in React StrictMode
      const newCanvas = canvas.cloneNode(true);
      canvas.parentNode.replaceChild(newCanvas, canvas);
      
      newCanvas.addEventListener("mousedown", e => { isDrawing = true; const p = getPos(e, newCanvas); scratch(p.x, p.y); });
      newCanvas.addEventListener("mousemove", e => { if (!isDrawing) return; const p = getPos(e, newCanvas); scratch(p.x, p.y); });
      newCanvas.addEventListener("mouseup", () => isDrawing = false);
      newCanvas.addEventListener("touchstart", e => { e.preventDefault(); isDrawing = true; const p = getPos(e, newCanvas); scratch(p.x, p.y); }, { passive: false });
      newCanvas.addEventListener("touchmove", e => { e.preventDefault(); if (!isDrawing) return; const p = getPos(e, newCanvas); scratch(p.x, p.y); }, { passive: false });
      newCanvas.addEventListener("touchend", () => isDrawing = false);

      setTimeout(() => {
        canvas.width = newCanvas.offsetWidth || 260;
        canvas.height = newCanvas.offsetHeight || 220;
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;
        const nctx = newCanvas.getContext("2d");
        nctx.fillStyle = "#ED93B1";
        nctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
        nctx.fillStyle = "rgba(255,255,255,0.15)";
        for (let x = 0; x < newCanvas.width; x += 20) {
          for (let y = 0; y < newCanvas.height; y += 20) {
            nctx.beginPath();
            nctx.arc(x, y, 3, 0, Math.PI * 2);
            nctx.fill();
          }
        }
        // Redefine scratch to use new canvas
        function newScratch(x, y) {
          nctx.globalCompositeOperation = "destination-out";
          nctx.beginPath();
          nctx.arc(x, y, 28, 0, Math.PI * 2);
          nctx.fill();
          scratched++;
          if (scratched > 30) {
            scratchEl.dataset.scratched = "true";
            setTimeout(() => { scratchEl.style.display = "none"; }, 400);
          }
        }
        newCanvas.onmousedown = e => { isDrawing = true; const p = getPos(e, newCanvas); newScratch(p.x, p.y); };
        newCanvas.onmousemove = e => { if (!isDrawing) return; const p = getPos(e, newCanvas); newScratch(p.x, p.y); };
        newCanvas.onmouseup = () => isDrawing = false;
        newCanvas.ontouchstart = e => { e.preventDefault(); isDrawing = true; const p = getPos(e, newCanvas); newScratch(p.x, p.y); };
        newCanvas.ontouchmove = e => { e.preventDefault(); if (!isDrawing) return; const p = getPos(e, newCanvas); newScratch(p.x, p.y); };
        newCanvas.ontouchend = () => isDrawing = false;
      }, 100);
    });
  }, []);

  const getAccentBorder = (accent) => {
    switch (accent) {
      case 'gold': return '1px solid #C9A96E';
      case 'lavender': return '1px solid #9b89c4';
      default: return '0.5px solid #E8D5C4';
    }
  };

  const getYearColor = (accent) => {
    switch (accent) {
      case 'gold': return '#C9A96E';
      case 'lavender': return '#9b89c4';
      default: return '#C9A96E';
    }
  };

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto">
      <div className="section-label">Credentials ✦</div>
      <h2 className="section-title text-4xl sm:text-5xl font-display mb-4" style={{ color: 'var(--text)' }}>
        Things I've <em className="italic" style={{ color: 'var(--blush-mid)' }}>earned</em> ✦
      </h2>
      <p className="section-subtitle font-body text-lg mb-4" style={{ color: 'var(--muted)' }}>
        Every certificate is a late night, an early morning, and a reason to keep going.
      </p>
      <p className="cert-hint">✦ scratch each card to reveal</p>
      
      <div className="cert-grid">
        {certificates.map(cert => (
          <div 
            className="cert-card" 
            key={cert.id}
            style={{ border: getAccentBorder(cert.accent) }}
          >
            <div className="cert-scratch" data-scratched="false">
              <canvas className="scratch-canvas"></canvas>
              <div className="cert-scratch-label">scratch to reveal ✦</div>
            </div>
            <div className="cert-content">
              <span className="cert-icon">{cert.icon}</span>
              <h4 className="cert-name">{cert.title}</h4>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-year" style={{ color: getYearColor(cert.accent) }}>{cert.year}</p>
              {cert.note && (
                <p style={{ 
                  fontSize: '0.68rem', 
                  color: cert.accent === 'lavender' ? '#9b89c4' : 'var(--muted)',
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                  marginTop: 2,
                }}>
                  {cert.note}
                </p>
              )}
              {cert.link && (
                <a href={cert.link} download className="cert-btn">Download Certificate ✦</a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Digital & Marketing Credentials grouped card */}
      <div 
        className="mt-6"
        style={{
          background: 'var(--card-bg)',
          border: '1px solid #C9A96E',
          borderRadius: 16,
          padding: '1.5rem 2rem',
          maxWidth: 480,
        }}
      >
        <h4 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ color: '#C9A96E' }}>✦</span>
          Digital & Marketing Credentials
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {digitalMarketingCreds.map((cred, i) => (
            <li key={i} style={{
              fontFamily: "'DM Mono', 'DM Sans', monospace",
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              lineHeight: 1.5,
            }}>
              <span style={{ color: '#C9A96E', fontSize: '0.5rem' }}>●</span>
              <span>
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>{cred.name}</span>
                {' — '}
                <span style={{ fontStyle: 'italic' }}>{cred.issuer}</span>
                {cred.year && <span style={{ color: '#C9A96E', marginLeft: 6 }}>{cred.year}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Certificates;
