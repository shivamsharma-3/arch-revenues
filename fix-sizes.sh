#!/bin/bash
for file in components/FinalCTA.tsx components/EngagementModel.tsx components/CaseStudyPipeline.tsx components/Positioning.tsx components/HowItWorks.tsx components/FAQ.tsx; do
  sed -i 's/text-4xl md:text-5xl/text-3xl md:text-4xl/g' "$file"
done
echo "Done"
