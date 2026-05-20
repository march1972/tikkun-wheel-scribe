import { BODY, C_DEEP, C_GOLD, C_GOLD_BRIGHT } from "@/lib/landing-style";

export function PrimaryCTA({
  onClick,
  label,
  type = "button",
  disabled = false,
}: {
  onClick?: () => void;
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="group inline-flex items-center gap-3 uppercase transition-all duration-300 hover:scale-[1.04] hover:brightness-110 hover:gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c868] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1b2540] disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: `linear-gradient(135deg, ${C_GOLD_BRIGHT} 0%, ${C_GOLD} 100%)`,
        color: C_DEEP,
        fontFamily: BODY,
        fontWeight: 700,
        letterSpacing: "0.28em",
        fontSize: "clamp(11px, 1.2vw, 13px)",
        padding: "clamp(14px, 1.9vh, 20px) clamp(24px, 4vw, 44px)",
        borderRadius: "0px",
        boxShadow: "0 10px 40px -10px rgba(240,200,104,0.55)",
      }}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" style={{ fontWeight: 800 }}>
        →
      </span>
    </button>
  );
}
