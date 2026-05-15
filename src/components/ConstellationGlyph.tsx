export function ConstellationGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 60"
      className="pointer-events-none absolute bottom-6 right-6 h-12 w-16"
      style={{ opacity: 0.5 }}
    >
      <line x1="10" y1="46" x2="32" y2="20" stroke="var(--gold)" strokeWidth="0.6" />
      <line x1="32" y1="20" x2="55" y2="34" stroke="var(--gold)" strokeWidth="0.6" />
      <line x1="55" y1="34" x2="70" y2="12" stroke="var(--gold)" strokeWidth="0.6" />
      <circle cx="10" cy="46" r="1.6" fill="var(--gold-bright)" />
      <circle cx="32" cy="20" r="2" fill="var(--gold-bright)" />
      <circle cx="55" cy="34" r="1.6" fill="var(--gold-bright)" />
      <circle cx="70" cy="12" r="1.4" fill="var(--gold-bright)" />
    </svg>
  );
}
