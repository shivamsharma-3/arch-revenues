"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Bot, Maximize2, Minimize2 } from "lucide-react";
import Markdown from "react-markdown";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 380, height: 580 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeDirectionRef = useRef<"corner" | "left" | "top" | null>(null);
  const startDragRef = useRef<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 380, h: 580 });

  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: "Hey! I'm Shivam's AI assistant. I can answer questions about his outbound lead-gen system, pricing, deliverables, and whether we're a good fit for your agency. What does your agency do?\n\n[OPTION] How does it work?\n[OPTION] Tell me about pricing\n[OPTION] Book a strategy call" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle drag to resize
  const handleResizeStart = useCallback((e: React.MouseEvent, direction: "corner" | "left" | "top") => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeDirectionRef.current = direction;
    startDragRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: dimensions.width,
      h: dimensions.height,
    };
  }, [dimensions]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeDirectionRef.current) return;
      const dir = resizeDirectionRef.current;
      // Chatbot is anchored to bottom-right, so moving mouse left increases width, moving up increases height
      const deltaX = startDragRef.current.x - e.clientX;
      const deltaY = startDragRef.current.y - e.clientY;

      const maxWidth = typeof window !== "undefined" ? Math.min(window.innerWidth - 32, 900) : 800;
      const maxHeight = typeof window !== "undefined" ? Math.min(window.innerHeight - 48, 900) : 800;

      setDimensions((prev) => {
        let newW = prev.width;
        let newH = prev.height;

        if (dir === "corner" || dir === "left") {
          newW = Math.max(340, Math.min(maxWidth, startDragRef.current.w + deltaX));
        }
        if (dir === "corner" || dir === "top") {
          newH = Math.max(420, Math.min(maxHeight, startDragRef.current.h + deltaY));
        }

        return { width: newW, height: newH };
      });

      if (isMaximized) {
        setIsMaximized(false);
      }
    };

    const handleMouseUp = () => {
      if (resizeDirectionRef.current) {
        resizeDirectionRef.current = null;
        setIsResizing(false);
      }
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, isMaximized]);

  const toggleMaximize = () => {
    if (!isMaximized) {
      setIsMaximized(true);
    } else {
      setIsMaximized(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsLoading(true);

    try {
      const payloadMessages = [...messages, { role: "user", text }];
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat request failed");
      }

      setMessages((prev) => [...prev, { role: "model", text: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        if (chunk) {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              text: newMessages[lastIndex].text + chunk,
            };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "I'm having trouble right now. Email Shivam directly at shivam@archrevenues.com or book a strategy call: https://calendly.com/archrevenues/book-your-strategy-call" },
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
        <div className="markdown-body prose prose-sm prose-zinc max-w-none [&_a]:break-all [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:my-1.5 [&_li]:my-0.5">
          <Markdown>{linkifiedText}</Markdown>
        </div>
        {options.length > 0 && isLast && !isLoading && (
          <div className="flex flex-wrap gap-2 mt-2">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(opt)}
                className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-3 py-1.5 rounded-full transition-colors border border-zinc-200 text-left font-medium shadow-2xs"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const windowStyle = isMaximized
    ? {
        width: "min(780px, calc(100vw - 2rem))",
        height: "min(820px, calc(100vh - 3rem))",
      }
    : {
        width: `min(${dimensions.width}px, calc(100vw - 2rem))`,
        height: `min(${dimensions.height}px, calc(100vh - 3rem))`,
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
            transition={{ duration: isResizing ? 0 : 0.2 }}
            style={windowStyle}
            className={`fixed bottom-6 right-6 z-50 bg-white border border-zinc-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-[width,height] ${
              isResizing ? "transition-none select-none" : "duration-150"
            }`}
          >
            {/* Top-Left Corner Resize Handle */}
            <div
              onMouseDown={(e) => handleResizeStart(e, "corner")}
              title="Drag to resize chatbot"
              className="absolute top-0 left-0 w-5 h-5 z-20 cursor-nwse-resize flex items-center justify-center group"
            >
              <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-zinc-400 group-hover:border-white transition-colors rounded-tl-sm ml-1 mt-1 opacity-70 group-hover:opacity-100" />
            </div>

            {/* Left Edge Resize Strip */}
            <div
              onMouseDown={(e) => handleResizeStart(e, "left")}
              className="absolute top-4 bottom-4 left-0 w-2 z-10 cursor-ew-resize hover:bg-teal-500/20 transition-colors"
              title="Drag to resize width"
            />

            {/* Top Edge Resize Strip */}
            <div
              onMouseDown={(e) => handleResizeStart(e, "top")}
              className="absolute top-0 left-4 right-16 h-2 z-10 cursor-ns-resize hover:bg-teal-500/20 transition-colors"
              title="Drag to resize height"
            />

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-zinc-900 text-white select-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">ARCH Assistant</h3>
                    <span className="hidden sm:inline-block text-[9px] uppercase tracking-wider bg-white/10 text-zinc-300 px-1.5 py-0.5 rounded font-medium">
                      Resizable
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400">AI-Powered Support</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMaximize}
                  title={isMaximized ? "Restore size" : "Expand size"}
                  className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                >
                  {isMaximized ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-zinc-900 text-white rounded-br-sm shadow-sm"
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
