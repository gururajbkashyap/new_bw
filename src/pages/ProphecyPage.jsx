import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavButton from "../components/NavButton";

export default function ProphecyPage({ onNext, onBack }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden" }}>

      {/* ── Full-screen photo reveal ── */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            key="photo-bg"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            {/* The photo, rotated portrait → landscape, covers screen */}
            <img
              src="/photos/with%20mom.jpg"
              alt="Soundarya with her mom"
              className="mom-photo-img"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            {/* Dark gradient overlay — top and bottom */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10,6,20,0.55) 0%, transparent 30%, transparent 55%, rgba(10,6,20,0.85) 100%)",
              pointerEvents: "none",
            }} />

            {/* Message overlaid at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              style={{
                position: "absolute",
                bottom: "clamp(80px, 14vh, 120px)",
                left: 0,
                right: 0,
                textAlign: "center",
                padding: "0 24px",
              }}
            >
              <p style={{
                fontFamily: "'IM Fell English', serif",
                color: "rgba(255,214,224,0.95)",
                fontSize: "clamp(1rem, 2.8vw, 1.5rem)",
                fontStyle: "italic",
                lineHeight: 1.9,
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
              }}>
                She's so proud of you, Soundarya.
                <br />
                She always will be. 🌸
              </p>
            </motion.div>

            {/* Nav over the photo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{
                position: "absolute",
                bottom: "clamp(16px, 4vh, 32px)",
                left: 0,
                right: 0,
                display: "flex",
                gap: "16px",
                justifyContent: "center",
              }}
            >
              <NavButton onClick={onBack} variant="back">← Back</NavButton>
              <NavButton onClick={onNext}>Next →</NavButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pre-reveal: chapter header + surprise button ── */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="pre-reveal"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "clamp(40px, 7vh, 70px) clamp(16px, 4vw, 40px) clamp(20px, 5vh, 48px)",
              boxSizing: "border-box",
            }}
          >
            {/* Top text */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                  color: "rgba(212,175,55,0.5)",
                  margin: 0,
                }}
              >
                ✦ Chapter Two ✦
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glow-gold"
                style={{
                  fontFamily: "'Cinzel Decorative', cursive",
                  fontSize: "clamp(1.2rem, 3.5vw, 2.2rem)",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Always With You 🌸
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: "'IM Fell English', serif",
                  fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
                  color: "rgba(212,175,55,0.65)",
                  fontStyle: "italic",
                  textAlign: "center",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                Some people stay with us in ways words can't fully explain.
                <br />I have something for you.
              </motion.p>
            </div>

            {/* Surprise button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, type: "spring", bounce: 0.4 }}
              onClick={() => setRevealed(true)}
              style={{
                background: "rgba(255,143,171,0.12)",
                border: "1px solid rgba(255,143,171,0.5)",
                borderRadius: "999px",
                padding: "16px 48px",
                cursor: "pointer",
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(0.88rem, 2vw, 1.05rem)",
                letterSpacing: "3px",
                color: "#ffd6e0",
                transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,143,171,0.25)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(255,143,171,0.4)";
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,143,171,0.12)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ✦ Open Your Surprise ✦
            </motion.button>

            {/* Nav */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
            >
              <NavButton onClick={onBack} variant="back">← Back</NavButton>
              <NavButton onClick={onNext}>Next →</NavButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
