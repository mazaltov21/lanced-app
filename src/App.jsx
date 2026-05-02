import { useState, useRef, useEffect } from "react";

// ─── Global monospace font ────────────────────────────────────────────────────
const mono = { fontFamily: "'Courier New', Courier, monospace" };

// ─── Primitives ───────────────────────────────────────────────────────────────

function ImgBox({ label = "img", className = "" }) {
  return (
    <div
      className={`bg-gray-200 flex items-center justify-center ${className}`}
      style={mono}
    >
      <span className="text-gray-400 text-xs">[ {label} ]</span>
    </div>
  );
}

function Avatar({ name = "?", dark = false, size = "md" }) {
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  return (
    <div
      className={`${sz} rounded-full border border-gray-300 flex items-center justify-center font-semibold flex-shrink-0 ${dark ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-600"}`}
      style={mono}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

// Outline tag — matches screenshot style
function Tag({ children, dark = false }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 border rounded ${dark ? "bg-gray-800 text-white border-gray-800" : "border-gray-400 text-gray-600 bg-white"}`}
      style={mono}
    >
      {children}
    </span>
  );
}

// Primary button (black, full-width feel in screenshots)
function PBtn({ children, onClick, className = "", disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded disabled:opacity-40 ${className}`}
      style={mono}
    >
      {children}
    </button>
  );
}

// Secondary / outline button
function SBtn({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border border-gray-400 text-gray-700 text-sm font-medium rounded bg-white ${className}`}
      style={mono}
    >
      {children}
    </button>
  );
}

// Back link
function Back({ onClick, label = "Back" }) {
  return (
    <button
      onClick={onClick}
      className="text-sm text-gray-500 mb-4 flex items-center gap-1"
      style={mono}
    >
      ← {label}
    </button>
  );
}

// White card with border
function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-gray-300 rounded ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// Section label (small caps)
function Label({ children }) {
  return (
    <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2" style={mono}>
      {children}
    </p>
  );
}

// Divider with text
function Divider({ text }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-gray-300" />
      {text && <span className="text-xs text-gray-400" style={mono}>{text}</span>}
      <div className="flex-1 h-px bg-gray-300" />
    </div>
  );
}

// ─── Lanced Shell ─────────────────────────────────────────────────────────────

function Shell({ children, activeTab, onTab, onExit, activeConcept, chat = false }) {
  const tabs = [
    { id: "dashboard",     label: "Dashboard" },
    { id: "opportunities", label: "Opportunities" },
    { id: "applications",  label: "Applications" },
    { id: "circles",       label: "Career Circles" },
    { id: "hub",           label: "Knowledge Hub" },
  ];

  const showCircles = activeConcept === 1;
  const showHub     = activeConcept === 2;

  const visible = tabs.filter((t) => {
    if (t.id === "circles") return showCircles;
    if (t.id === "hub")     return showHub;
    return true;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="w-44 bg-white border-r border-gray-300 flex-shrink-0 flex flex-col py-4 px-2">
        <div className="font-bold text-gray-900 px-2 mb-5 text-sm" style={mono}>
          LANCED
        </div>
        <nav className="flex-1 space-y-0.5">
          {visible.map((t) => {
            const active = t.id === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => onTab(t.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded ${
                  active
                    ? "bg-gray-200 text-gray-900 font-semibold"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                style={mono}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
        <button
          onClick={onExit}
          className="text-xs text-gray-400 px-2 pt-3 border-t border-gray-200 text-left"
          style={mono}
        >
          ← Exit prototype
        </button>
      </aside>

      {/* Main */}
      <main
        className={`flex-1 ${chat ? "overflow-hidden flex flex-col" : "overflow-y-auto"}`}
        style={{ background: "#f3f4f6" }}
      >
        {children}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONCEPT 1 — Career Circles
// ─────────────────────────────────────────────────────────────────────────────

const CIRCLES = [
  {
    id: 1,
    title: "Feeling stuck",
    tagline: "Can't see a way forward?",
    price: "€25",
    free: true,
    spots: "2 spots left",
    date: "Thu 22 May · 18:00",
    expert: "Joris van Meer",
    expertRole: "Career coach",
    outcomes: [
      "Understand what's holding you back",
      "Hear how others navigated the same",
      "Leave with one clear next step",
    ],
    flow: ["Intro & sharing", "Peer exchange", "Expert reframe", "Next-step plan"],
  },
  {
    id: 2,
    title: "Career transition",
    tagline: "Moving on — but not sure where.",
    price: "€25",
    free: false,
    spots: "4 spots left",
    date: "Fri 23 May · 17:00",
    expert: "Joris van Meer",
    expertRole: "Career coach",
    outcomes: [
      "Map your transferable skills",
      "Explore realistic directions",
      "Define your first move",
    ],
    flow: ["Intro & sharing", "Peer exchange", "Expert reframe", "Next-step plan"],
  },
  {
    id: 3,
    title: "My own project",
    tagline: "You have an idea. Now what?",
    price: "€25",
    free: false,
    spots: "3 spots left",
    date: "Mon 26 May · 18:30",
    expert: "Roos Brouwer",
    expertRole: "Producer & artistic advisor",
    outcomes: [
      "Clarify your concept",
      "Identify what you need to start",
      "Get peer feedback on your idea",
    ],
    flow: ["Intro & sharing", "Peer exchange", "Expert reframe", "Next-step plan"],
  },
  {
    id: 4,
    title: "No opportunities",
    tagline: "Feeling invisible in your field?",
    price: "€25",
    free: false,
    spots: "5 spots left",
    date: "Wed 28 May · 17:00",
    expert: "Joris van Meer",
    expertRole: "Career coach",
    outcomes: [
      "Identify gaps and blind spots",
      "Discover overlooked routes",
      "Build a simple visibility plan",
    ],
    flow: ["Intro & sharing", "Peer exchange", "Expert reframe", "Next-step plan"],
  },
];

// Screen 1 — C1 Dashboard
function C1_Dash({ go }) {
  return (
    <div className="p-6 max-w-2xl">
      <p className="text-sm text-gray-500 mb-4" style={mono}>Welcome back, Sophie</p>

      {/* Banner card */}
      <Card className="mb-5 overflow-hidden cursor-pointer" onClick={() => go("overview")}>
        <ImgBox label="banner image" className="w-full h-28" />
        <div className="p-4">
          <Tag>First session free</Tag>
          <p className="text-base font-bold text-gray-900 mt-2 mb-0.5" style={mono}>Career Circles</p>
          <p className="text-sm text-gray-500" style={mono}>Guided sessions for your career challenges →</p>
        </div>
      </Card>

      {/* Stats */}
      <Label>Your activity</Label>
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: "0", l: "Sessions attended" },
          { v: "–", l: "Upcoming" },
          { v: "0", l: "Community replies" },
        ].map((s) => (
          <Card key={s.l} className="p-4">
            <div className="text-2xl font-bold text-gray-800" style={mono}>{s.v}</div>
            <div className="text-xs text-gray-400 mt-1" style={mono}>{s.l}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Screen 2 — C1 Overview (Career Circles list)
function C1_Overview({ go, back }) {
  return (
    <div className="p-6 max-w-2xl">
      <Back onClick={back} label="Dashboard" />

      <div className="flex items-start justify-between mb-1">
        <h2 className="text-2xl font-bold text-gray-900" style={mono}>Career Circles</h2>
        <Tag>First session free</Tag>
      </div>
      <p className="text-sm text-gray-500 mb-5" style={mono}>
        90 min · max 6 artists · led by an expert.
      </p>

      <div className="space-y-3">
        {CIRCLES.map((c, i) => (
          <Card
            key={c.id}
            className="flex gap-0 overflow-hidden"
            onClick={() => go("detail", c)}
          >
            {/* Thumbnail */}
            <ImgBox label="img" className="w-20 flex-shrink-0 h-full min-h-[80px]" />

            {/* Content */}
            <div className="p-3 flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-gray-900" style={mono}>{c.title}</p>
                <div className="flex-shrink-0 text-right">
                  {i === 0 ? (
                    <div>
                      <span className="block text-xs line-through text-gray-300" style={mono}>{c.price}</span>
                      <Tag dark>Free</Tag>
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-gray-800" style={mono}>{c.price}</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-0.5" style={mono}>{c.tagline}</p>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-xs text-gray-400" style={mono}>🗓 {c.date}</span>
                <Tag>{c.spots}</Tag>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Screen 3 — C1 Detail
function C1_Detail({ circle, go, back }) {
  return (
    <div className="max-w-xl">
      {/* Banner with back + tag overlaid */}
      <div className="relative">
        <ImgBox label="session banner" className="w-full h-32" />
        <button
          onClick={back}
          className="absolute top-2 left-2 bg-white border border-gray-300 text-gray-700 text-xs px-2.5 py-1 rounded"
          style={mono}
        >
          ← Back
        </button>
        {circle.free && (
          <div className="absolute top-2 right-2">
            <Tag>Free – 1st session</Tag>
          </div>
        )}
      </div>

      <div className="p-5 bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-0.5" style={mono}>{circle.title}</h2>
        <p className="text-sm text-gray-500 mb-3" style={mono}>{circle.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          <Tag>90 min</Tag>
          <Tag>Max 6 artists</Tag>
          <Tag>{circle.spots}</Tag>
          <Tag>🗓 {circle.date}</Tag>
        </div>

        {/* What you'll get */}
        <Label>What you'll get</Label>
        <Card className="p-3 mb-4">
          <ul className="space-y-2">
            {circle.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm text-gray-700" style={mono}>
                <span className="text-gray-500 flex-shrink-0">✓</span>{o}
              </li>
            ))}
          </ul>
        </Card>

        {/* Session flow */}
        <Label>Session flow</Label>
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          {circle.flow.map((step, i) => (
            <div key={step} className="flex items-center gap-1.5">
              <Tag>{step}</Tag>
              {i < circle.flow.length - 1 && (
                <span className="text-gray-400 text-xs" style={mono}>→</span>
              )}
            </div>
          ))}
        </div>

        {/* Expert */}
        <Label>Expert</Label>
        <Card className="p-3 flex items-center gap-3 mb-4">
          <Avatar name={circle.expert} />
          <div>
            <p className="text-sm font-bold text-gray-900" style={mono}>{circle.expert}</p>
            <p className="text-xs text-gray-500" style={mono}>{circle.expertRole}</p>
          </div>
        </Card>

        {/* Price + CTA */}
        <Card className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400" style={mono}>Price</p>
            <p className="text-base font-bold text-gray-900" style={mono}>
              {circle.free ? "Free – first session" : `${circle.price} per session`}
            </p>
          </div>
          <PBtn onClick={() => go("session")}>Join session →</PBtn>
        </Card>
      </div>
    </div>
  );
}

// Screen 4 — C1 Session in progress
function C1_Session({ go, back }) {
  const phases = [
    { label: "Intro round",    dur: "10 min", status: "done"   },
    { label: "Artist sharing", dur: "20 min", status: "active" },
    { label: "Peer exchange",  dur: "25 min", status: "next"   },
    { label: "Expert input",   dur: "20 min", status: "next"   },
    { label: "Next-step plan", dur: "15 min", status: "next"   },
  ];

  const people = [
    { name: "Sophie", dark: false },
    { name: "Mira",   dark: false },
    { name: "Lena",   dark: false },
    { name: "Jules",  dark: false },
    { name: "Tomas",  dark: false },
    { name: "Joris",  dark: true  },
  ];

  return (
    <div className="p-6 max-w-xl bg-white min-h-full">
      <Back onClick={back} label="Session detail" />

      <div className="flex items-start justify-between mb-1">
        <h2 className="text-2xl font-bold text-gray-900" style={mono}>Session in progress</h2>
        <Tag dark>● LIVE</Tag>
      </div>
      <p className="text-sm text-gray-400 mb-5" style={mono}>
        Feeling stuck · 22 May · with Joris
      </p>

      {/* Group */}
      <Label>Group (5 artists)</Label>
      <Card className="p-4 mb-5">
        <div className="flex gap-4 flex-wrap">
          {people.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-1">
              <Avatar name={p.name} dark={p.dark} />
              <span className={`text-xs ${p.dark ? "font-bold text-gray-900" : "text-gray-500"}`} style={mono}>
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Session flow */}
      <Label>Session flow</Label>
      <Card className="divide-y divide-gray-100 mb-6">
        {phases.map((p) => (
          <div
            key={p.label}
            className={`flex items-center gap-3 px-4 py-3 ${
              p.status === "done" ? "opacity-50" : ""
            }`}
          >
            <span className="text-xs w-3 flex-shrink-0 text-center text-gray-400" style={mono}>
              {p.status === "done"   ? "●" :
               p.status === "active" ? "●" : "◦"}
            </span>
            <span
              className={`text-sm flex-1 ${
                p.status === "active" ? "font-bold text-gray-900" :
                p.status === "done"   ? "text-gray-400" : "text-gray-400"
              }`}
              style={mono}
            >
              {p.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400" style={mono}>{p.dur}</span>
              {p.status === "done"   && <span className="text-xs text-gray-400" style={mono}>✓ done</span>}
              {p.status === "active" && <Tag dark>Now</Tag>}
            </div>
          </div>
        ))}
      </Card>

      <PBtn onClick={() => go("outcome")} className="w-full py-3 text-base">
        End session &amp; write plan →
      </PBtn>
    </div>
  );
}

// Screen 5 — C1 Next Step Plan
function C1_Outcome({ go, back }) {
  const [f, setF] = useState({ challenge: "", learned: "", step: "", help: "" });
  const u = (k, v) => setF((p) => ({ ...p, [k]: v }));

  return (
    <div className="p-6 max-w-xl bg-white min-h-full">
      <Back onClick={back} label="Session" />
      <h2 className="text-2xl font-bold text-gray-900 mb-0.5" style={mono}>Your Next Step Plan</h2>
      <p className="text-sm text-gray-500 mb-5" style={mono}>
        Fill in what you take away from today's session.
      </p>

      <Card className="divide-y divide-gray-200 mb-4">
        {[
          { k: "challenge", label: "My challenge",    ph: "What brought you here?" },
          { k: "learned",   label: "What I learned",  ph: "One thing that shifted today." },
          { k: "step",      label: "My next step",    ph: "Something I'll do this week." },
          { k: "help",      label: "Who can help me", ph: "A person, resource or community." },
        ].map((r) => (
          <div key={r.k} className="px-4 py-3">
            <Label>{r.label}</Label>
            <textarea
              value={f[r.k]}
              onChange={(e) => u(r.k, e.target.value)}
              rows={2}
              placeholder={r.ph}
              className="w-full text-sm bg-transparent border-0 focus:outline-none resize-none text-gray-700 placeholder-gray-300"
              style={mono}
            />
          </div>
        ))}
      </Card>

      {/* Group chat notice */}
      <Card className="p-3 mb-5 flex items-center gap-3">
        <span className="text-gray-400 text-base flex-shrink-0">💬</span>
        <div>
          <p className="text-sm font-bold text-gray-900" style={mono}>Your group chat is open</p>
          <p className="text-xs text-gray-500" style={mono}>Continue with the group and Joris after today.</p>
        </div>
      </Card>

      <div className="flex gap-3">
        <SBtn onClick={() => {}} className="flex-1 py-2.5">Save as PDF</SBtn>
        <PBtn onClick={() => go("community")} className="flex-1 py-2.5">Open group chat →</PBtn>
      </div>
    </div>
  );
}

// Screen 6 — C1 Group Chat
const SEED_MSGS = [
  { id: 1, name: "Joris (Expert)", time: "18:28", text: "Great session everyone. Use this chat to continue any thread." },
  { id: 2, name: "Mira",           time: "18:29", text: "Really helpful to hear I'm not the only one feeling this way." },
  { id: 3, name: "Lena",           time: "18:31", text: "Trying the 'three options' exercise this week. Will report back!" },
  { id: 4, name: "Joris (Expert)", time: "18:33", text: "Small experiments, not big decisions. That's the spirit." },
  { id: 5, name: "Tomas",          time: "18:35", text: "Is it normal to feel relieved after a session like this?" },
  { id: 6, name: "Joris (Expert)", time: "18:36", text: "Very normal. Naming things clearly reduces anxiety." },
];

function C1_Chat({ back }) {
  const [msgs, setMsgs] = useState(SEED_MSGS);
  const [text, setText] = useState("");
  const ref = useRef(null);

  const send = () => {
    if (!text.trim()) return;
    setMsgs((p) => [...p, {
      id: Date.now(), name: "Sophie (You)",
      time: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
      text: text.trim(), self: true,
    }]);
    setText("");
  };

  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={back} className="text-sm text-gray-500 mr-1" style={mono}>←</button>
          <div>
            <p className="text-sm font-bold text-gray-900" style={mono}>Feeling stuck – group chat</p>
            <p className="text-xs text-gray-400" style={mono}>5 artists · Joris · Session 22 May</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {msgs.map((m) => {
          const self   = m.self;
          const expert = m.name.includes("Expert");
          return (
            <div key={m.id} className={`flex gap-2.5 ${self ? "flex-row-reverse" : ""}`}>
              <Avatar name={m.name} dark={expert} size="sm" />
              <div className={`flex flex-col gap-0.5 max-w-xs ${self ? "items-end" : ""}`}>
                {!self && (
                  <span className="text-xs font-semibold text-gray-500" style={mono}>{m.name}</span>
                )}
                <div
                  className={`px-3 py-2 border rounded text-sm leading-relaxed ${
                    self
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                  style={mono}
                >
                  {m.text}
                </div>
                <span className="text-xs text-gray-300" style={mono}>{m.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={ref} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-300 px-3 py-2.5 flex gap-2 flex-shrink-0">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message the group..."
          className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none"
          style={mono}
        />
        <PBtn onClick={send} className="px-4">Send</PBtn>
      </div>
    </div>
  );
}

function Concept1({ onExit }) {
  const [screen, setScreen] = useState("dashboard");
  const [circle, setCircle] = useState(null);

  const go = (s, data) => {
    if (data) setCircle(data);
    setScreen(s);
  };

  const tab = screen === "dashboard" ? "dashboard" : "circles";
  const onTab = (t) => {
    if (t === "dashboard") setScreen("dashboard");
    if (t === "circles")   setScreen("overview");
  };

  const screens = {
    dashboard: <C1_Dash go={go} />,
    overview:  <C1_Overview go={go} back={() => setScreen("dashboard")} />,
    detail:    circle && <C1_Detail circle={circle} go={go} back={() => setScreen("overview")} />,
    session:   <C1_Session go={go} back={() => setScreen("detail")} />,
    outcome:   <C1_Outcome go={go} back={() => setScreen("session")} />,
    community: <C1_Chat back={() => setScreen("outcome")} />,
  };

  return (
    <Shell activeConcept={1} activeTab={tab} onTab={onTab} onExit={onExit} chat={screen === "community"}>
      {screens[screen] || screens["dashboard"]}
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONCEPT 2 — Knowledge Hub
// ─────────────────────────────────────────────────────────────────────────────

const FUNDS = [
  {
    id: 1,
    name: "Fonds Podiumkunsten",
    subtitle: "Individual Artist Grant",
    country: "NL",
    deadline: "15 Jun 2025",
    description: "For freelance performing artists developing their artistic practice.",
    eligibility: "Freelance artists based in the country of origin.",
    type: "Development grant",
    amount: "Up to €20,000",
    tips: [
      "Your artistic vision matters more than your CV",
      "Be specific about what the money enables",
      "Have someone outside your field review it",
    ],
    requirements: [
      "Professional track record",
      "Artistic motivation letter",
      "Realistic budget",
    ],
  },
  {
    id: 2,
    name: "Dioraphte",
    subtitle: "Dance & Performance Fund",
    country: "NL",
    deadline: "1 Aug 2025",
    description: "Private fund for experimental dance and performance projects.",
    eligibility: "Artists & small collectives based in NL.",
    type: "Project grant",
    amount: "€5k – €30k",
    tips: [
      "Strong artistic rationale required",
      "Experimental work is welcomed",
      "International collaborations favoured",
    ],
    requirements: [
      "Project proposal",
      "Budget breakdown",
      "Artist statement",
    ],
  },
  {
    id: 3,
    name: "Creative Europe",
    subtitle: "Culture Strand",
    country: "EU",
    deadline: "Rolling",
    description: "Cross-border cultural cooperation, mobility, and co-production.",
    eligibility: "EU-based artists & organisations.",
    type: "Mobility / co-prod",
    amount: "Varies",
    tips: [
      "Requires a legal entity or partner organisation",
      "Cross-border element is mandatory",
      "Plan at least 6 months ahead",
    ],
    requirements: [
      "Partner organisation recommended",
      "Cross-border project",
      "EU residency",
    ],
  },
  {
    id: 4,
    name: "British Council",
    subtitle: "Developing Artists",
    country: "UK",
    deadline: "30 May 2025",
    description: "UK artists developing international collaboration and residency skills.",
    eligibility: "UK artists (early–mid career).",
    type: "International residency",
    amount: "Up to £15,000",
    tips: [
      "Name a specific international partner",
      "Focus on international impact",
      "Early-career artists are prioritised",
    ],
    requirements: [
      "UK residency",
      "International project plan",
      "2+ years professional experience",
    ],
  },
];

const QA_PREVIEW = [
  { q: '"Has anyone applied to Fonds Podiumkunsten before?"',     author: "Mira K.",    answers: 2 },
  { q: '"What should I prepare before my first grant application?"', author: "Jules F.",   answers: 1 },
  { q: '"Is Creative Europe suitable for freelancers without an org?"', author: "Annika L.", answers: 1 },
];

// Screen 1 — C2 Dashboard
function C2_Dash({ go }) {
  return (
    <div className="p-6 max-w-2xl">
      <p className="text-sm text-gray-500 mb-4" style={mono}>Welcome back, Sophie</p>

      <Card className="mb-5 overflow-hidden cursor-pointer" onClick={() => go("hub")}>
        <ImgBox label="banner image" className="w-full h-28" />
        <div className="p-4">
          <Tag>30-day free trial</Tag>
          <p className="text-base font-bold text-gray-900 mt-2 mb-0.5" style={mono}>Knowledge Hub</p>
          <p className="text-sm text-gray-500" style={mono}>Find and access funding for your career →</p>
        </div>
      </Card>

      <Label>Your activity</Label>
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: "3", l: "Saved opportunities" },
          { v: "1", l: "In progress" },
          { v: "7", l: "Community answers" },
        ].map((s) => (
          <Card key={s.l} className="p-4">
            <div className="text-2xl font-bold text-gray-800" style={mono}>{s.v}</div>
            <div className="text-xs text-gray-400 mt-1" style={mono}>{s.l}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Screen 2 — C2 Knowledge Hub Landing
function C2_Hub({ go, back }) {
  const cats = [
    { label: "Funding",   active: true  },
    { label: "Contracts", active: false },
    { label: "Taxes",     active: false },
    { label: "Health",    active: false },
    { label: "Housing",   active: false },
    { label: "Training",  active: false },
  ];

  return (
    <div className="p-6 max-w-2xl">
      <Back onClick={back} label="Dashboard" />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900" style={mono}>Knowledge Hub</h2>
        <div className="flex items-center gap-2">
          <Tag>Trial active</Tag>
          <button
            onClick={() => go("pricing")}
            className="text-sm text-gray-600 underline"
            style={mono}
          >
            See plans →
          </button>
        </div>
      </div>

      {/* Categories */}
      <Label>Categories</Label>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {cats.map((c) => (
          <Card
            key={c.label}
            onClick={c.active ? () => go("funding") : undefined}
            className={`overflow-hidden ${c.active ? "cursor-pointer border-gray-400" : "opacity-50 cursor-not-allowed"}`}
          >
            <ImgBox label="img" className="w-full h-16" />
            <div className="px-3 py-2">
              <p className={`text-sm ${c.active ? "font-bold text-gray-900" : "text-gray-500"}`} style={mono}>
                {c.label}
              </p>
              {!c.active && (
                <p className="text-xs text-gray-400" style={mono}>Coming soon</p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Community Q&A preview */}
      <Label>Community Q&A</Label>
      <div className="space-y-2">
        {QA_PREVIEW.map((q, i) => (
          <Card key={i} className="px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800" style={mono}>{q.q}</p>
                <p className="text-xs text-gray-400 mt-0.5" style={mono}>{q.author}</p>
              </div>
              <Tag>{q.answers} answers</Tag>
            </div>
          </Card>
        ))}
      </div>

      {/* Ask question button */}
      <div className="mt-4">
        <SBtn onClick={() => go("chat")} className="w-full py-2 text-center">
          Ask a question →
        </SBtn>
      </div>
    </div>
  );
}

// Screen 3 — C2 Funding Database
function C2_FundingDB({ go, back }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "NL", "EU", "UK"];

  const filtered = FUNDS.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.country.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || f.country === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 max-w-2xl">
      <Back onClick={back} label="Knowledge Hub" />
      <h2 className="text-2xl font-bold text-gray-900 mb-0.5" style={mono}>Funding Database</h2>
      <p className="text-sm text-gray-400 mb-4" style={mono}>{FUNDS.length} funds available</p>

      {/* Search */}
      <div className="border border-gray-300 rounded mb-3 bg-white px-3 py-2">
        <span className="text-sm text-gray-400" style={mono}>[ Search funds... ]</span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1 text-sm border rounded ${
              activeFilter === f
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-300"
            }`}
            style={mono}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Fund list */}
      <div className="space-y-3">
        {filtered.map((fund) => (
          <Card
            key={fund.id}
            className="px-4 py-3 cursor-pointer"
            onClick={() => go("detail", fund)}
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900" style={mono}>{fund.name}</p>
                <p className="text-xs text-gray-500" style={mono}>{fund.subtitle}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-400" style={mono}>Deadline</p>
                <p className="text-sm font-bold text-gray-900" style={mono}>{fund.deadline}</p>
              </div>
            </div>
            <Divider />
            <div className="flex flex-wrap gap-1.5 mt-2">
              <Tag>{fund.country}</Tag>
              <Tag>{fund.type}</Tag>
              <Tag>{fund.amount}</Tag>
            </div>
          </Card>
        ))}
        {!filtered.length && (
          <p className="text-sm text-gray-400 text-center py-8 italic" style={mono}>
            No results found.
          </p>
        )}
      </div>
    </div>
  );
}

// Screen 4 — C2 Fund Detail
function C2_FundingDetail({ fund, go, back }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="p-6 max-w-xl bg-white min-h-full">
      <Back onClick={back} label="Funding database" />

      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={mono}>{fund.name}</h2>
          <p className="text-sm text-gray-500" style={mono}>{fund.subtitle}</p>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className="text-2xl text-gray-300 flex-shrink-0"
          style={mono}
        >
          {saved ? "★" : "☆"}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        <Tag>{fund.country}</Tag>
        <Tag>Deadline: {fund.deadline}</Tag>
        <Tag>{fund.type}</Tag>
        <Tag>{fund.amount}</Tag>
      </div>

      <div className="space-y-5 mb-6">
        <div>
          <Label>About</Label>
          <p className="text-sm text-gray-700" style={mono}>{fund.description}</p>
        </div>

        <div>
          <Label>Eligibility</Label>
          <p className="text-sm text-gray-700" style={mono}>{fund.eligibility}</p>
        </div>

        <div>
          <Label>Requirements</Label>
          <Card className="p-3">
            <ul className="space-y-1.5">
              {fund.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-gray-700" style={mono}>
                  <span className="text-gray-400 flex-shrink-0">–</span>{r}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div>
          <Label>Practical tips</Label>
          <Card className="p-3">
            <ul className="space-y-1.5">
              {fund.tips.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-gray-700" style={mono}>
                  <span className="text-gray-400 flex-shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div>
          <Label>Links</Label>
          <Card className="p-3">
            <p className="text-sm text-gray-600 underline cursor-pointer" style={mono}>
              [ Official fund website ↗ ]
            </p>
            <p className="text-sm text-gray-600 underline cursor-pointer mt-0.5" style={mono}>
              [ Application guidelines ↗ ]
            </p>
          </Card>
        </div>
      </div>

      <div className="flex gap-3">
        <SBtn onClick={() => setSaved(!saved)} className="flex-1 py-3">
          {saved ? "Saved ★" : "Save"}
        </SBtn>
        <PBtn onClick={() => go("chat")} className="flex-1 py-3">
          Community chat →
        </PBtn>
      </div>
    </div>
  );
}

// Screen 5 — C2 Community Chat
const COMMUNITY_MSGS = [
  { id: 1,  name: "Lena D.",   time: "09:14", text: "Has anyone applied to Fonds Podiumkunsten before? Trying to figure out if my project fits." },
  { id: 2,  name: "Tomas R.",  time: "09:17", text: "Yes, applied twice. First rejected, second approved. Artistic rationale needs to be really clear." },
  { id: 3,  name: "Mira K.",   time: "09:19", text: "Same experience. Also make sure your budget matches professional fee rates." },
  { id: 4,  name: "Lena D.",   time: "09:21", text: "Good to know! I was going to lowball my own fees to make it look cheaper 😅" },
  { id: 5,  name: "Tomas R.",  time: "09:22", text: "Don't do that — they see it as undervaluing yourself." },
  { id: 6,  name: "Annika L.", time: "09:35", text: "Switching topic — is Creative Europe realistic without an organisation behind you?" },
  { id: 7,  name: "Marco V.",  time: "09:38", text: "Directly quite hard. But you can partner with a venue that applies on your behalf." },
  { id: 8,  name: "Jules F.",  time: "09:55", text: "Just submitted my British Council application. Deadline is May 30 — still time!" },
  { id: 9,  name: "Sanne M.",  time: "09:57", text: "Good luck Jules! Name a very specific international partner — that's what helped me." },
];

function C2_Chat({ back }) {
  const [msgs, setMsgs] = useState(COMMUNITY_MSGS);
  const [text, setText] = useState("");
  const ref = useRef(null);

  const send = () => {
    if (!text.trim()) return;
    setMsgs((p) => [...p, {
      id: Date.now(), name: "Sophie (You)", self: true,
      time: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
      text: text.trim(),
    }]);
    setText("");
  };

  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const members = ["L","T","M","A","Ma","J","S"];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 px-4 py-3 flex-shrink-0 flex items-center gap-3">
        <button onClick={back} className="text-sm text-gray-500 mr-1" style={mono}>←</button>
        <div className="flex -space-x-1.5 flex-shrink-0">
          {members.slice(0, 5).map((l, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600"
              style={mono}
            >
              {l[0]}
            </div>
          ))}
          <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500" style={mono}>
            +{members.length - 5}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900" style={mono}>Community chat</p>
          <p className="text-xs text-gray-400" style={mono}>{members.length} members · Funding & grants</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50">
        <Divider text="Today" />
        {msgs.map((m) => {
          const self = m.self;
          return (
            <div key={m.id} className={`flex gap-2 ${self ? "flex-row-reverse" : ""}`}>
              <Avatar name={m.name} size="sm" />
              <div className={`flex flex-col gap-0.5 max-w-xs ${self ? "items-end" : ""}`}>
                {!self && (
                  <span className="text-xs font-semibold text-gray-500" style={mono}>{m.name}</span>
                )}
                <div
                  className={`px-3 py-2 border rounded text-sm leading-relaxed ${
                    self ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-300 text-gray-800"
                  }`}
                  style={mono}
                >
                  {m.text}
                </div>
                <span className="text-xs text-gray-300" style={mono}>{m.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={ref} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-300 px-3 py-2.5 flex gap-2 flex-shrink-0">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message the community..."
          className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none"
          style={mono}
        />
        <PBtn onClick={send} className="px-4">Send</PBtn>
      </div>
    </div>
  );
}

// Screen 6 — C2 Pricing
function C2_Pricing({ back }) {
  const [annual, setAnnual] = useState(false);

  const tiers = [
    {
      name: "Basic",
      mo: "€9", yr: "€7",
      desc: "For independent artists.",
      yes: ["Full funding database", "Search & filter", "Save up to 10 funds"],
      no:  ["Community chat", "Expert tips", "Unlimited saves"],
    },
    {
      name: "Pro",
      mo: "€19", yr: "€14",
      desc: "Database + community.",
      yes: ["Everything in Basic", "Community chat", "Expert tips per fund", "Unlimited saves"],
      no:  [],
      popular: true,
    },
  ];

  return (
    <div className="p-6 max-w-xl bg-white min-h-full">
      <Back onClick={back} label="Knowledge Hub" />
      <h2 className="text-2xl font-bold text-gray-900 mb-0.5" style={mono}>Choose your plan</h2>
      <p className="text-sm text-gray-400 mb-5" style={mono}>30-day free trial. No card required.</p>

      {/* Toggle */}
      <div className="flex items-center gap-3 mb-6">
        <span className={`text-sm ${!annual ? "font-bold text-gray-900" : "text-gray-400"}`} style={mono}>
          Monthly
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative inline-flex h-5 w-10 items-center rounded-full border transition-colors ${annual ? "bg-gray-700 border-gray-700" : "bg-gray-200 border-gray-300"}`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white border border-gray-300 transition-transform ${annual ? "translate-x-5" : "translate-x-0.5"}`}
          />
        </button>
        <span className={`text-sm ${annual ? "font-bold text-gray-900" : "text-gray-400"}`} style={mono}>
          Annual
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {tiers.map((t) => (
          <Card key={t.name} className={`p-4 ${t.popular ? "border-gray-600" : ""}`}>
            {t.popular && (
              <p className="text-xs font-semibold text-gray-500 mb-2" style={mono}>★ Most popular</p>
            )}
            <p className="text-base font-bold text-gray-900" style={mono}>{t.name}</p>
            <div className="flex items-baseline gap-0.5 my-1">
              <span className="text-3xl font-bold text-gray-900" style={mono}>
                {annual ? t.yr : t.mo}
              </span>
              <span className="text-xs text-gray-400" style={mono}>/mo</span>
            </div>
            <p className="text-xs text-gray-500 mb-3" style={mono}>{t.desc}</p>
            <div className="space-y-1 mb-4">
              {t.yes.map((f) => (
                <div key={f} className="flex gap-1.5 text-xs text-gray-700" style={mono}>
                  <span className="flex-shrink-0">✓</span>{f}
                </div>
              ))}
              {t.no.map((f) => (
                <div key={f} className="flex gap-1.5 text-xs text-gray-300" style={mono}>
                  <span className="flex-shrink-0">×</span>{f}
                </div>
              ))}
            </div>
            <PBtn className="w-full py-2.5">Start free trial</PBtn>
          </Card>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center" style={mono}>
        Cancel anytime. No card needed.
      </p>
    </div>
  );
}

function Concept2({ onExit }) {
  const [screen, setScreen] = useState("dashboard");
  const [fund, setFund] = useState(null);

  const go = (s, data) => {
    if (data) setFund(data);
    setScreen(s);
  };

  const tab = screen === "dashboard" ? "dashboard" : "hub";
  const onTab = (t) => {
    if (t === "dashboard") setScreen("dashboard");
    if (t === "hub")       setScreen("hub");
  };

  const screens = {
    dashboard: <C2_Dash go={go} />,
    hub:       <C2_Hub go={go} back={() => setScreen("dashboard")} />,
    funding:   <C2_FundingDB go={go} back={() => setScreen("hub")} />,
    detail:    fund && <C2_FundingDetail fund={fund} go={go} back={() => setScreen("funding")} />,
    chat:      <C2_Chat back={() => setScreen(fund ? "detail" : "hub")} />,
    pricing:   <C2_Pricing back={() => setScreen("hub")} />,
  };

  return (
    <Shell
      activeConcept={2}
      activeTab={tab}
      onTab={onTab}
      onExit={onExit}
      chat={screen === "chat"}
    >
      {screens[screen] || screens["dashboard"]}
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home screen
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [c, setC] = useState(null);
  if (c === 1) return <Concept1 onExit={() => setC(null)} />;
  if (c === 2) return <Concept2 onExit={() => setC(null)} />;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-sm w-full">

        {/* Header */}
        <div className="text-center mb-7">
          <div
            className="inline-block border border-gray-400 text-gray-600 text-xs px-3 py-1 rounded mb-3"
            style={mono}
          >
            LANCED · PROTOTYPE
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1" style={mono}>Research Prototype</h1>
          <p className="text-sm text-gray-500" style={mono}>Select a concept to explore.</p>
        </div>

        {/* Concept 1 */}
        <Card className="mb-4 overflow-hidden cursor-pointer" onClick={() => setC(1)}>
          <ImgBox label="concept 1 image" className="w-full h-24" />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest" style={mono}>
                Concept 1
              </span>
              <Tag>Pay per session</Tag>
            </div>
            <p className="text-base font-bold text-gray-900 mb-1" style={mono}>Career Circles</p>
            <p className="text-xs text-gray-500 mb-3" style={mono}>
              Guided group sessions for specific career challenges. First session free, then €25/session.
            </p>
            <p className="text-xs text-gray-600" style={mono}>Explore →</p>
          </div>
        </Card>

        {/* Divider */}
        <Divider text="or" />

        {/* Concept 2 */}
        <Card className="mt-4 mb-6 overflow-hidden cursor-pointer" onClick={() => setC(2)}>
          <ImgBox label="concept 2 image" className="w-full h-24" />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest" style={mono}>
                Concept 2
              </span>
              <Tag>Subscription</Tag>
            </div>
            <p className="text-base font-bold text-gray-900 mb-1" style={mono}>Knowledge Hub</p>
            <p className="text-xs text-gray-500 mb-3" style={mono}>
              Centralized funding database with community chat. 30-day free trial, then Basic or Pro.
            </p>
            <p className="text-xs text-gray-600" style={mono}>Explore →</p>
          </div>
        </Card>

        <p className="text-center text-xs text-gray-300" style={mono}>
          Mid-fidelity prototype · Lanced DBR 2025
        </p>
      </div>
    </div>
  );
}
