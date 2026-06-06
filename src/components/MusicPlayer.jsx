import { useState, useRef, useCallback, useEffect } from "react";

// Gentle music-box style Happy Birthday — sine oscillator, slower tempo
const MELODY = [
  // "Hap-py birth-day to you"
  [392.00, 0.26, 0.08],
  [392.00, 0.26, 0.08],
  [440.00, 0.50, 0.08],
  [392.00, 0.50, 0.08],
  [523.25, 0.50, 0.08],
  [493.88, 0.90, 0.28],

  // "Hap-py birth-day to you"
  [392.00, 0.26, 0.08],
  [392.00, 0.26, 0.08],
  [440.00, 0.50, 0.08],
  [392.00, 0.50, 0.08],
  [587.33, 0.50, 0.08],
  [523.25, 0.90, 0.28],

  // "Hap-py birth-day dear Soun-dar-ya"
  [392.00, 0.26, 0.08],
  [392.00, 0.26, 0.08],
  [783.99, 0.50, 0.08],
  [659.25, 0.50, 0.08],
  [523.25, 0.50, 0.08],
  [493.88, 0.50, 0.08],
  [440.00, 0.90, 0.28],

  // "Hap-py birth-day to you"
  [698.46, 0.26, 0.08],
  [698.46, 0.26, 0.08],
  [659.25, 0.50, 0.08],
  [523.25, 0.50, 0.08],
  [587.33, 0.50, 0.08],
  [523.25, 1.10, 0.50],
];

function scheduleNote(ctx, freq, start, duration, volume = 0.11) {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();

  // Sine wave = soft music-box / piano feel
  osc.type = "sine";
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.03);
  gain.gain.setValueAtTime(volume, start + duration * 0.55);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(start);
  osc.stop(start + duration + 0.05);
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const ctxRef  = useRef(null);
  const loopRef = useRef(null);

  const scheduleMelody = useCallback((ctx, startAt) => {
    let t = startAt;
    for (const [freq, dur, gap] of MELODY) {
      scheduleNote(ctx, freq, t, dur);
      t += dur + gap;
    }
    return t;
  }, []);

  const startLoop = useCallback(() => {
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    let nextStart = ctx.currentTime + 0.1;
    const tick = () => {
      nextStart = scheduleMelody(ctx, nextStart);
      loopRef.current = setTimeout(tick, (nextStart - ctx.currentTime - 1.5) * 1000);
    };
    tick();
    setPlaying(true);
  }, [scheduleMelody]);

  const stopLoop = useCallback(() => {
    clearTimeout(loopRef.current);
    ctxRef.current?.close();
    ctxRef.current = null;
    setPlaying(false);
  }, []);

  const toggle = () => { if (playing) stopLoop(); else startLoop(); };

  useEffect(() => {
    const onFirst = () => {
      if (!ctxRef.current) startLoop();
      document.removeEventListener("click",   onFirst);
      document.removeEventListener("keydown", onFirst);
    };
    document.addEventListener("click",   onFirst, { once: true });
    document.addEventListener("keydown", onFirst, { once: true });
    return () => {
      document.removeEventListener("click",   onFirst);
      document.removeEventListener("keydown", onFirst);
    };
  }, [startLoop]);

  useEffect(() => () => stopLoop(), [stopLoop]);

  return (
    <button
      onClick={toggle}
      title={playing ? "Mute music" : "Play music"}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 100,
        background: playing
          ? "rgba(255,143,171,0.18)"
          : "rgba(255,143,171,0.08)",
        border: "1px solid rgba(255,143,171,0.4)",
        borderRadius: "50%",
        width: 42,
        height: 42,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "1.1rem",
        backdropFilter: "blur(8px)",
        transition: "background 0.2s, box-shadow 0.2s",
        boxShadow: playing
          ? "0 0 12px rgba(255,143,171,0.6), 0 0 28px rgba(255,143,171,0.3)"
          : "none",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,143,171,0.25)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = playing ? "rgba(255,143,171,0.18)" : "rgba(255,143,171,0.08)")}
    >
      {playing ? "🔊" : "🎵"}
    </button>
  );
}
