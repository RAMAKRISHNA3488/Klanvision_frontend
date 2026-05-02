import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Code2, CheckCircle2, ChevronRight } from 'lucide-react';

// ── Knowledge Base ──
const KNOWLEDGE_BASE = {
  "managed services": "Klanvision's Managed IT Services provide comprehensive 24/7 monitoring, infrastructure management, and technical support. We act as your extended IT department, ensuring maximum uptime and proactive maintenance of your entire digital ecosystem.",
  "consultation": "Our IT Consultation and Advisory services focus on aligning technology with your business goals. We provide strategic roadmaps for digital transformation, infrastructure audits, and ROI-driven technology recommendations.",
  "cybersecurity": "We implement Zero-Trust architectures, advanced risk assessments, and continuous security monitoring. Our solutions safeguard your critical data and ensure compliance with global standards like ISO 27001 and GDPR.",
  "web development": "We build modern, high-performance web applications using React, Next.js, and Node.js. Our focus is on scalability, pixel-perfect UI/UX, and 100/100 Lighthouse performance scores.",
  "mobile app": "Klanvision develops native and cross-platform mobile apps for iOS and Android. From gesture-based UI to secure backend integrations, we ensure a seamless mobile experience for your customers.",
  "cloud": "Our AWS-certified experts handle cloud migration, architecture design, and cost optimization. We leverage Lambda, EC2, and S3 to build elastic, resilient infrastructures with 99.99% uptime.",
  "migration": "We specialize in zero-downtime website and system migrations. Our process ensures 100% data integrity, SEO equity preservation, and smooth legacy-to-modern transitions.",
  "api": "Our API Integration solutions enable seamless communication between disparate systems. We build secure, documented, and high-performance API layers to automate your business workflows.",
  "pricing": "Our pricing is tailored to each project's complexity and scale. We offer competitive rates for both project-based and retainer-based models. Would you like to speak with a consultant for a detailed quote?",
  "contact": "You can reach us at support@klanvision.com or via phone at +91 70323 62358. Our team is available 24/7 to assist you.",
};

type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user' | 'dev';
  timestamp: Date;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm Klanvision's AI Assistant. How can I help you modernize your business today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI Processing
    setTimeout(() => {
      let botResponse = "That's an insightful question. To provide you with a world-class solution, could you tell me more about your specific requirements in areas like Web Engineering, Cloud Architecture, or Security?";
      
      const lowerInput = inputValue.toLowerCase();
      
      for (const [key, val] of Object.entries(KNOWLEDGE_BASE)) {
        if (lowerInput.includes(key)) {
          botResponse = val;
          break;
        }
      }

      if (lowerInput.includes("developer") || lowerInput.includes("talk to") || lowerInput.includes("expert") || lowerInput.includes("technical")) {
        botResponse = "I am initializing a secure connection with one of our Senior Systems Architects to assist you further. One moment...";
        setIsDevMode(true);
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: isDevMode ? 'dev' : 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      if (isDevMode) {
        setTimeout(() => {
            const devFollowup: Message = {
                id: Date.now() + 2,
                text: "Hi! I'm a Senior Developer at Klanvision. I've just joined the session to provide advanced technical guidance. What architecture challenges are we solving today?",
                sender: 'dev',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, devFollowup]);
        }, 1500);
      }
    }, 1000);
  };

  const handleFinish = () => {
    setIsFinished(true);
    setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setIsFinished(false);
          setMessages([{ id: 1, text: "Hello! I'm Klanvision's AI Assistant. How can I help you modernize your business today?", sender: 'bot', timestamp: new Date() }]);
          setIsDevMode(false);
        }, 500);
    }, 4000);
  };

  return (
    <>
      {/* Floating Toggle Button – with excited pulsing animation */}
      <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 9000 }}>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
            border: 'none', cursor: 'pointer', position: 'relative'
          }}
        >
          {isOpen ? <X size={28} /> : <Bot size={32} />}
          
          {/* Notification Badge */}
          {!isOpen && (
            <div style={{ position: 'absolute', top: 2, right: 2, width: 14, height: 14, background: '#EF4444', borderRadius: '50%', border: '2px solid white' }} />
          )}

          {/* Rotating dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px dashed rgba(124, 58, 237, 0.6)' }}
          />
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            style={{
              position: 'fixed', bottom: 100, right: 30, zIndex: 9001,
              width: 380, maxWidth: 'calc(100vw - 60px)',
              height: 520, maxHeight: 'calc(100vh - 150px)',
              background: 'white', borderRadius: 28, overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex', flexDirection: 'column',
              fontFamily: "'Inter', sans-serif",
              border: '1px solid #F3F4F6'
            }}
          >
            {/* Header */}
            <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isDevMode ? <Code2 size={24} /> : <Bot size={24} />}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{isDevMode ? 'Senior Architect' : 'Klanvision AI Bot'}</div>
                <div style={{ fontSize: 11, opacity: 0.8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%' }} /> Active Support
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.7 }}><X size={20} /></button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16, background: '#F9FAFB' }}>
              {isFinished ? (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20 }}
                 >
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      style={{ width: 80, height: 80, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
                    >
                        <CheckCircle2 size={48} />
                    </motion.div>
                    <div>
                        <h3 style={{ fontWeight: 900, fontSize: 24, color: '#111827', marginBottom: 8 }}>Thank You!</h3>
                        <p style={{ color: '#6B7280', lineHeight: 1.5, fontSize: 15 }}>
                          Thanks for choosing our service.<br />
                          <b>Your digital transformation starts now.</b>
                        </p>
                    </div>
                 </motion.div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        display: 'flex', flexDirection: 'column',
                        alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{
                        padding: '12px 18px',
                        borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                        background: msg.sender === 'user' ? '#4F46E5' : 'white',
                        color: msg.sender === 'user' ? 'white' : '#374151',
                        fontSize: 14,
                        lineHeight: 1.6,
                        boxShadow: msg.sender === 'user' ? '0 10px 20px rgba(79, 70, 229, 0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
                        border: msg.sender === 'user' ? 'none' : '1px solid #E5E7EB'
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {msg.sender === 'bot' ? <Bot size={10} /> : msg.sender === 'dev' ? <Code2 size={10} /> : <User size={10} />}
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, padding: '12px 16px', background: 'white', borderRadius: 20, border: '1px solid #E5E7EB' }}>
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} style={{ width: 6, height: 6, background: '#9CA3AF', borderRadius: '50%' }} />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: 6, height: 6, background: '#9CA3AF', borderRadius: '50%' }} />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: 6, height: 6, background: '#9CA3AF', borderRadius: '50%' }} />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input Area */}
            {!isFinished && (
                <div style={{ padding: 20, borderTop: '1px solid #F3F4F6', background: 'white' }}>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                      <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about our services..."
                        style={{ flex: 1, padding: '12px 18px', borderRadius: 50, border: '1.5px solid #F3F4F6', outline: 'none', fontSize: 14, background: '#F9FAFB' }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSend}
                        style={{ width: 44, height: 44, borderRadius: '50%', background: '#4F46E5', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px rgba(79, 70, 229, 0.2)' }}
                      >
                        <Send size={20} />
                      </motion.button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button 
                          onClick={handleFinish}
                          style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      >
                          End Chat <ChevronRight size={14} />
                      </button>
                      {!isDevMode && (
                          <button 
                              onClick={() => { setIsTyping(true); setTimeout(() => { setIsDevMode(true); setIsTyping(false); setMessages(prev => [...prev, { id: Date.now(), text: "I've flagged a technical expert to join our session. One moment...", sender: 'bot', timestamp: new Date() }]); }, 1000); }}
                              style={{ background: '#EEF2FF', color: '#4F46E5', padding: '6px 14px', borderRadius: 10, border: 'none', fontSize: 11, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                          >
                              <Code2 size={12} /> Talk to Developer
                          </button>
                      )}
                  </div>
                </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
      `}</style>
    </>
  );
}
