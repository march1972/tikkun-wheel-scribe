import { BODY, C_DEEP, C_INK, C_GOLD, C_GOLD_BRIGHT } from "@/lib/landing-style";

type Variant = "gold" | "dawn";

export function PrimaryCTA({
  onClick,
  label,
  type = "button",
  disabled = false,
  variant = "gold",
}: {
  onClick?: () => void;
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: Variant;
}) {
  const isDawn = variant === "dawn";
  const background = isDawn
    ? "#7a1f2b"
    : `linear-gradient(135deg, ${C_GOLD} 0%, #c9a14a 100%)`;
  const color = isDawn ? C_INK : C_DEEP;
  const boxShadow = isDawn
    ? "0 10px 30px -10px rgba(155,40,55,0.55), inset 0 1px 0 rgba(255,255,255,0.06)"
    : "0 8px 22px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)";
  const ringColor = isDawn ? "#b8333f" : "#f0c868";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="group inline-flex items-center justify-center gap-3 uppercase transition-all duration-300 ease-out hover:-translate-y-px hover:gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1b2540] disabled:opacity-50 disabled:cursor-not-allowed whitespace-pre-line text-center"
      style={{
        background,
        color,
        fontFamily: BODY,
        fontWeight: 700,
        letterSpacing: "0.28em",
        fontSize: "clamp(11px, 1.2vw, 13px)",
        padding: "clamp(14px, 1.9vh, 20px) clamp(24px, 4vw, 44px)",
        borderRadius: "0px",
        boxShadow,
        // @ts-expect-error CSS var for focus ring
        "--tw-ring-color": ringColor,
      }}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" style={{ fontWeight: 800 }}>
        {"\n"}
      </span>
    </button>
  );
}
