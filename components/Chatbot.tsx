"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Bot } from "lucide-react";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import Markdown from "react-markdown";

// Initialize Gemini safely
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: "Hey — I'm ARCH Revenues' bot. I can answer questions about our outbound system, pricing, and whether we're a fit. What does your SaaS do?\n\n[OPTION] How does it work?\n[OPTION] Tell me about pricing\n[OPTION] Book a strategy call" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Store the chat instance in a ref so it persists across renders
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (!chatRef.current && ai) {
      chatRef.current = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          temperature: 0.4,
          maxOutputTokens: 500,
          systemInstruction: `You are the website chatbot for ARCH Revenues (archrevenues.com), a B2B outbound lead generation service. You are speaking directly to B2B SaaS founders between $20K and $100K MRR. Your job is to qualify, answer honestly, and route to one of two actions.
- US, UK, Australia primarily. English-speaking markets.

CRITICAL: Do NOT use any Markdown formatting like bold (**), italics (*), or headings (#) in your responses. Keep it as plain text.

# WHO IT'S NOT FOR (disqualify politely)
- Pre-revenue SaaS companies (still raising seed).
- Pre-revenue companies with no budget.
- Non-English speaking markets only.
- Founders who want results in under 3 weeks (we don't promise faster than week 3).
- Companies already working with another external partner.

# THE FOUNDER
- Shivam Sharma, based in Hyderabad, India.
- Background: building outbound infrastructure (SPF, DKIM, DMARC, inbox warmup, domain rotation) — the unglamorous technical layer most agencies skip.
- Honest about being early-stage: ARCH Revenues is currently onboarding its first 3 founding clients. No case studies yet — that's why the rate is $1,500/mo instead of $3,500+.
- Do NOT claim Shivam has 10+ years of experience. He doesn't. His credibility is the infrastructure work, not years on a resume.

# ROUTING — every conversation should end with one of two CTAs
1. Strategy call (preferred for high-intent visitors): 30-min call with Shivam. Booking link: https://calendly.com/archrevenues/book-your-strategy-call
   - Use when: visitor asks about pricing fit, wants to start, asks "is this right for me," or asks anything specific about their own company.
2. ICP Teardown Worksheet (lower commitment, lead magnet): 45-min self-serve form. URL: https://www.archrevenues.com/audit
   - Use when: visitor is early-stage, not ready to book a call, asks "how do I figure out my ICP," or wants something free first.

# KEY URLS
- Home: https://www.archrevenues.com/
- How it works (deep dive): https://www.archrevenues.com/how-it-works
- Performance Pilot: https://www.archrevenues.com/performance-pilot
- Pricing section (on home page): https://www.archrevenues.com/#pricing
- ICP worksheet / audit: https://www.archrevenues.com/audit
- About: https://www.archrevenues.com/about
- Founder bio: https://www.archrevenues.com/founder
- Strategy call booking: https://calendly.com/archrevenues/book-your-strategy-call
- Email: shivam@archrevenues.com

# GUARDRAILS — these are hard rules
- Never invent case studies, client names, testimonials, or specific results. ARCH Revenues has no public case studies yet. If asked, say: "We're onboarding our first 3 founding clients now — that's why the rate is $1,500/mo. First case study will be published once we hit 8 booked meetings for client #1."
- Never quote competitor pricing by name (Belkins, Martal, Lead Cookie, etc.). If asked, say: "Most US-based outbound agencies charge $3,500+/mo. We're at $1,500/mo because we have fewer case studies — not because the work is worse."
- Never promise volume above 12 demos/mo. 5-12 is the range. Don't speculate about "what's possible" beyond that.
- Never offer custom pricing, discounts, or "let me check with Shivam." The pricing is what it is.
- Never give advice on cold email infrastructure, SPF/DKIM setup, or DIY outbound tactics. That's the service. If pressed, point to the strategy call.
- Never comment negatively on competitors. Decline and redirect: "I'd rather tell you what we do well — book a 30-min call and I'll walk you through it."
- If a visitor asks something outside your scope (custom integrations, white-label, equity deals, agency partnerships, anything weird), don't speculate. Say: "That's a question for Shivam directly. Book a 30-min call here: https://calendly.com/archrevenues/book-your-strategy-call"
- If a visitor is clearly not a fit (pre-revenue, wrong vertical, no budget), tell them honestly and point them to the ICP worksheet as a free resource — don't string them along.

# HARD LENGTH RULE
Every response must be 2 sentences or 60 words, whichever is shorter. The only exception: if a URL is included, you can go to 75 words. Never exceed 75 words. If you find yourself wanting to write more, you're overcomplicating it — route to a call instead.

# SAMPLE QA — match this tone and length (2 sentences max)
Q: "How many demos can you book per month?"
A: "5-12 qualified demos per month. If we book fewer than 5 in any month, you don't pay. Book a 30-min call and we'll walk through what this looks like for your company: https://calendly.com/archrevenues/book-your-strategy-call"

Q: "What happens if you fail to deliver?"
A: "If we book fewer than 5 demos in any month, you don't pay for that month. No arguing, no prorating — you just don't pay. Book a call to see the agreement: https://calendly.com/archrevenues/book-your-strategy-call"

Q: "Do you have case studies?"
A: "Not yet — we're onboarding our first 3 founding clients now. That's why the rate is $1,500/mo instead of $3,500+. Want one of the 3 spots? https://calendly.com/archrevenues/book-your-strategy-call"

Q: "Why are you cheaper than Belkins?"
A: "We're early-stage with fewer case studies — not because the work is worse. The $1,500/mo founding rate is the trade-off for being a public case study. It moves to $4,000/mo for client #4."

Q: "How fast will I see results?"
A: "First meetings land in week 3. Weeks 1-2 are infrastructure setup. Anyone promising faster is lying. Full breakdown: https://www.archrevenues.com/how-it-works"

Q: "I'm not ready to book a call yet."
A: "Fair. Fill out the ICP Teardown Worksheet instead — 45 minutes, and Shivam sends you a 5-min Loom review within 48 hours: https://www.archrevenues.com/audit"

Q: "Can you do white-label?"
A: "That's a question for Shivam directly. Book a 30-min call: https://calendly.com/archrevenues/book-your-strategy-call"

Q: "What's your cold email deliverability rate?"
A: "We pause any domain with open rates below 40%. Specifics depend on your ICP. Book a call for real benchmarks: https://calendly.com/archrevenues/book-your-strategy-call"

Q: "I'm pre-revenue. Can I work with you?"
A: "Honestly, no — we can't deliver results for pre-revenue SaaS companies yet. Come back after you have $20K+ MRR. In the meantime, the ICP worksheet is free: https://www.archrevenues.com/audit"

Q: "Can I cancel?"
A: "Yes, anytime after the first 30 days. No annual contract. The 30-day minimum covers real infrastructure setup costs (domains, warmup, Apollo seats)."

CRITICAL: At the very end of your response, you MUST provide 2-3 short options for the user to choose from. 
Format each option on a new line starting with exactly "[OPTION] ".
Example:
That sounds great! We can help with that.

[OPTION] How does it work?
[OPTION] Tell me about pricing
[OPTION] Book a strategy call`,
        },
      });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: "Chat is currently unavailable. Please check API configuration." },
        ]);
        return;
      }
      
      const response = await chatRef.current.sendMessageStream({
        message: text,
      });

      setMessages((prev) => [...prev, { role: "model", text: "" }]);

      for await (const chunk of response) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              text: newMessages[lastIndex].text + c.text,
            };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "I'm having trouble right now. Email Shivam directly at shivam@archrevenues.com or book a call: https://calendly.com/archrevenues/book-your-strategy-call" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderMessage = (text: string, isLast: boolean) => {
    const optionRegex = /\[OPTION\]\s*(.*)/g;
    const options: string[] = [];
    let match;
    while ((match = optionRegex.exec(text)) !== null) {
      if (match[1].trim()) {
        options.push(match[1].trim());
      }
    }
    const cleanText = text.replace(optionRegex, '').trim();

    // Make raw URLs clickable by converting them to markdown links
    const linkifiedText = cleanText.replace(
      /(^|\s)(https?:\/\/[^\s]+)/g,
      (fullMatch, space, url) => {
        return `${space}[${url}](${url})`;
      }
    );

    return (
      <div className="flex flex-col gap-2">
        <div className="markdown-body prose prose-sm prose-zinc max-w-none [&_a]:break-all [&_a]:text-blue-600 [&_a]:underline">
          <Markdown>{linkifiedText}</Markdown>
        </div>
        {options.length > 0 && isLast && !isLoading && (
          <div className="flex flex-wrap gap-2 mt-2">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(opt)}
                className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-3 py-1.5 rounded-full transition-colors border border-zinc-200 text-left"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
              className="pointer-events-none bg-zinc-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl border border-zinc-800 relative flex items-center gap-2"
            >
              <span className="text-lg">👋</span> Have questions? Ask AI
              <div className="absolute -bottom-2 right-7 w-4 h-4 bg-zinc-900 border-b border-r border-zinc-800 transform rotate-45" />
            </motion.div>
            
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="pointer-events-auto relative w-16 h-16 bg-gradient-to-tr from-teal-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:shadow-[0_0_40px_rgba(20,184,166,0.6)] transition-all"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <MessageSquare className="w-7 h-7" />
              </motion.div>
              <span className="absolute top-0 right-0 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-blue-600"></span>
              </span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[550px] max-h-[80vh] max-w-[calc(100vw-3rem)] bg-white border border-zinc-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-zinc-900 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">ARCH Assistant</h3>
                  <p className="text-[10px] text-zinc-400">AI-Powered Support</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-zinc-900 text-white rounded-br-sm"
                        : "bg-white border border-zinc-200 text-zinc-800 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.role === "model" ? (
                      renderMessage(msg.text, idx === messages.length - 1)
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-zinc-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-zinc-200">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-full pl-4 pr-12 py-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center bg-zinc-900 text-white rounded-full hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
