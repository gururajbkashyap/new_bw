export default function NavButton({ onClick, children, variant = "primary", disabled = false }) {
  const base = {
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    borderRadius: "999px",
    padding: "14px 36px",
    fontSize: "1rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.5px",
    transition: "transform 0.15s, box-shadow 0.15s, opacity 0.15s",
    opacity: disabled ? 0.4 : 1,
  };

  const styles =
    variant === "back"
      ? {
          ...base,
          background: "rgba(255,143,171,0.08)",
          border: "1.5px solid rgba(255,143,171,0.5)",
          color: "#ffd6e0",
        }
      : {
          ...base,
          background: "linear-gradient(135deg, #c0426a 0%, #ff8fab 100%)",
          color: "#fff0f5",
          boxShadow: "0 0 16px rgba(255,143,171,0.5), 0 0 40px rgba(192,66,106,0.3)",
        };

  return (
    <button
      style={styles}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "scale(1.06)";
          if (variant === "back") {
            e.currentTarget.style.background = "rgba(255,143,171,0.18)";
          } else {
            e.currentTarget.style.boxShadow =
              "0 0 24px rgba(255,143,171,0.8), 0 0 60px rgba(192,66,106,0.5)";
          }
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        if (variant === "back") {
          e.currentTarget.style.background = "rgba(255,143,171,0.08)";
        } else {
          e.currentTarget.style.boxShadow =
            "0 0 16px rgba(255,143,171,0.5), 0 0 40px rgba(192,66,106,0.3)";
        }
      }}
    >
      {children}
    </button>
  );
}
