'use client';

import { Hero } from '@/components/Hero';
import { Problem } from '@/components/Problem';
import { Positioning } from '@/components/Positioning';
import { HowItWorks } from '@/components/HowItWorks';
import { WhoThisIsFor } from '@/components/WhoThisIsFor';
import { WhyItWorks } from '@/components/WhyItWorks';
import { EngagementModel } from '@/components/EngagementModel';
import { Commitment } from '@/components/Commitment';
import { Results } from '@/components/Results';
import { AuditProcess } from '@/components/AuditProcess';
import { Comparison } from '@/components/Comparison';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen flex flex-col"
    >
      <Header />
      <main className="flex-grow">
        <Hero />
        <Results />
        <Problem />
        <Positioning />
        <HowItWorks />
        <WhoThisIsFor />
        <WhyItWorks />
        <EngagementModel />
        <Commitment />
        <Comparison />
        <FAQ />
        <AuditProcess />
        <FinalCTA />
      </main>
      <Footer />
    </motion.div>
  );
}
