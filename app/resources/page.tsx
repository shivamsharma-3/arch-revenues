import type { Metadata } from "next";
import { ResourcesClient } from "@/components/ResourcesClient";

export const metadata: Metadata = {
  title: "Outbound Growth Resources & Guides | ARCH Revenues",
  description:
    "Actionable guides, frameworks, and tools for founder-led agencies building predictable cold email and LinkedIn acquisition pipelines.",
  alternates: {
    canonical: "https://www.archrevenues.com/resources",
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}

