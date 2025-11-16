export default function SantanderLogo({ className = "w-6 h-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" rx="8" fill="#EC0000" />
      <g fill="white">
        {/* Base crescent/bowl shape */}
        <path
          d="M15 70 C25 65, 35 67, 50 68 C65 67, 75 65, 85 70 L85 75 C75 73, 65 75, 50 76 C35 75, 25 73, 15 75 Z"
        />
        {/* Central flame (tallest, curves right) */}
        <path
          d="M42 48 C44 32, 46 25, 50 22 C54 25, 56 32, 58 48 L58 68 C56 63, 54 68, 50 70 C46 68, 44 63, 42 68 Z"
        />
        {/* Left flame (shorter) */}
        <path
          d="M28 55 C30 48, 32 43, 35 40 C37 43, 38 48, 40 55 L40 68 C38 63, 37 68, 35 70 C32 68, 30 63, 28 68 Z"
        />
        {/* Right flame (shorter) */}
        <path
          d="M60 55 C62 48, 64 43, 67 40 C69 43, 70 48, 72 55 L72 68 C70 63, 69 68, 67 70 C64 68, 62 63, 60 68 Z"
        />
      </g>
    </svg>
  );
}

