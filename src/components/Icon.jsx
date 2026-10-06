/**
 * Single inline-SVG icon set. Keeps the bundle free of an icon dependency
 * and lets every glyph inherit `currentColor`.
 */
const PATHS = {
  spark: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4 6.5 5 7.5 7 5" />
      <path d="M4 12.5 5 13.5 7 11" />
      <circle cx="5.5" cy="18" r="1.3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.2a3.4 3.4 0 0 1 0 6.6" />
      <path d="M18.2 14.4A6.5 6.5 0 0 1 21.5 20" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H11a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H5.5A1.5 1.5 0 0 0 4 18.5Z" />
      <path d="M20 4.5A1.5 1.5 0 0 0 18.5 3H14a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h4.5a1.5 1.5 0 0 1 1.5 1.5Z" />
    </>
  ),
  puzzle: (
    <>
      <path d="M10 3.5a2 2 0 0 1 4 0V5h3.2A1.3 1.3 0 0 1 18.5 6.3V9h1.2a2 2 0 0 1 0 4h-1.2v4.4a1.3 1.3 0 0 1-1.3 1.3H13v-1.3a2 2 0 0 0-4 0V19H5.8a1.3 1.3 0 0 1-1.3-1.3V13H3.2a2 2 0 0 1 0-4h1.3V6.3A1.3 1.3 0 0 1 5.8 5H10Z" />
      <path d="M10 5h4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  flame: <path d="M12 2.5s5.5 4.2 5.5 9.2A5.5 5.5 0 0 1 12 21a5.5 5.5 0 0 1-5.5-9.3C6.5 6.7 12 2.5 12 2.5Z" />,
  bolt: <path d="M13.5 2 5 13.5h5.2L9.5 22 19 10.2h-5.6L13.5 2Z" />,
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
      <path d="M7 5.5H4.6A2.6 2.6 0 0 0 7 10.4M17 5.5h2.4A2.6 2.6 0 0 1 17 10.4" />
      <path d="M12 14v3.5M8.5 21h7l-.7-3.5H9.2Z" />
    </>
  ),
  star: <path d="m12 3.2 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.2 6.6 20.1l1-6.1-4.4-4.3 6.1-.9Z" />,
  shield: <path d="M12 2.8 4.5 5.6v6.1c0 4.5 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5 7.5-9.5V5.6Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.6" />
      <path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.6L12 12.2 3.5 7.6Z" />
      <path d="m3.5 12.4 8.5 4.6 8.5-4.6" />
      <path d="m3.5 16.9 8.5 4.6 8.5-4.6" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M3.2 10.2v3.6M6 8.4v7.2M18 8.4v7.2M20.8 10.2v3.6M6 12h12" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20.2 4.9 16 16.4 4.5a2.2 2.2 0 0 1 3.1 3.1L8 19.1Z" />
      <path d="m14.6 6.3 3.1 3.1" />
    </>
  ),
  cap: (
    <>
      <path d="M2.8 8.8 12 4.4l9.2 4.4L12 13.2Z" />
      <path d="M6.6 10.6v5.1c0 1.9 2.4 3 5.4 3s5.4-1.1 5.4-3v-5.1" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8.4 16.6v-4.2M12.4 16.6V8.4M16.4 16.6v-6" />
    </>
  ),
  trash: (
    <>
      <path d="M4.5 6.8h15" />
      <path d="M9.2 6.8V4.9a1.4 1.4 0 0 1 1.4-1.4h2.8a1.4 1.4 0 0 1 1.4 1.4v1.9" />
      <path d="M6.6 6.8 7.5 19a1.5 1.5 0 0 0 1.5 1.4h6a1.5 1.5 0 0 0 1.5-1.4l.9-12.2" />
      <path d="M10.4 10.4v6M13.6 10.4v6" />
    </>
  ),
  mail: (
    <>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.6" />
      <path d="m3.6 7 8.4 6 8.4-6" />
    </>
  ),
  logout: (
    <>
      <path d="M14.5 4.5h3.2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-3.2" />
      <path d="M10 8.5 6.2 12 10 15.5M6.4 12h8.4" />
    </>
  ),
  grid: (
    <>
      <rect x="3.6" y="3.6" width="7" height="7" rx="2" />
      <rect x="13.4" y="3.6" width="7" height="7" rx="2" />
      <rect x="3.6" y="13.4" width="7" height="7" rx="2" />
      <rect x="13.4" y="13.4" width="7" height="7" rx="2" />
    </>
  ),
  quest: (
    <>
      <path d="M5 3.5h14v17l-2.4-1.7-2.4 1.7-2.4-1.7-2.4 1.7L7.2 18.8 5 20.5Z" />
      <path d="M9 9.2l2 2 4-4.2" />
    </>
  ),
};

export default function Icon({ name, size = 22, strokeWidth = 1.7, className, ...rest }) {
  const glyph = PATHS[name];
  if (!glyph) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  );
}
