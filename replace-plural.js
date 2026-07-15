const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

const replacements = [
  // Teardown
  { file: 'Teardown.tsx', search: "We rewrite the rules", replace: "I rewrite the rules" },
  { file: 'Teardown.tsx', search: "We are a leading", replace: "I am a leading" },
  { file: 'Teardown.tsx', search: "We help businesses", replace: "I help businesses" },
  { file: 'Teardown.tsx', search: "We have features", replace: "I have features" },
  { file: 'Teardown.tsx', search: "We don't use", replace: "I don't use" },
  { file: 'Teardown.tsx', search: "We write", replace: "I write" },
  { file: 'Teardown.tsx', search: "we'd write", replace: "I'd write" },
  { file: 'Teardown.tsx', search: "We analyze", replace: "I analyze" },
  { file: 'Teardown.tsx', search: "We call out", replace: "I call out" },
  { file: 'Teardown.tsx', search: "We craft", replace: "I craft" },
  
  // SystemDiagram
  { file: 'SystemDiagram.tsx', search: "We find your", replace: "I find your" },
  
  // Pricing
  { file: 'Pricing.tsx', search: "We build and refine", replace: "I build and refine" },
  { file: 'Pricing.tsx', search: "once we hit", replace: "once I hit" },
  
  // Positioning
  { file: 'Positioning.tsx', search: "Our Commitment", replace: "My Commitment" },
  { file: 'Positioning.tsx', search: "when we book", replace: "when I book" },
  { file: 'Positioning.tsx', search: "We act as a specialized", replace: "I act as a specialized" },
  
  // HowItWorks
  { file: 'HowItWorks.tsx', search: "We build and refine", replace: "I build and refine" },
  
  // Hero
  { file: 'Hero.tsx', search: "We book 5-12", replace: "I book 5-12" },
  
  // FAQ
  { file: 'FAQ.tsx', search: "If we book", replace: "If I book" },
  { file: 'FAQ.tsx', search: "We build the list", replace: "I build the list" },
  { file: 'FAQ.tsx', search: "We handle all replies", replace: "I handle all replies" },
  { file: 'FAQ.tsx', search: "Why are you", replace: "Why do you charge" },
  { file: 'FAQ.tsx', search: "We work with any", replace: "I work with any" },
  
  // EngagementModel
  { file: 'EngagementModel.tsx', search: "where we build", replace: "where I build" },
  { file: 'EngagementModel.tsx', search: "We are currently offering", replace: "I am currently offering" },
  { file: 'EngagementModel.tsx', search: "when we deliver", replace: "when I deliver" },
  { file: 'EngagementModel.tsx', search: "once we hit", replace: "once I hit" },
  { file: 'EngagementModel.tsx', search: "We earn your business", replace: "I earn your business" },
  
  // Comparison
  { file: 'Comparison.tsx', search: "that's where we come in", replace: "that's where I come in" },
  
  // CaseStudyPipeline
  { file: 'CaseStudyPipeline.tsx', search: "We're onboarding our", replace: "I'm onboarding my" },
  
  // Calculator
  { file: 'Calculator.tsx', search: "Demos We Book", replace: "Demos I Book" },
  { file: 'Calculator.tsx', search: "Our Guarantee", replace: "My Guarantee" },
  
  // Chatbot
  { file: 'Chatbot.tsx', search: "ARCH Revenues' bot. I can answer questions about our outbound system", replace: "Shivam's AI assistant. I can answer questions about his outbound system" },
  { file: 'Chatbot.tsx', search: "we don't promise", replace: "he doesn't promise" },
  { file: 'Chatbot.tsx', search: "we're onboarding our", replace: "he's onboarding his" },
  { file: 'Chatbot.tsx', search: "We're onboarding our", replace: "He's onboarding his" },
  { file: 'Chatbot.tsx', search: "we hit 8", replace: "he hits 8" },
  { file: 'Chatbot.tsx', search: "We're at", replace: "He's at" },
  { file: 'Chatbot.tsx', search: "we have fewer", replace: "he has fewer" },
  { file: 'Chatbot.tsx', search: "we do well", replace: "he does well" },
  { file: 'Chatbot.tsx', search: "we book", replace: "he books" },
  { file: 'Chatbot.tsx', search: "we'll walk", replace: "he'll walk" },
  { file: 'Chatbot.tsx', search: "We're early-stage", replace: "He's early-stage" },
  { file: 'Chatbot.tsx', search: "We pause any", replace: "He pauses any" },
  { file: 'Chatbot.tsx', search: "we can't deliver", replace: "he can't deliver" },
  { file: 'Chatbot.tsx', search: "We can help", replace: "He can help" }
];

replacements.forEach(({ file, search, replace }) => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.split(search).join(replace);
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log("Done");
