import { motion } from "framer-motion";
import NavButton from "../components/NavButton";

export default function PhotoPage({ onNext, onBack }) {
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
        gap: "clamp(10px, 2vh, 20px)",
        padding: "clamp(14px, 3vh, 24px)",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glow-gold"
        style={{
          fontFamily: "'Cinzel Decorative', cursive",
          fontSize: "clamp(1rem, 3.5vw, 2rem)",
          textAlign: "center",
        }}
      >
        Happiest Birthday to my Chatting Friend 🌸
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.35, delay: 0.2 }}
        style={{
          width: "min(460px, 88vw)",
          borderRadius: "12px",
          overflow: "hidden",
          border: "2px solid rgba(232,104,138,0.55)",
          boxShadow: "0 0 18px rgba(232,104,138,0.35), 0 0 48px rgba(232,104,138,0.15)",
          lineHeight: 0,
        }}
      >
        <img
          src="/photos/me%20and%20her.jpeg"
          alt="Us together"
          style={{ width: "100%", height: "auto", display: "block", borderRadius: "10px" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.innerHTML =
              '<div style="display:flex;align-items:center;justify-content:center;height:200px;color:#e8688a;text-align:center;font-size:0.9rem;padding:16px;font-family:Cinzel,serif">📸 me and her.jpeg</div>';
          }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          fontFamily: "'IM Fell English', serif",
          color: "rgba(212,175,55,0.6)",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Every story needs a great co-star ✨
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
      >
        <NavButton onClick={onBack} variant="back">← Back</NavButton>
        <NavButton onClick={onNext}>Next →</NavButton>
      </motion.div>
    </div>
  );
}
