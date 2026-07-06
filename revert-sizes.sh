#!/bin/bash
for file in components/FinalCTA.tsx components/EngagementModel.tsx components/CaseStudyPipeline.tsx components/Positioning.tsx components/HowItWorks.tsx components/FAQ.tsx components/Problem.tsx components/Comparison.tsx; do
  sed -i 's/text-3xl md:text-4xl/text-4xl md:text-5xl/g' "$file"
done
echo "Done"
