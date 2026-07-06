import { FAQ } from "@/components/FAQ";

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow pt-20 pb-12 md:pt-32 md:pb-24">
        <FAQ />
      </main>
    </div>
  );
}
