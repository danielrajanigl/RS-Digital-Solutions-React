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
  // Inject shimmer styles once
  useEffect(() => {
    const id = "shimmer-button-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `
        @keyframes shimmer2 {
          0% { background-position: 200% 0%; }
          100% { background-position: -200% 0%; }
        }

        .shimmer-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 44px;
          padding: 0 24px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 100px;
          background: linear-gradient(110deg, #0c1220 0%, #0c1220 40%, #1e2d42 50%, #0c1220 60%, #0c1220 100%);
          background-size: 200% 100%;
          animation: shimmer2 3s infinite linear;
          color: rgba(255, 255, 255, 0.85);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          cursor: pointer;
          outline: none;
          transition: border-color 0.3s, color 0.3s, box-shadow 0.3s, background 0.3s;
          white-space: nowrap;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .shimmer-btn.shimmer-icon {
          gap: 0;
          height: 42px;
          width: 42px;
          padding: 0;
          border-radius: 50%;
        }

        .shimmer-btn:hover {
          border-color: rgba(255, 255, 255, 0.35);
          color: #ffffff;
          box-shadow: 0 0 24px rgba(255, 255, 255, 0.08);
        }

        /* Light theme overrides */
        html.light-theme .shimmer-btn {
          background: linear-gradient(110deg, #1a1a2e 0%, #1a1a2e 40%, #2d3a4f 50%, #1a1a2e 60%, #1a1a2e 100%);
          background-size: 200% 100%;
          animation: shimmer2 3s infinite linear;
          border: 1px solid rgba(26, 26, 46, 0.15);
          color: rgba(255, 255, 255, 0.9);
        }

        html.light-theme .shimmer-btn:hover {
          border-color: rgba(26, 26, 46, 0.3);
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(26, 26, 46, 0.15);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const IconComponent =
    icon === "sun" ? Sun : icon === "moon" ? Moon : Sparkles;

  const isIcon = viewMode === "icon";

  return (
    <button
      className={`shimmer-btn ${isIcon ? "shimmer-icon" : ""} ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      {isIcon ? (
        <IconComponent size={16} />
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
