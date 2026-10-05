import { coverPalette, initials } from "../data/library";

export function Cover({ seed, size = "md" }) {
  const [from, to] = coverPalette(seed);
  return (
    <span
      className={`cover cover-${size}`}
      style={{ background: `linear-gradient(155deg, ${from} 8%, ${to} 145%)` }}
      aria-hidden="true"
    >
      {initials(seed)}
    </span>
  );
}
