import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text) {
  const n = normalize(text);
  if (!n) return [];
  return n.split(' ').filter(Boolean);
}

function scoreMatch(query, candidate) {
  const qTokens = new Set(tokenize(query));
  const cTokens = new Set(tokenize(candidate));
  if (qTokens.size === 0 || cTokens.size === 0) return 0;
  let overlap = 0;
  qTokens.forEach((t) => {
    if (cTokens.has(t)) overlap += 1;
  });
  return overlap / Math.max(4, qTokens.size);
}

const FAQS = [
  {
    q: 'What does KOLT Realty do?',
    a: 'KOLT is positioned as a consultancy-first advisor for GTA commercial and industrial real estate—helping investors and owner-users shortlist, underwrite, and negotiate with stronger market and zoning context.',
    tags: ['services', 'advisory'],
  },
  {
    q: 'Do you work with owner-users?',
    a: 'Yes. Many of the tools and checklists are designed for owner-users evaluating lease vs buy, occupancy cost, warehouse fit, and corridor tradeoffs before committing to a mandate.',
    tags: ['services', 'owner-user'],
  },
  {
    q: 'Can you help with industrial condo conversions?',
    a: 'Yes. The site emphasizes industrial condo conversions, corridor dynamics (Peel/Halton/York), and the decision logic that sits behind conversion feasibility and resale/lease outcomes.',
    tags: ['industrial', 'conversions'],
  },
  {
    q: 'Are the tools professional advice?',
    a: 'No. Tools are estimators meant for first-pass screening. They help structure questions and scenarios, but they do not replace legal, engineering, financing, or appraisal advice.',
    tags: ['tools', 'compliance'],
  },
  {
    q: 'Why do I have to accept the acknowledgement on the tools page?',
    a: 'The gate is a compliance and expectation layer: it clarifies that outputs are estimates and ensures users understand disclosure and advisory boundaries before relying on calculators.',
    tags: ['tools'],
  },
  {
    q: 'How do I schedule a call?',
    a: 'Use the scheduling page to pick a time. If the calendar embed is not yet connected, use the contact page and we will confirm availability manually.',
    tags: ['schedule', 'contact'],
  },
  {
    q: 'Do you handle off-market opportunities?',
    a: 'KOLT is designed to support off-market and confidential workflows. Start with a scarcity report or requirement brief so the search is structured from day one.',
    tags: ['listings', 'off-market'],
  },
  {
    q: 'What markets do you focus on?',
    a: 'The site emphasizes the Peel, Halton, and York corridor lens across the GTA, with market pages and submarket comparison tools for fit and tradeoffs.',
    tags: ['markets'],
  },
  {
    q: 'What is a scarcity report?',
    a: 'A scarcity report is a structured intake and market-read deliverable that clarifies requirements, timing sensitivity, and what inventory is truly scarce for that profile—before formal tours and negotiations.',
    tags: ['lead-magnet'],
  },
  {
    q: 'What is the difference between CAM/TMI and base rent?',
    a: 'Base rent is the stated lease rate. CAM/TMI (and additional rent) covers shared operating costs like taxes, common maintenance, and often insurance. The tools help estimate the fully-loaded occupancy cost.',
    tags: ['tools', 'leasing'],
  },
  {
    q: 'Do you provide residential home valuations?',
    a: 'There is a lightweight residential valuation template tool for early screening. For accurate pricing, a CMA with local comps and timing nuance is still required.',
    tags: ['residential', 'tools'],
  },
];

const QUICK_ACTIONS = [
  { label: 'Tools gate and compliance', text: 'Why do I have to accept the acknowledgement on the tools page?' },
  { label: 'Schedule a call', text: 'How do I schedule a call?' },
  { label: 'Scarcity report', text: 'What is a scarcity report?' },
  { label: 'Markets covered', text: 'What markets do you focus on?' },
  { label: 'Owner-user help', text: 'Do you work with owner-users?' },
];

export default function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => ([
    {
      role: 'bot',
      text: 'Ask me a quick question about KOLT, the tools, scheduling, or the scarcity report. I will answer from the site’s FAQ knowledge base.',
    },
  ]));

  const panelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  const knowledge = useMemo(() => FAQS, []);

  const answer = (question) => {
    const best = knowledge
      .map((item) => {
        const score = Math.max(scoreMatch(question, item.q), scoreMatch(question, item.a));
        return { item, score };
      })
      .sort((a, b) => b.score - a.score)[0];

    if (!best || best.score < 0.22) {
      return {
        text: "I can’t confidently match that to the FAQ set yet. Try a shorter question (tools, markets, scheduling, scarcity report), or use Contact for a direct reply.",
        followups: [
          'How do I schedule a call?',
          'What is a scarcity report?',
          'Are the tools professional advice?',
        ],
      };
    }

    const followups = knowledge
      .filter((f) => f !== best.item && f.tags?.some((t) => best.item.tags?.includes(t)))
      .slice(0, 3)
      .map((f) => f.q);

    return { text: best.item.a, followups };
  };

  const push = (role, text) => setMessages((prev) => ([...prev, { role, text }]));

  const handleSend = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;
    push('user', trimmed);
    const res = answer(trimmed);
    push('bot', res.text);
    if (res.followups?.length) {
      push('bot', `Suggested: ${res.followups.join(' · ')}`);
    }
    setInput('');
    window.setTimeout(() => {
      panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' });
    }, 60);
  };

  return (
    <div className="faq-bot" aria-live="polite">
      <button type="button" className={`faq-bot__launcher ${open ? 'is-open' : ''}`} onClick={() => setOpen((v) => !v)} aria-haspopup="dialog" aria-expanded={open} aria-controls="faq-bot-panel">
        <span className="faq-bot__dot" aria-hidden="true" />
        <span className="faq-bot__label">FAQ Chat</span>
      </button>

      {open && (
        <section id="faq-bot-panel" className="faq-bot__panel" role="dialog" aria-label="FAQ chatbot">
          <header className="faq-bot__header">
            <div>
              <strong>Answers from KOLT FAQs</strong>
              <p>Type a question or tap a quick action.</p>
            </div>
            <button type="button" className="faq-bot__close" onClick={() => setOpen(false)} aria-label="Close chatbot">×</button>
          </header>

          <div className="faq-bot__quick" aria-label="Quick questions">
            {QUICK_ACTIONS.map((q) => (
              <button key={q.label} type="button" className="faq-bot__chip" onClick={() => handleSend(q.text)}>
                {q.label}
              </button>
            ))}
          </div>

          <div className="faq-bot__messages" ref={panelRef}>
            {messages.map((m, idx) => (
              <div key={`${m.role}-${idx}`} className={`faq-bot__msg faq-bot__msg--${m.role}`}
              >
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          <form className="faq-bot__composer" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <label className="sr-only" htmlFor="faq-bot-input">Ask a question</label>
            <input ref={inputRef} id="faq-bot-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about tools, markets, scheduling…" autoComplete="off" />
            <button type="submit" className="button button-primary small-button">Send</button>
          </form>

          <footer className="faq-bot__footer">
            <Link to="/schedule" className="faq-bot__footer-link">Schedule</Link>
            <Link to="/contact" className="faq-bot__footer-link">Contact</Link>
            <Link to="/privacy" className="faq-bot__footer-link">Privacy</Link>
          </footer>
        </section>
      )}
    </div>
  );
}
