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
    { role: "model", text: "Hi! I'm the ARCH Revenues AI assistant. How can I help you scale your web design agency today?\n\n[OPTION] How does it work?\n[OPTION] Tell me about pricing\n[OPTION] Book a strategy call" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Store the chat instance in a ref so it persists across renders
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (!chatRef.current && ai) {
      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are a friendly, human-like AI assistant for ARCH Revenues (an outbound agency building AI-powered systems exclusively for web design agencies).
Keep your answers very short, conversational, and well-structured. Use short paragraphs (1-2 sentences) or bullet points to make it easy to read. Don't be overly formal. 

Tone: Professional, transparent, empathetic, founder-to-founder. No hype.
Key Info:
- Founder: Shivam Sharma (B.Tech in AI & Data Science).
- Target Audience: Web Design, UI/UX, Webflow, E-Commerce, and SaaS Design Agencies.
- Service: AI lead enrichment + personalized cold email + human oversight.
- Founding Client Program: Free system build for 5 agencies in exchange for feedback. (Only a few spots left)
- Pricing: Standard monthly retainer after the program (no revenue share, no long contracts).

CRITICAL: At the very end of your response, you MUST provide 2-3 short options for the user to choose from. 
Format each option on a new line starting with exactly "[OPTION] ".
Example:
That sounds great! We can help with that.

[OPTION] How does it work?
[OPTION] Tell me about pricing`,
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
        { role: "model", text: "Sorry, I encountered an error. Please try again later or book a strategy call." },
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

    return (
      <div className="flex flex-col gap-2">
        <div className="markdown-body prose prose-sm prose-zinc max-w-none">
          <Markdown>{cleanText}</Markdown>
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
