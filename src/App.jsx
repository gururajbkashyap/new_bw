import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarBackground from "./components/StarBackground";
import FloatingCandles from "./components/FloatingCandles";
import PageBorder from "./components/PageBorder";
import MusicPlayer from "./components/MusicPlayer";
import WelcomePage from "./pages/WelcomePage";
import PhotoPage from "./pages/PhotoPage";
import ProphecyPage from "./pages/ProphecyPage";
import NotePage from "./pages/NotePage";
import TreatPage from "./pages/TreatPage";

const PAGES = ["welcome", "photo", "prophecy", "note", "treat"];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function App() {
  const [pageIdx, setPageIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (delta) => {
    setDir(delta);
    setPageIdx((i) => Math.max(0, Math.min(PAGES.length - 1, i + delta)));
  };

  const page = PAGES[pageIdx];
  const touchStartX = useRef(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSwipeHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) go(delta > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "transparent", overflow: "hidden" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <StarBackground />
      <FloatingCandles />
      <PageBorder />
      <MusicPlayer />

      <AnimatePresence>
        {showSwipeHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            style={{
              position: "fixed",
              bottom: 18,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "999px",
              padding: "6px 16px",
              pointerEvents: "none",
            }}
          >
            <motion.span
              animate={{ x: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              style={{ fontSize: "1rem" }}
            >
              👈
            </motion.span>
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.7rem",
              letterSpacing: "2px",
              color: "rgba(212,175,55,0.7)",
            }}>
              SWIPE TO NAVIGATE
            </span>
            <motion.span
              animate={{ x: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              style={{ fontSize: "1rem" }}
            >
              👉
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={page}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          {page === "welcome" && <WelcomePage onNext={() => go(1)} />}
          {page === "photo"   && <PhotoPage   onNext={() => go(1)} onBack={() => go(-1)} />}
          {page === "prophecy" && <ProphecyPage onNext={() => go(1)} onBack={() => go(-1)} />}
          {page === "note"    && <NotePage    onNext={() => go(1)} onBack={() => go(-1)} />}
          {page === "treat"   && <TreatPage   onRestart={() => { setDir(-1); setPageIdx(0); }} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
