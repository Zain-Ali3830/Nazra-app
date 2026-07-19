/**
 * Islamic-themed SVG icon components.
 * Each icon accepts standard SVG props (className, strokeWidth, etc.)
 * so they can be dropped in as 1-to-1 replacements for lucide-react icons.
 */

interface IconProps extends React.SVGProps<SVGSVGElement> {
  strokeWidth?: number;
}

/** Mosque silhouette — replaces Home */
export function MosqueIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Central dome */}
      <path d="M7 10 Q7 5 12 5 Q17 5 17 10" />
      {/* Small crescent on top of dome */}
      <path d="M11.5 4.5 Q12.5 3 13.5 4 Q12 4.5 11.5 4.5Z" fill="currentColor" stroke="none" />
      {/* Side minarets */}
      <line x1="4" y1="10" x2="4" y2="19" />
      <line x1="20" y1="10" x2="20" y2="19" />
      {/* Minaret tops */}
      <path d="M3 10 Q4 8 5 10" />
      <path d="M19 10 Q20 8 21 10" />
      {/* Main walls */}
      <rect x="6" y="10" width="12" height="9" rx="0.5" />
      {/* Arched door */}
      <path d="M10 19 L10 15 Q12 13 14 15 L14 19" />
      {/* Ground line */}
      <line x1="2" y1="19" x2="22" y2="19" />
    </svg>
  );
}

/** Water droplet with ripple — replaces Droplets (Wudu) */
export function WuduDropIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Main drop */}
      <path d="M12 3 C12 3 6 9.5 6 14 A6 6 0 0 0 18 14 C18 9.5 12 3 12 3Z" />
      {/* Inner shine */}
      <path d="M9.5 12.5 Q10.5 10 12 9.5" strokeWidth={strokeWidth * 0.7} opacity="0.6" />
      {/* Ripple arcs below */}
      <path d="M8 20.5 Q12 18.5 16 20.5" strokeWidth={strokeWidth * 0.8} />
      <path d="M9.5 22.5 Q12 21 14.5 22.5" strokeWidth={strokeWidth * 0.6} />
    </svg>
  );
}

/** Crescent & star — replaces Sparkles (Salah / prayer) */
export function CrescentStarIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Crescent moon */}
      <path d="M14 4 A8 8 0 1 0 14 20 A6 6 0 1 1 14 4Z" />
      {/* Star */}
      <path d="M18.5 7 L19.3 9.2 L21.5 9.2 L19.8 10.5 L20.5 12.8 L18.5 11.4 L16.5 12.8 L17.2 10.5 L15.5 9.2 L17.7 9.2 Z"
        fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Open Quran / Mushaf — replaces BookOpen */
export function QuranIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Left page */}
      <path d="M3 5 Q3 4 4 4 Q7 4 10 6 L10 20 Q7 18 4 18 Q3 18 3 17Z" />
      {/* Right page */}
      <path d="M21 5 Q21 4 20 4 Q17 4 14 6 L14 20 Q17 18 20 18 Q21 18 21 17Z" />
      {/* Spine */}
      <line x1="12" y1="6" x2="12" y2="20" />
      {/* Lines on left page */}
      <line x1="5.5" y1="9" x2="9" y2="10" strokeWidth={strokeWidth * 0.7} />
      <line x1="5.5" y1="12" x2="9" y2="13" strokeWidth={strokeWidth * 0.7} />
      <line x1="5.5" y1="15" x2="9" y2="16" strokeWidth={strokeWidth * 0.7} />
      {/* Lines on right page */}
      <line x1="15" y1="10" x2="18.5" y2="9" strokeWidth={strokeWidth * 0.7} />
      <line x1="15" y1="13" x2="18.5" y2="12" strokeWidth={strokeWidth * 0.7} />
      <line x1="15" y1="16" x2="18.5" y2="15" strokeWidth={strokeWidth * 0.7} />
    </svg>
  );
}

/** Crescent moon — replaces Moon (Dua Qunoot / dark mode) */
export function CrescentMoonIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Crescent shape */}
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      {/* Small star sparkle near crescent */}
      <circle cx="18" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="20" cy="9" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Hands raised in Dua — replaces HeartHandshake (Sunnah Duas) */
export function DuaHandsIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Left hand */}
      <path d="M5 14 Q4 10 5 7 Q5.5 5.5 7 6 Q7 4 8.5 4.5 Q8.5 3 10 3.5 L10 14" />
      {/* Right hand */}
      <path d="M19 14 Q20 10 19 7 Q18.5 5.5 17 6 Q17 4 15.5 4.5 Q15.5 3 14 3.5 L14 14" />
      {/* Joined palms base */}
      <path d="M5 14 Q5 17 8 18 L12 19 L16 18 Q19 17 19 14" />
      {/* Small dots representing supplication */}
      <circle cx="12" cy="21.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="10" cy="22" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="14" cy="22" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Arabic scroll / parchment — replaces ScrollText (Nazra) */
export function ScrollIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Scroll body */}
      <rect x="4" y="5" width="16" height="15" rx="1" />
      {/* Top rolled edge */}
      <path d="M4 5 Q4 2 6 2 Q8 2 8 5" />
      <path d="M20 5 Q20 2 18 2 Q16 2 16 5" />
      {/* Arabic-style text lines (RTL feel) */}
      <line x1="16" y1="9" x2="8" y2="9" strokeWidth={strokeWidth * 0.75} />
      <line x1="15" y1="12" x2="8" y2="12" strokeWidth={strokeWidth * 0.75} />
      <line x1="16" y1="15" x2="8" y2="15" strokeWidth={strokeWidth * 0.75} />
      {/* Small ornamental dot */}
      <circle cx="17" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Sun with Islamic star rays — replaces Sun (light mode toggle) */
export function SunIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      {/* Cardinal rays */}
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      {/* Diagonal rays */}
      <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
      <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="16.95" y2="7.05" />
      <line x1="7.05" y1="16.95" x2="4.93" y2="19.07" />
    </svg>
  );
}

/** Stylised back arrow — replaces ArrowLeft */
export function BackArrowIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Main arrow shaft */}
      <line x1="19" y1="12" x2="5" y2="12" />
      {/* Arrow head */}
      <polyline points="11 6 5 12 11 18" />
      {/* Decorative Islamic geometric dot at the tail */}
      <circle cx="19.5" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Star/check hybrid — replaces Check (learned state) */
export function LearnedCheckIcon({ className, strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/** Chevron right — kept functional but with a slight Islamic flourish */
export function ChevronRightIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/** Chevron down */
export function ChevronDownIcon({ className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/** Islamic star / rub-el-hizb ornament used as a decorative element */
export function IslamicStarIcon({ className, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* 8-pointed star (rub el hizb) */}
      <path d="M12 2 L13.76 8.5 L20 6 L15.5 11 L22 12 L15.5 13 L20 18 L13.76 15.5 L12 22 L10.24 15.5 L4 18 L8.5 13 L2 12 L8.5 11 L4 6 L10.24 8.5 Z" />
    </svg>
  );
}
