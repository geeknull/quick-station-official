"use client";

import {
  Header,
  Hero,
  Philosophy,
  Features,
  HowItWorks,
  Download,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Features />
        <HowItWorks />
        <Download />
      </main>
      <Footer />
    </>
  );
}
