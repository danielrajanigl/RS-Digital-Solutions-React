import { Sparkles, Sun, Moon } from "lucide-react";
import type React from "react";
import { useEffect } from "react";

interface ShimmerButtonProps {
  label?: string;
  onClick?: () => void;
  viewMode?: "text" | "icon";
  icon?: "sparkles" | "sun" | "moon";
  className?: string;
}

export default function ShimmerButton({
  label = "Button",
  onClick,
  viewMode = "text",
  icon = "sparkles",
  className = "",
}: ShimmerButtonProps) {
  // Inject shimmer keyframes once
  useEffect(() => {
    const id = "shimmer-button-keyframes";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `
        @keyframes shimmer2 {
          0% { background-position: 200% 0%; }
          100% { background-position: -200% 0%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const IconComponent =
    icon === "sun" ? Sun : icon === "moon" ? Moon : Sparkles;

  const isIcon = viewMode === "icon";

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: isIcon ? 0 : "8px",
    height: isIcon ? "42px" : "44px",
    width: isIcon ? "42px" : "auto",
    padding: isIcon ? 0 : "0 24px",
    border: "1px solid rgba(100, 116, 139, 0.3)",
    borderRadius: isIcon ? "50%" : "100px",
    background:
      "linear-gradient(110deg, #000103 0%, #000103 40%, #1e2631 50%, #000103 60%, #000103 100%)",
    backgroundSize: "200% 100%",
    animation: "shimmer2 3s infinite linear",
    color: "rgba(203, 213, 225, 0.9)",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.01em",
    cursor: "pointer",
    outline: "none",
    transition: "border-color 0.3s, color 0.3s, box-shadow 0.3s",
    whiteSpace: "nowrap",
  };

  return (
    <button
      style={baseStyle}
      className={`shimmer-btn ${className}`}
      onClick={onClick}
      aria-label={label}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(100, 116, 139, 0.6)";
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.boxShadow = "0 0 20px rgba(30, 38, 49, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(100, 116, 139, 0.3)";
        e.currentTarget.style.color = "rgba(203, 213, 225, 0.9)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {isIcon ? (
        <IconComponent size={16} />
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
