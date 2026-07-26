/**
 * Bloomly-loggan — en minimalistisk, blommande blomma.
 * Fem mjuka kronblad i varumärkesgrönt runt ett varmt centrum.
 * Använder var(--brand) så den följer ljust/mörkt läge.
 */
const PETAL = 'M20 20 C 14 16 14.5 6.8 20 4.4 C 25.5 6.8 26 16 20 20 Z';

export default function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" role="img" aria-hidden="true">
      <g fill="var(--brand)">
        <path d={PETAL} transform="rotate(0 20 20)" opacity="0.92" />
        <path d={PETAL} transform="rotate(72 20 20)" opacity="0.92" />
        <path d={PETAL} transform="rotate(144 20 20)" opacity="0.92" />
        <path d={PETAL} transform="rotate(216 20 20)" opacity="0.92" />
        <path d={PETAL} transform="rotate(288 20 20)" opacity="0.92" />
      </g>
      <circle cx="20" cy="20" r="3.6" fill="#EBC27D" />
      <circle cx="20" cy="20" r="1.5" fill="var(--brand)" opacity="0.55" />
    </svg>
  );
}
