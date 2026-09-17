import { useRef, useState } from 'react';
import './App.css';
import {
  ArrowRight,
  Bot,
  MessageSquareText,
  Minimize2,
  Rocket,
  Send,
  Shield,
  Sparkles,
  Star,
  Sword,
  X,
  Zap,
} from 'lucide-react';
import {
  gear,
  getAiReply,
  heroImage,
  navLinks,
  powerCards,
  profile,
  storyMoments,
} from './data/heroProfile';

let nextMessageId = 2;

const chatOptions = [
  { label: 'Origin story', prompt: 'What is your origin?' },
  { label: 'Top powers', prompt: 'List your top powers' },
  { label: 'Mission', prompt: 'What is your mission?' },
  { label: 'Threat level', prompt: 'Are you an ally or threat?' },
  { label: 'Suit', prompt: 'Tell me about your suit' },
];

const metrics = [
  { value: '14.2M', label: 'Threats neutralized' },
  { value: '96%', label: 'Civilians protected' },
  { value: '04', label: 'Active sectors secured' },
  { value: '24/7', label: 'Orbital surveillance' },
];

const powerBarStyles = {
  'from-cyan-400 to-sky-500': 'linear-gradient(90deg, #22d3ee, #38bdf8)',
  'from-violet-500 to-fuchsia-500': 'linear-gradient(90deg, #8b5cf6, #d946ef)',
  'from-emerald-400 to-teal-500': 'linear-gradient(90deg, #34d399, #14b8a6)',
  'from-amber-400 to-orange-500': 'linear-gradient(90deg, #fbbf24, #fb923c)',
};

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const replyTimerRef = useRef(null);
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      sender: 'ai',
      text: 'Protocol online. I am Astra Veyr. Ask about my origin, powers, or the missions that keep the orbit safe.',
    },
  ]);

  const openChat = () => {
    setChatOpen(true);
    setChatMinimized(false);
  };

  const closeChat = () => {
    setChatOpen(false);
    setChatMinimized(false);
    setInput('');
  };

  const sendMessage = (text) => {
    const content = text.trim();
    if (!content || isTyping) return;

    const userMessage = {
      id: nextMessageId++,
      sender: 'user',
      text: content,
    };

    if (replyTimerRef.current) {
      clearTimeout(replyTimerRef.current);
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    replyTimerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId++,
          sender: 'ai',
          text: getAiReply(content),
        },
      ]);
      setIsTyping(false);
      replyTimerRef.current = null;
    }, 450);
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      <header className="topbar">
        <nav className="nav-wrap">
          <a href="#home" className="brand-mark">
            <span className="brand-icon">
              <Star className="h-4 w-4" />
            </span>
            Astra Veyr
          </a>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <button type="button" onClick={openChat} className="nav-action" aria-label="Open AI assistant">
            <Bot className="h-3.5 w-3.5" />
            Engage AI
          </button>
        </nav>
      </header>

      <main className="content-shell">
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow-pill">
              <Sparkles className="h-3.5 w-3.5" />
              Sector 9 // Celestial Guard
            </div>

            <div className="headline-block">
              <p className="kicker">Unmasked operative</p>
              <h1 className="hero-title font-display">
                Hold the sky.
                <span>Break the dark.</span>
              </h1>
              <p className="hero-summary">{profile.summary}</p>
            </div>

            <div className="cta-row">
              <a href="#story" className="primary-cta">
                Explore Lore
                <ArrowRight className="h-4 w-4" />
              </a>
              <button type="button" onClick={openChat} className="secondary-cta" aria-label="Open AI protocol">
                <MessageSquareText className="h-4 w-4" />
                Engage AI Protocol
              </button>
            </div>

            <div className="metrics-row">
              {metrics.map((metric) => (
                <div key={metric.label} className="metric-box">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="visual-stage">
            <div className="orb orb-one" />
            <div className="orb orb-two" />

            <div className="hero-visual">
              <div className="hero-glow" />
              <div className="hero-frame">
                <img src={heroImage} alt={profile.name} className="hero-portrait" />
                <div className="hero-vignette" />
                <div className="hero-badge-wrap">
                  <div className="hero-badge">
                    <div>
                      <p>Protector</p>
                      <h2>{profile.alias}</h2>
                    </div>
                    <div className="badge-icon">
                      <Zap className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="story" className="content-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Character story</p>
              <h2 className="font-display">The truth beneath the mask</h2>
            </div>
            <div className="section-chip">Record 07 / Last known guardian</div>
          </div>

          <div className="story-layout">
            <div className="story-panel narrative-panel">
              <p className="section-tag text-cyan-300">Origin</p>
              <h3 className="font-display">Astra Veyr was never meant to be saved.</h3>
              <p>
                Born in the shadow of a failing orbital ring, she witnessed the collapse of a city that believed the heavens were untouchable. When the meteor wrecked Sector 9, a dormant star-lattice inside her body awakened, binding her to a cosmic code that reborn her into a guardian no one could fully understand.
              </p>
              <p>
                She hides behind a human face, but the sky only ever answers to the version of her that stands in armor, carrying impossible power with measured control.
              </p>
            </div>

            <div className="story-grid">
              {storyMoments.map((moment, index) => (
                <article key={moment.title} className="story-card">
                  <div className="story-card-top">
                    <span className="index-badge">0{index + 1}</span>
                    <span className="story-year">{moment.year}</span>
                  </div>
                  <h3>{moment.title}</h3>
                  <p>{moment.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="powers" className="content-section">
          <div className="section-heading compact-heading">
            <div>
              <p className="section-tag">Abilities</p>
              <h2 className="font-display">The powers of the Halo Breaker</h2>
            </div>
            <Shield className="h-8 w-8 text-cyan-300" />
          </div>

          <div className="power-grid">
            {powerCards.map((item) => (
              <div key={item.name} className="power-card">
                <div className="power-bar" style={{ background: powerBarStyles[item.accent] ?? 'linear-gradient(90deg, #22d3ee, #38bdf8)' }} />
                <div className="power-meta">
                  <span className="power-tag">{item.tag}</span>
                  <div className="power-icon">
                    <Zap className="h-4 w-4" />
                  </div>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="gear" className="content-section">
          <div className="section-heading compact-heading">
            <div>
              <p className="section-tag">Suit & gear</p>
              <h2 className="font-display">The arsenal</h2>
            </div>
            <Sword className="h-8 w-8 text-cyan-300" />
          </div>

          <div className="gear-grid">
            {gear.map((item) => (
              <div key={item.name} className="gear-card">
                <div className="gear-line" />
                <div className="gear-head">
                  <span className="gear-icon">
                    <Rocket className="h-4 w-4" />
                  </span>
                  <Zap className="h-4 w-4" />
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <p className="section-tag">Secure comms</p>
            <p className="footer-copy">© 2051 Astra Veyr. All rights reserved.</p>
          </div>

          <div className="footer-links">
            <a href="#">Signal</a>
            <a href="#">Pulse</a>
            <a href="#">Relay</a>
          </div>
        </div>
      </footer>

      <div className="chat-launcher">
        {!chatOpen ? (
          <button type="button" onClick={openChat} className="chat-toggle" aria-label="Open AI chat">
            <div className="chat-toggle-core">
              <Bot className="h-6 w-6" />
            </div>
          </button>
        ) : (
          <div className={`chat-panel ${chatMinimized ? 'minimized' : ''}`}>
            <div className="chat-header">
              <div className="chat-status">
                <span className="status-dot" />
                <p>AI Astra Veyr Protocol - Online</p>
              </div>

              <div className="chat-actions">
                <button type="button" onClick={() => setChatMinimized((value) => !value)} aria-label="Minimize chat">
                  <Minimize2 className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={closeChat} aria-label="Close chat">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {!chatMinimized && (
              <>
                <div className="chat-thread">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`chat-bubble ${message.sender === 'user' ? 'user' : 'ai'}`}
                    >
                      {message.text}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="chat-typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
                </div>

                <div className="chat-composer">
                  <div className="quick-actions">
                    <p>Quick actions</p>
                    <div className="quick-grid">
                      {chatOptions.map((option) => (
                        <button key={option.label} type="button" onClick={() => sendMessage(option.prompt)}>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="message-box">
                    <label>Type your question</label>
                    <div className="input-row">
                      <textarea
                        rows={1}
                        value={input}
                        autoFocus
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault();
                            sendMessage(input);
                          }
                        }}
                        placeholder="Ask Astra about her origin or powers..."
                      />
                      <button type="button" onClick={() => sendMessage(input)} aria-label="Send message">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
