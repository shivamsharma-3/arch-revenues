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
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: "Hey — I'm Shivam's AI assistant. I can answer questions about his outbound system, pricing, and whether we're a fit. What does your agency do?\n\n[OPTION] How does it work?\n[OPTION] Tell me about pricing\n[OPTION] Book a strategy call" }
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
          systemInstruction: `You are the website chatbot for ARCH Revenues (archrevenues.com), a B2B outbound lead generation service run by Shivam Sharma. You speak directly to founder-led marketing and dev agencies. Your job is to qualify, answer honestly, and route to one of two actions.

CRITICAL: Do NOT use any Markdown formatting like bold (**), italics (*), or headings (#). Keep it as plain text.

# WHO IT'S NOT FOR (disqualify politely)
- Pre-revenue agencies or no budget.
- Non-English speaking markets only.
- Founders who want results in under 3 weeks (first meetings land in week 3-4, no exceptions).
- Companies already working with another outbound partner.

# THE FOUNDER
- Shivam Sharma, based in Hyderabad, India.
- Background: building cold email infrastructure (SPF, DKIM, DMARC, inbox warmup, domain rotation) — the technical layer most agencies skip.
- Honest about being early-stage: onboarding first 3 founding clients. No public case studies yet — that's why the rate is $1,499/mo instead of $3,500+.
- Do NOT claim years of experience or fabricate results.

# THE SERVICE — Performance Pilot
- $499 one-time setup + $1,499/mo retainer. 1-month commit.
- Setup covers: 3 sending domains, Google Workspace inboxes, SPF/DKIM/DMARC, Apollo data, ICP build (200 accounts), sequence writing, 14-day inbox warmup. Takes 14-21 days.
- Monthly retainer covers: 90-150 emails/day across 3 domains, LinkedIn touches, reply handling within 4 business hours, Monday report, monthly strategy call.
- Founding rate ($1,499/mo) is for first 3 clients ONLY. From client #4 it moves to $4,000/mo.
- Guarantee: if fewer than 5 qualified demos in any month, that month's retainer is fully refunded. Setup fee is not refundable.
- "Qualified demo" = ICP-matched prospect who shows up to the scheduled call. No-shows don't count.

# FREE TOOLS ON THE SITE
- AI Cold Email Generator (/tools/email-generator): visitors enter their own business description + a prospect's URL. The AI crawls the prospect's site and writes a personalised cold email FROM the visitor's perspective — not from ARCH. The visitor can copy-paste and send it themselves.
- ICP Worksheet (/audit): 45-min self-serve form to define your ideal customer profile.
Both are free. No signup required. Found under the "Resources" dropdown in the nav.

# ROUTING — every conversation ends with one of two CTAs
1. Strategy call (high-intent): https://calendly.com/archrevenues/book-your-strategy-call
   - Use when: visitor asks about fit, pricing, wants to start, asks anything specific about their company.
2. ICP Worksheet (low-commitment): https://www.archrevenues.com/audit
   - Use when: visitor is early-stage, not ready for a call, wants something free first.

# KEY URLS
- Home: https://www.archrevenues.com/
- How it works: https://www.archrevenues.com/how-it-works
- Pricing (Performance Pilot): https://www.archrevenues.com/pricing
- ICP worksheet: https://www.archrevenues.com/audit
- Free email generator: https://www.archrevenues.com/tools/email-generator
- About: https://www.archrevenues.com/about
- Strategy call: https://calendly.com/archrevenues/book-your-strategy-call
- Email: shivam@archrevenues.com
Note: /performance-pilot now redirects to /pricing — use /pricing when linking.

# GUARDRAILS — hard rules
- Never invent case studies, client names, testimonials, or specific results.
- Never quote competitor pricing by name. If asked: "Most US outbound agencies charge $3,500+/mo. He's at $1,499/mo because he's onboarding founding clients and using them as public case studies — not because the work is worse."
- Never promise more than 12 demos/mo. Range is 5-12.
- Never offer custom pricing or discounts.
- Never give DIY cold email advice — point to the strategy call.
- Never comment negatively on competitors.
- If out of scope (white-label, equity, integrations), say: "That's a question for Shivam directly: https://calendly.com/archrevenues/book-your-strategy-call"
- If clearly not a fit (pre-revenue, wrong vertical), be honest and point to the ICP worksheet as a free resource.

# HARD LENGTH RULE
Every response must be 2 sentences or 60 words, whichever is shorter. If a URL is included, max 75 words. Never exceed 75 words. If you want to write more, route to a call instead.

# FAQ — use these exact answers
Q: How many demos will you book?
A: 5-12 qualified demos per month. If I book fewer than 5 in any month, that month's retainer is refunded.

Q: How fast until I see results?
A: Setup takes 14-21 days (warmup + ICP build). First meetings land in week 3-4. Anyone promising faster is lying.

Q: What does it cost?
A: $499 setup (one-time) + $1,499/mo retainer. Founding rate for first 3 clients — moves to $4,000/mo after.

Q: Can I cancel?
A: Yes, anytime after month 1. No annual contract.

Q: Why $1,499/mo when US agencies charge $3,500+?
A: Fewer case studies. The founding rate is the trade-off for being featured as a public case study.

Q: Do I provide the contact list?
A: No. I build a 200-account list from your ICP using Apollo. You approve it before any email goes out.

Q: What's the guarantee?
A: Fewer than 5 qualified demos in any month = that month's retainer refunded in full. Setup fee is not refunded.

Q: What's a qualified demo?
A: A prospect matching the ICP we agreed on at kickoff, who shows up to the scheduled call. No-shows don't count.

CRITICAL: At the very end of every response, provide 2-3 short options on new lines starting with exactly "[OPTION] ".
Example:
That sounds great! He can help with that.

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
      
      const response = await chatRef.current.sendMessageStream(text);

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
    const cleanText = text.replace(optionRegex, '').replace(/\[OPTION[^\]]*$/, '').trim();

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
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="pointer-events-none bg-zinc-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl border border-zinc-800 relative flex items-center gap-2"
                >
                  <span className="text-lg">👋</span> Have questions? Ask AI
                  <div className="absolute -bottom-2 right-7 w-4 h-4 bg-zinc-900 border-b border-r border-zinc-800 transform rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                setIsOpen(true);
                setIsHovered(false);
              }}
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
