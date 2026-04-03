"use client";

import { Waves } from "@/components/ui/wave-background";

export function WaveHero() {
  return (
    <Waves
      className="absolute inset-0"
      strokeColor="rgba(255, 255, 255, 0.15)"
      backgroundColor="#0a0f1e"
    />
  );
}
