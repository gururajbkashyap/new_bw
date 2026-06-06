import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarBackground from "./components/StarBackground";
import FloatingCandles from "./components/FloatingCandles";
import PageBorder from "./components/PageBorder";
import ReasonsButton from "./components/ReasonsButton";
import WelcomePage from "./pages/WelcomePage";
import PhotoPage from "./pages/PhotoPage";
import ProphecyPage from "./pages/ProphecyPage";
import NotePage from "./pages/NotePage";
import TreatPage from "./pages/TreatPage";
import EndingPage from "./pages/EndingPage";

const PAGES = ["welcome", "photo", "prophecy", "note", "treat", "ending"];

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
      <ReasonsButton />

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
          {page === "treat"   && <TreatPage   onNext={() => go(1)} onRestart={() => { setDir(-1); setPageIdx(0); }} />}
          {page === "ending"  && <EndingPage  onBack={() => go(-1)} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
