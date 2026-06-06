import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REASONS = [
  "You cook for your whole family every single day — and somehow make it look effortless.",
  "You've been through one of the hardest years anyone can face, and you're still standing. Still soft. Still you.",
  "You carried everything this year — and still showed up for everyone around you with a smile.",
  "You make the people around you feel safe without even trying. That's rare.",
  "Somewhere between all the responsibilities, you still find time for a K-drama. Respect. 😄",
  "The strength you have? Most people don't find it in a lifetime. You found it at 22.",
  "The main character energy — completely natural, completely yours. 🌸",
];

export default function ReasonsButton() {
  const [open, setOpen]   = useState(false);
  const [index, setIndex] = useState(0);
  const [dir, setDir]     = useState(1);

  const next = () => {
    setDir(1);
    setIndex((i) => (i + 1) % REASONS.length);
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setOpen(true)}
        title="Why you're amazing"
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 100,
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: "1px solid rgba(255,143,171,0.4)",
          background: "rgba(255,143,171,0.1)",
          backdropFilter: "blur(8px)",
          cursor: "pointer",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s, box-shadow 0.2s",
          boxShadow: "0 0 12px rgba(255,143,171,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,143,171,0.22)";
          e.currentTarget.style.boxShadow  = "0 0 20px rgba(255,143,171,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,143,171,0.1)";
          e.currentTarget.style.boxShadow  = "0 0 12px rgba(255,143,171,0.3)";
        }}
      >
        ✨
      </motion.button>

      {/* Backdrop + card */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 200,
                background: "rgba(10,6,20,0.5)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Bottom sheet card */}
            <motion.div
              key="card"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0,      opacity: 1 }}
              exit={{   y: "100%", opacity: 0 }}
              transition={{ type: "spring", bounce: 0.28, duration: 0.55 }}
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 201,
                background: "linear-gradient(160deg, rgba(28,8,53,0.98) 0%, rgba(42,10,34,0.98) 100%)",
                border: "1px solid rgba(255,143,171,0.3)",
                borderRadius: "28px 28px 0 0",
                padding: "clamp(28px, 5vh, 48px) clamp(24px, 5vw, 48px) clamp(32px, 5vh, 48px)",
                boxShadow: "0 -8px 40px rgba(255,143,171,0.2)",
              }}
            >
              {/* Drag handle */}
              <div style={{
                width: 40,
                height: 4,
                borderRadius: 999,
                background: "rgba(255,143,171,0.3)",
                margin: "0 auto 24px",
              }} />

              {/* Label */}
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "rgba(255,143,171,0.55)",
                marginBottom: "16px",
                textAlign: "center",
              }}>
                ✦ why you're amazing ✦
              </p>

              {/* Reason text — slides on change */}
              <div style={{ overflow: "hidden", minHeight: "clamp(80px, 14vh, 130px)", display: "flex", alignItems: "center" }}>
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.p
                    key={index}
                    custom={dir}
                    initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{   opacity: 0, x: dir > 0 ? -60 : 60 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      fontFamily: "'IM Fell English', serif",
                      fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                      color: "rgba(255,249,230,0.92)",
                      fontStyle: "italic",
                      lineHeight: 1.75,
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    "{REASONS[index]}"
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Counter dots */}
              <div style={{ display: "flex", justifyContent: "center", gap: "6px", margin: "20px 0 24px" }}>
                {REASONS.map((_, i) => (
                  <div key={i} style={{
                    width: i === index ? 18 : 6,
                    height: 6,
                    borderRadius: 999,
                    background: i === index ? "#ff8fab" : "rgba(255,143,171,0.25)",
                    transition: "width 0.3s, background 0.3s",
                  }} />
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button
                  onClick={next}
                  style={{
                    background: "linear-gradient(135deg, #c0426a 0%, #ff8fab 100%)",
                    border: "none",
                    borderRadius: "999px",
                    padding: "13px 32px",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#fff0f5",
                    boxShadow: "0 0 16px rgba(255,143,171,0.4)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  Another one 🌸
                </button>

                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "rgba(255,143,171,0.08)",
                    border: "1px solid rgba(255,143,171,0.3)",
                    borderRadius: "999px",
                    padding: "13px 24px",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "rgba(255,214,224,0.7)",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,143,171,0.16)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,143,171,0.08)"; }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
