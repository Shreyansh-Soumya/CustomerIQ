export default function BrandMark({ className = "size-8 text-ink" }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="7" cy="7" r="1.7" fill="currentColor" />
      <circle cx="17" cy="6" r="1.2" fill="currentColor" />
      <circle cx="6" cy="17" r="1.2" fill="currentColor" />
      <circle cx="18" cy="17" r="2" fill="currentColor" />
      <circle className="fill-accent-2" cx="12" cy="12" r="1.5" />
    </svg>
  );
}
