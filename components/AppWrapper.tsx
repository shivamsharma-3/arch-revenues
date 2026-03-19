'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuditPage = pathname === '/audit';

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!isAuditPage && <Header />}
      <AnimatePresence mode="popLayout" initial={true}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "linear" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {!isAuditPage && <Footer />}
      <Chatbot />
    </>
  );
}
