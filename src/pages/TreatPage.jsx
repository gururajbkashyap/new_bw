import { useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import NavButton from "../components/NavButton";

const EMOJIS = ["❤️", "🌸", "💕", "🌷", "💗", "🌺", "💖", "🫧", "✿", "💝"];

function spawnEmojiRain() {
  const container = document.getElementById("emoji-rain");
  if (!container) return;

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      const size = 18 + Math.random() * 26;
      const left = Math.random() * 100;
      const duration = 2.2 + Math.random() * 2.5;
      const delay = Math.random() * 1.2;
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      el.textContent = emoji;
      el.style.cssText = `
        position: absolute;
        top: -60px;
        left: ${left}%;
        font-size: ${size}px;
        animation: emojiRain ${duration}s ease-in ${delay}s forwards;
        pointer-events: none;
        user-select: none;
        z-index: 999;
        opacity: 0;
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), (duration + delay + 0.5) * 1000);
    }, i * 30);
  }
}

function fireStorm() {
  const colors = ["#ff8fab", "#ffd6e0", "#e8688a", "#ffb7c5", "#ff4d6d", "#c9b8d8", "#ffffff", "#ffc0cb"];

  let shapes = ["circle", "square"];
  try {
    shapes = [
      confetti.shapeFromText({ text: "❤️", scalar: 2 }),
      confetti.shapeFromText({ text: "🌸", scalar: 2 }),
      confetti.shapeFromText({ text: "💕", scalar: 2 }),
      confetti.shapeFromText({ text: "🌷", scalar: 2 }),
    ];
  } catch (_) {}

  const burst = (origin, angle, count, vel = 65) =>
    confetti({ colors, shapes, particleCount: count, spread: 170, angle, startVelocity: vel, scalar: 1.5, origin, ticks: 300 });

  // Initial big bang — 6 simultaneous cannons
  burst({ x: 0.5, y: 0.6 },  90, 350, 70);
  burst({ x: 0.0, y: 0.65 }, 60, 250, 80);
  burst({ x: 1.0, y: 0.65 }, 120, 250, 80);
  burst({ x: 0.5, y: 1.0 },  90, 300, 75);
  burst({ x: 0.15, y: 0.3 }, 50, 180, 85);
  burst({ x: 0.85, y: 0.3 }, 130, 180, 85);

  // Sustained storm — fires every 250ms for 3 seconds
  let tick = 0;
  const interval = setInterval(() => {
    burst({ x: Math.random(), y: 0.3 + Math.random() * 0.5 }, 60 + Math.random() * 60, 120, 55);
    burst({ x: Math.random(), y: 0.3 + Math.random() * 0.5 }, 60 + Math.random() * 60, 120, 55);
    tick++;
    if (tick >= 12) clearInterval(interval);
  }, 250);

  // Emoji rain
  spawnEmojiRain();
  setTimeout(spawnEmojiRain, 800);
  setTimeout(spawnEmojiRain, 1600);
}

function fadeOutConfetti() {
  const canvas = document.querySelector("canvas");
  if (canvas) {
    canvas.style.transition = "opacity 1.2s ease";
    canvas.style.opacity = "0";
    setTimeout(() => {
      confetti.reset();
      canvas.style.opacity = "1";
      canvas.style.transition = "";
    }, 1300);
  } else {
    confetti.reset();
  }
}

function SparkleTrail() {
  useEffect(() => {
    const emojis = ["❤️", "🌸", "💕", "✿", "💖"];
    const onMove = (e) => {
      if (Math.random() > 0.35) return;
      const el = document.createElement("div");
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const size = 14 + Math.random() * 14;
      el.style.cssText = `
        position:fixed; pointer-events:none; z-index:9999;
        left:${e.clientX - size / 2}px; top:${e.clientY - size / 2}px;
        font-size:${size}px; opacity:1;
        animation:sparkleFade 0.7s ease-out forwards;
        user-select:none;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 700);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}

function BirthdayPopup({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10,6,20,0.6)",
        backdropFilter: "blur(6px)",
        cursor: "pointer",
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.45, duration: 0.7 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(160deg, rgba(28,8,53,0.97) 0%, rgba(42,10,34,0.97) 100%)",
          border: "1.5px solid rgba(255,143,171,0.4)",
          borderRadius: "28px",
          padding: "clamp(32px, 6vh, 56px) clamp(32px, 6vw, 64px)",
          textAlign: "center",
          boxShadow: "0 0 60px rgba(255,143,171,0.35), 0 0 120px rgba(255,143,171,0.12)",
          maxWidth: "min(560px, 90vw)",
          position: "relative",
        }}
      >
        {/* Floating emojis inside popup */}
        {["🌸","💕","❤️","🌸","💖","🌷"].map((e, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 0], y: [10, -20, -40] }}
            transition={{ delay: 0.4 + i * 0.18, duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
            style={{
              position: "absolute",
              top: `${15 + (i % 3) * 20}%`,
              left: i < 3 ? `${5 + i * 8}%` : `${72 + (i - 3) * 8}%`,
              fontSize: "1.4rem",
              pointerEvents: "none",
            }}
          >
            {e}
          </motion.span>
        ))}

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "rgba(255,143,171,0.6)",
            marginBottom: "14px",
          }}
        >
          ✦ for you ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
          className="glow-gold pulse"
          style={{
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: "clamp(2rem, 7vw, 4.5rem)",
            lineHeight: 1.15,
            fontWeight: 900,
            marginBottom: "8px",
          }}
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, type: "spring", bounce: 0.3 }}
          style={{
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: "clamp(1.6rem, 5vw, 3rem)",
            color: "#ff8fab",
            textShadow: "0 0 12px rgba(255,143,171,0.8), 0 0 40px rgba(255,143,171,0.4)",
            marginBottom: "20px",
          }}
        >
          Soundarya 🌸
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          style={{
            fontFamily: "'IM Fell English', serif",
            color: "rgba(255,214,224,0.75)",
            fontSize: "clamp(0.88rem, 1.8vw, 1.05rem)",
            fontStyle: "italic",
            lineHeight: 1.7,
            marginBottom: "28px",
          }}
        >
          Wishing you the most beautiful year yet. 💕
          <br />You deserve every bit of happiness coming your way.
          <br /><br />
          <span style={{ color: "rgba(255,143,171,0.8)", fontSize: "0.95em" }}>
            Let there be some spark innovation in your life. ✨
          </span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          onClick={onClose}
          style={{
            background: "rgba(255,143,171,0.12)",
            border: "1px solid rgba(255,143,171,0.4)",
            borderRadius: "999px",
            padding: "10px 28px",
            cursor: "pointer",
            fontFamily: "'Cinzel', serif",
            fontSize: "0.8rem",
            letterSpacing: "2px",
            color: "rgba(255,214,224,0.7)",
          }}
        >
          ✦ Close ✦
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function TreatPage({ onNext, onRestart }) {
  const firedOnce = useRef(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!firedOnce.current) {
      firedOnce.current = true;
      // Small welcome burst on page load
      confetti({
        particleCount: 120,
        spread: 120,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#ff8fab", "#ffd6e0", "#e8688a", "#ffb7c5"],
      });
    }
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        gap: "18px",
        padding: "24px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Emoji rain container */}
      <div
        id="emoji-rain"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 50 }}
      />

      <style>{`
        @keyframes emojiRain {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <SparkleTrail />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.7, delay: 0.1 }}
        className="bounce"
        style={{ fontSize: "clamp(3.5rem, 12vw, 6rem)", lineHeight: 1 }}
      >
        🌸
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="glow-gold"
        style={{
          fontFamily: "'Cinzel Decorative', cursive",
          fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
          lineHeight: 1.3,
        }}
      >
        I don't say this enough — but you genuinely inspire me. 🌸
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          fontFamily: "'Cinzel Decorative', cursive",
          fontSize: "clamp(1rem, 3vw, 1.6rem)",
          color: "#e8688a",
          textShadow: "0 0 10px rgba(232,104,138,0.6)",
        }}
      >
        The way you keep going, keep smiling, keep being you...
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{
          fontFamily: "'IM Fell English', serif",
          color: "rgba(212,175,55,0.7)",
          fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
          fontStyle: "italic",
          maxWidth: "480px",
          lineHeight: 1.8,
        }}
      >
        I see it. I really do.
        <br />
        At 12am, I just wanted you to know — someone is thinking of you. 🌸
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        style={{ marginTop: "4px" }}
      >
        <NavButton onClick={() => { fireStorm(); setShowPopup(true); }}>💕 Click Me</NavButton>
        <div style={{ marginTop: "8px" }}>
          
        </div>
      </motion.div>

      <AnimatePresence>
        {showPopup && <BirthdayPopup onClose={() => { fadeOutConfetti(); setShowPopup(false); }} />}
      </AnimatePresence>
    </div>
  );
}
