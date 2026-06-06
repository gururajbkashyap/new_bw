import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const OPTIONS = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 120, density: { enable: true } },
    color: { value: ["#ffffff", "#ffd6e0", "#ff8fab", "#c9b8d8", "#fff0f5"] },
    opacity: {
      value: { min: 0.1, max: 0.8 },
      animation: { enable: true, speed: 0.5, sync: false },
    },
    size: {
      value: { min: 0.5, max: 2.5 },
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    twinkle: {
      particles: { enable: true, frequency: 0.05, opacity: 1 },
    },
  },
  detectRetina: true,
};

export default function StarBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      options={OPTIONS}
      style={{ position: "fixed", inset: 0, zIndex: 0, width: "100%", height: "100%" }}
    />
  );
}
