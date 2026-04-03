import { Sparkles, Sun, Moon } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { ui } from "../../content";

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
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const d = ui.shimmerButton.dark;
    const l = ui.shimmerButton.light;
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
        border: 1px solid ${d.borderColor};
        border-radius: 100px;
        background: linear-gradient(110deg, ${d.bgBase} 0%, ${d.bgBase} 40%, ${d.bgHighlight} 50%, ${d.bgBase} 60%, ${d.bgBase} 100%);
        background-size: 200% 100%;
        animation: shimmer2 3s infinite linear;
        color: ${d.textColor};
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
        border-color: ${d.borderHover};
        color: ${d.textHover};
        box-shadow: 0 0 24px ${d.shadowHover};
      }

      /* Light theme overrides */
      html.light-theme .shimmer-btn {
        background: linear-gradient(110deg, ${l.bgBase} 0%, ${l.bgBase} 40%, ${l.bgHighlight} 50%, ${l.bgBase} 60%, ${l.bgBase} 100%);
        background-size: 200% 100%;
        animation: shimmer2 3s infinite linear;
        border: 1px solid ${l.borderColor};
        color: ${l.textColor};
      }

      html.light-theme .shimmer-btn:hover {
        border-color: ${l.borderHover};
        color: ${l.textHover};
        box-shadow: 0 4px 20px ${l.shadowHover};
      }
    `;
    document.head.appendChild(style);
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
