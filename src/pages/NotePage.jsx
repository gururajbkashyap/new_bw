import { motion } from "framer-motion";
import NavButton from "../components/NavButton";

const MESSAGES = [
  { text: "I don't know how you do it.", delay: 1.3 },
  { text: "You've carried so much this year — more than most people ever will. And you still showed up every single day as the warmest version of yourself.", delay: 2.0 },
  { text: "That takes the kind of strength most people never find.", delay: 3.2 },
  { text: "You know how in every K-drama, the main character goes through everything — and still comes out soft, kind, completely herself?", delay: 4.2 },
  { text: "That's literally you, Soundarya. 💕", delay: 5.3 },
  { text: "I'm genuinely proud to call you my best friend.", delay: 6.0 },
  { text: "Happy Birthday 🌸🎂", delay: 6.7, highlight: true },
];

export default function NotePage({ onNext, onBack }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1,
        padding: "clamp(36px, 6vh, 56px) clamp(16px, 4vw, 40px) clamp(20px, 4vh, 36px)",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
      >
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "rgba(255,143,171,0.5)",
          margin: 0,
        }}>
          💬 a message for you
        </p>
      </motion.div>

      {/* Chat bubbles */}
      <div
        style={{
          flex: 1,
          width: "min(560px, 92vw)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "clamp(8px, 1.4vh, 14px)",
          padding: "clamp(8px, 1.5vh, 16px) 0",
          overflowY: "auto",
        }}
      >
        {MESSAGES.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: msg.delay, duration: 0.45, type: "spring", bounce: 0.2 }}
            style={{
              alignSelf: "flex-end",
              maxWidth: "85%",
              background: msg.highlight
                ? "linear-gradient(135deg, rgba(192,66,106,0.45) 0%, rgba(255,143,171,0.35) 100%)"
                : "rgba(255,143,171,0.12)",
              border: msg.highlight
                ? "1px solid rgba(255,143,171,0.6)"
                : "1px solid rgba(255,143,171,0.22)",
              borderRadius: "18px 18px 4px 18px",
              padding: "clamp(10px, 1.4vh, 14px) clamp(14px, 2vw, 20px)",
              boxShadow: msg.highlight
                ? "0 0 20px rgba(255,143,171,0.3)"
                : "none",
            }}
          >
            <p style={{
              fontFamily: msg.highlight ? "'Cinzel Decorative', cursive" : "'IM Fell English', serif",
              fontSize: msg.highlight
                ? "clamp(0.95rem, 2.2vw, 1.2rem)"
                : "clamp(0.88rem, 1.8vw, 1rem)",
              color: msg.highlight ? "#ffd6e0" : "rgba(255,249,230,0.88)",
              lineHeight: 1.65,
              margin: 0,
            }}>
              {msg.text}
            </p>
          </motion.div>
        ))}

        {/* Sender tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.4, duration: 0.5 }}
          style={{
            alignSelf: "flex-end",
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.7rem, 1.5vw, 0.82rem)",
            color: "rgba(255,143,171,0.5)",
            letterSpacing: "2px",
            margin: "2px 6px 0 0",
          }}
        >
          — Gururaj 🌸
        </motion.p>
      </div>

      {/* Nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7.6, duration: 0.5 }}
        style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", flexShrink: 0 }}
      >
        <NavButton onClick={onBack} variant="back">← Back</NavButton>
        <NavButton onClick={onNext}>Next →</NavButton>
      </motion.div>
    </div>
  );
}
