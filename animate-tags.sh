#!/bin/bash
for file in components/HowItWorks.tsx components/Pricing.tsx components/Problem.tsx components/SocialProof.tsx components/CaseStudyPipeline.tsx components/Comparison.tsx components/FAQ.tsx; do
  sed -i 's/<section /<motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} /g' "$file"
  sed -i 's/<\/section>/<\/motion.section>/g' "$file"
done
echo "Done"
