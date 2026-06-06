import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function EndingPage({ onBack }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        padding: "clamp(24px, 5vw, 48px)",
        textAlign: "center",
        gap: "clamp(14px, 2.5vh, 22px)",
      }}
    >
      <audio
        ref={audioRef}
        src="/voice/message.mp3"
        onEnded={() => setPlaying(false)}
      />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(0.6rem, 1.4vw, 0.78rem)",
          letterSpacing: "5px",
          textTransform: "uppercase",
          color: "rgba(255,143,171,0.5)",
          margin: 0,
        }}
      >
        ✦ with love ✦
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.8, type: "spring", bounce: 0.35 }}
        className="glow-gold"
        style={{
          fontFamily: "'Cinzel Decorative', cursive",
          fontSize: "clamp(1.8rem, 6vw, 4rem)",
          lineHeight: 1.25,
          margin: 0,
        }}
      >
        Made just for you.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        style={{
          fontFamily: "'IM Fell English', serif",
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          color: "rgba(255,214,224,0.88)",
          fontStyle: "italic",
          lineHeight: 1.9,
          maxWidth: "480px",
          margin: 0,
        }}
      >
        Happy Birthday, Soundarya.
        <br />
        You deserve every good thing that's coming. 🌸
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(0.85rem, 2vw, 1rem)",
          letterSpacing: "2px",
          color: "rgba(255,143,171,0.55)",
          margin: 0,
        }}
      >
        — Gururaj 🌸
      </motion.p>

      {/* Voice note button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.6, type: "spring", bounce: 0.4 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
      >
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(0.58rem, 1.3vw, 0.72rem)",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "rgba(255,143,171,0.4)",
          margin: 0,
        }}>
          ✦ a message from me ✦
        </p>

        <button
          onClick={togglePlay}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: playing
              ? "linear-gradient(135deg, rgba(192,66,106,0.35) 0%, rgba(255,143,171,0.25) 100%)"
              : "rgba(255,143,171,0.08)",
            border: "1px solid rgba(255,143,171,0.4)",
            borderRadius: "999px",
            padding: "14px 28px",
            cursor: "pointer",
            transition: "background 0.3s, box-shadow 0.3s",
            boxShadow: playing
              ? "0 0 24px rgba(255,143,171,0.45)"
              : "0 0 10px rgba(255,143,171,0.15)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 24px rgba(255,143,171,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = playing ? "0 0 24px rgba(255,143,171,0.45)" : "0 0 10px rgba(255,143,171,0.15)"; }}
        >
          {/* Animated waveform when playing */}
          {playing ? (
            <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "20px" }}>
              {[1, 1.6, 0.8, 1.4, 1].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [1, h * 1.4, 0.6, h, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 + i * 0.1, ease: "easeInOut" }}
                  style={{
                    width: 3,
                    height: 16,
                    borderRadius: 999,
                    background: "#ff8fab",
                    transformOrigin: "center",
                  }}
                />
              ))}
            </div>
          ) : (
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>▶</span>
          )}

          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.78rem, 1.8vw, 0.9rem)",
            letterSpacing: "2px",
            color: "rgba(255,214,224,0.85)",
          }}>
            {playing ? "Playing..." : "Play Voice Note"}
          </span>
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.7 }}
        style={{
          fontFamily: "'IM Fell English', serif",
          fontSize: "clamp(0.82rem, 1.8vw, 0.95rem)",
          color: "rgba(255,143,171,0.4)",
          fontStyle: "italic",
          marginTop: "4px",
          letterSpacing: "0.5px",
          lineHeight: 1.7,
          pointerEvents: "none",
        }}
      >
        Thank you for watching — hope it made your day a little brighter. 🌸
      </motion.p>
    </div>
  );
}
