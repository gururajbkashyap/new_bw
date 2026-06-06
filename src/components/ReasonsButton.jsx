import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REASONS = [
  "You cook for your whole family every single day — and somehow make it look effortless.",
  "You've been through one of the hardest years anyone can face, and you're still standing. Still soft. Still you.",
  "You carried everything this year — and still showed up for everyone around you with a smile.",
  "You lost someone irreplaceable and still chose to keep going — for everyone else. That's not ordinary. That's extraordinary.",
  "Somewhere between all the responsibilities, you still find time for a K-drama. Respect. 🫡",
  "The strength you have? Most people don't find it in a lifetime. You found it at 22.",
  "The main character energy — completely natural, completely yours. 🌸",
];

const AUTO_MS = 6000;

export default function ReasonsButton() {
  const [open, setOpen]         = useState(false);
  const [hintVisible, setHint]  = useState(true);
  const [index, setIndex]       = useState(0);
  const [dir, setDir]           = useState(1);
  const [resetKey, setResetKey] = useState(0);

  /* Auto-advance — resets whenever resetKey changes, closes after last message */
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      setIndex((i) => {
        if (i === REASONS.length - 1) {
          setOpen(false);
          return 0;
        }
        setDir(1);
        return i + 1;
      });
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [open, resetKey]);

  const handleOpen = () => {
    setOpen(true);
    setHint(false);
    setIndex(0);
    setResetKey((k) => k + 1);
  };

  const goTo = (i) => {
    setDir(i > index ? 1 : -1);
    setIndex(i);
    setResetKey((k) => k + 1);
  };

  return (
    <>
      {/* ── Hint bubble ── */}
      <AnimatePresence>
        {hintVisible && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ delay: 2.8, duration: 0.6 }}
            style={{
              position: "fixed",
              top: 13,
              right: 72,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              gap: 6,
              pointerEvents: "none",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              style={{
                background: "rgba(28,8,53,0.92)",
                border: "1px solid rgba(255,143,171,0.45)",
                borderRadius: 14,
                padding: "8px 14px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 18px rgba(255,143,171,0.2)",
              }}
            >
              <p style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: "0.8rem",
                color: "rgba(255,214,224,0.92)",
                margin: 0,
                whiteSpace: "nowrap",
                fontStyle: "italic",
              }}>
                Wish to know why you're great?
              </p>
            </motion.div>

            {/* Arrow bouncing toward button */}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
              style={{ fontSize: "1rem", color: "#ff8fab", lineHeight: 1 }}
            >
              →
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating ✨ button ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        onClick={handleOpen}
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
          boxShadow: "0 0 12px rgba(255,143,171,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background  = "rgba(255,143,171,0.22)";
          e.currentTarget.style.boxShadow   = "0 0 22px rgba(255,143,171,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background  = "rgba(255,143,171,0.1)";
          e.currentTarget.style.boxShadow   = "0 0 12px rgba(255,143,171,0.3)";
        }}
      >
        ✨
      </motion.button>

      {/* ── Backdrop + modal ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 200,
                background: "rgba(10,6,20,0.72)",
                backdropFilter: "blur(7px)",
              }}
            />

            {/* Centering shell */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 201,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.82, y: 24 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{   opacity: 0, scale: 0.82, y: 24  }}
                transition={{ type: "spring", bounce: 0.28, duration: 0.55 }}
                style={{ pointerEvents: "all" }}
              >
                {/* Gradient border wrapper */}
                <div style={{
                  background: "linear-gradient(135deg, #c0426a 0%, #ff8fab 40%, #c9b8d8 70%, #ff8fab 100%)",
                  padding: 2,
                  borderRadius: 28,
                  boxShadow: "0 0 50px rgba(255,143,171,0.45), 0 0 100px rgba(192,66,106,0.2)",
                }}>
                  {/* Inner card */}
                  <div style={{
                    background: "linear-gradient(160deg, #1c0835 0%, #2a0a22 100%)",
                    borderRadius: 26,
                    padding: "clamp(28px,5vh,44px) clamp(24px,5vw,44px) clamp(24px,4vh,36px)",
                    width: "min(460px, 88vw)",
                    boxSizing: "border-box",
                  }}>

                    {/* Label */}
                    <p style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "clamp(0.6rem, 1.4vw, 0.75rem)",
                      letterSpacing: "4px",
                      textTransform: "uppercase",
                      color: "rgba(255,143,171,0.55)",
                      textAlign: "center",
                      margin: "0 0 20px",
                    }}>
                      ✦ why you're great ✦
                    </p>

                    {/* Reason text */}
                    <div style={{
                      minHeight: "clamp(110px, 18vh, 160px)",
                      display: "flex",
                      alignItems: "center",
                      overflow: "hidden",
                    }}>
                      <AnimatePresence mode="wait" custom={dir}>
                        <motion.p
                          key={index}
                          custom={dir}
                          initial={{ opacity: 0, x: dir > 0 ? 80 : -80 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{   opacity: 0, x: dir > 0 ? -80 : 80 }}
                          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                          style={{
                            fontFamily: "'IM Fell English', serif",
                            fontSize: "clamp(0.98rem, 2.4vw, 1.2rem)",
                            color: "rgba(255,249,230,0.93)",
                            fontStyle: "italic",
                            lineHeight: 1.85,
                            textAlign: "center",
                            width: "100%",
                            margin: 0,
                          }}
                        >
                          "{REASONS[index]}"
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    {/* Progress bar */}
                    <div style={{
                      margin: "20px 0 16px",
                      height: 3,
                      background: "rgba(255,143,171,0.15)",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}>
                      <motion.div
                        key={`${index}-${resetKey}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                        style={{
                          height: "100%",
                          background: "linear-gradient(90deg, #c0426a, #ff8fab)",
                          borderRadius: 999,
                        }}
                      />
                    </div>

                    {/* Dot indicators — clickable */}
                    <div style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 6,
                      marginBottom: 24,
                    }}>
                      {REASONS.map((_, i) => (
                        <div
                          key={i}
                          onClick={() => goTo(i)}
                          style={{
                            width: i === index ? 20 : 6,
                            height: 6,
                            borderRadius: 999,
                            background: i === index ? "#ff8fab" : "rgba(255,143,171,0.25)",
                            transition: "width 0.3s, background 0.3s",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>

                    {/* Close */}
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={() => setOpen(false)}
                        style={{
                          background: "rgba(255,143,171,0.08)",
                          border: "1px solid rgba(255,143,171,0.3)",
                          borderRadius: 999,
                          padding: "10px 30px",
                          cursor: "pointer",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                          color: "rgba(255,214,224,0.7)",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,143,171,0.16)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,143,171,0.08)"; }}
                      >
                        Close
                      </button>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
