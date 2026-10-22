export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="14" fill="#1b1533" />
      <ellipse
        cx="24"
        cy="24"
        rx="17"
        ry="9"
        transform="rotate(-35 24 24)"
        stroke="#a78bfa"
        strokeWidth="1.2"
      />
      <path
        d="M24 9L27.7 20.3L39 24L27.7 27.7L24 39L20.3 27.7L9 24L20.3 20.3L24 9Z"
        fill="#e5dcff"
      />
      <circle cx="37" cy="14" r="2.5" fill="#bba2ff" />
    </svg>
  );
}
