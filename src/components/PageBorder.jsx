const C  = "rgba(255,143,171,0.55)";
const C2 = "rgba(255,143,171,0.25)";
const LINE = 1.5;
const SIZE = 56;

function Corner({ top, left, right, bottom, flipX, flipY }) {
  const sx = flipX ? "scaleX(-1)" : "scaleX(1)";
  const sy = flipY ? "scaleY(-1)" : "scaleY(1)";

  return (
    <div
      style={{
        position: "fixed",
        top, left, right, bottom,
        width: SIZE,
        height: SIZE,
        transform: `${sx} ${sy}`,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <svg viewBox="0 0 56 56" width={SIZE} height={SIZE} xmlns="http://www.w3.org/2000/svg">
        <line x1="4"  y1="4"  x2="48" y2="4"  stroke={C}  strokeWidth={LINE} />
        <line x1="4"  y1="4"  x2="4"  y2="48" stroke={C}  strokeWidth={LINE} />
        <line x1="10" y1="10" x2="36" y2="10" stroke={C2} strokeWidth={LINE} />
        <line x1="10" y1="10" x2="10" y2="36" stroke={C2} strokeWidth={LINE} />
        <polygon points="4,0 8,4 4,8 0,4" fill={C} />
        <circle cx="48" cy="4" r="2" fill={C} />
        <circle cx="4" cy="48" r="2" fill={C} />
        <path d="M16,10 Q22,4 28,10" fill="none" stroke={C2} strokeWidth={LINE} />
        <path d="M10,16 Q4,22 10,28" fill="none" stroke={C2} strokeWidth={LINE} />
      </svg>
    </div>
  );
}

export default function PageBorder() {
  return (
    <>
      <Corner top={12} left={12} />
      <Corner top={12} right={12} flipX />
      <Corner bottom={12} left={12} flipY />
      <Corner bottom={12} right={12} flipX flipY />

      <div style={{ position: "fixed", top: 12, left: 68, right: 68, height: 1, background: `linear-gradient(90deg, transparent, ${C}, transparent)`, pointerEvents: "none", zIndex: 10 }} />
      <div style={{ position: "fixed", bottom: 12, left: 68, right: 68, height: 1, background: `linear-gradient(90deg, transparent, ${C}, transparent)`, pointerEvents: "none", zIndex: 10 }} />
      <div style={{ position: "fixed", left: 12, top: 68, bottom: 68, width: 1, background: `linear-gradient(180deg, transparent, ${C}, transparent)`, pointerEvents: "none", zIndex: 10 }} />
      <div style={{ position: "fixed", right: 12, top: 68, bottom: 68, width: 1, background: `linear-gradient(180deg, transparent, ${C}, transparent)`, pointerEvents: "none", zIndex: 10 }} />
    </>
  );
}
