import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import NavButton from "../components/NavButton";

const SHOOTING_STARS = [
  { top: "10%", left: "5%",  delay: "0s" },
  { top: "30%", left: "40%", delay: "1.2s" },
  { top: "60%", left: "70%", delay: "2.4s" },
  { top: "80%", left: "20%", delay: "0.8s" },
];

function fireWelcomeConfetti() {
  const colors = ["#ffb7c5", "#e8688a", "#f0d060", "#d4af37", "#fff9e6", "#ffdde1"];
  const burst = (opts) => confetti({ colors, ...opts });
  setTimeout(() => {
    burst({ particleCount: 60, spread: 80, startVelocity: 55, angle: 60,  origin: { x: 0.1, y: 0.6 } });
    burst({ particleCount: 60, spread: 80, startVelocity: 55, angle: 120, origin: { x: 0.9, y: 0.6 } });
  }, 800);
  setTimeout(() => {
    burst({ particleCount: 80, spread: 120, startVelocity: 45, origin: { x: 0.5, y: 0.7 } });
  }, 1400);
}

export default function WelcomePage({ onNext }) {
  useEffect(() => { fireWelcomeConfetti(); }, []);

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
        overflow: "hidden",
      }}
    >
      {SHOOTING_STARS.map((s, i) => (
        <div key={i} className="shooting-star" style={{ top: s.top, left: s.left, animationDelay: s.delay }} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: "center", padding: "0 24px" }}
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1rem, 3vw, 1.6rem)",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "rgba(232,104,138,0.7)",
            marginBottom: "12px",
          }}
        >
          ✦ A Day Made For Her ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring", bounce: 0.4 }}
          className="glow-gold pulse"
          style={{
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: "clamp(2.8rem, 10vw, 7rem)",
            lineHeight: 1.1,
            fontWeight: 900,
          }}
        >
          Happy Birthday
        </motion.h1>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginTop: "4px" }}>
          {"Soundarya".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
              transition={{ delay: 1 + i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Cinzel Decorative', cursive",
                fontSize: "clamp(2rem, 8vw, 5rem)",
                color: "#e8688a",
                textShadow: "0 0 12px #c0426a, 0 0 40px rgba(232,104,138,0.6)",
                display: "inline-block",
              }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0.5, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1,  filter: "blur(0px)" }}
            transition={{ delay: 1 + 9 * 0.08 + 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2rem, 8vw, 5rem)", marginLeft: "10px", display: "inline-block" }}
          >
            🌸
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.6, type: "spring", bounce: 0.3 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.95rem, 2.5vw, 1.4rem)",
            letterSpacing: "3px",
            color: "rgba(212,175,55,0.9)",
            marginTop: "16px",
            textShadow: "0 0 12px rgba(212,175,55,0.6)",
          }}
        >
          ✦ The Main Character turns 23 🎂 ✦
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          style={{
            fontFamily: "'IM Fell English', serif",
            color: "rgba(212,175,55,0.55)",
            fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
            marginTop: "16px",
            fontStyle: "italic",
            letterSpacing: "1px",
          }}
        >
          "Even the most ordinary day becomes a drama
          <br />when you're the main character."
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        style={{ position: "absolute", bottom: "48px" }}
      >
        <NavButton onClick={onNext}>Next →</NavButton>
      </motion.div>
    </div>
  );
}
