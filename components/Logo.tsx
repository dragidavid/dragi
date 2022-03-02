type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <svg
      viewBox="0 0 526 526"
      className={`absolute right-8 -top-8 m-1 h-28 w-28 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#a)">
        <path
          d="M526 263c0 145.251-117.749 263-263 263S0 408.251 0 263 117.749 0 263 0s263 117.749 263 263Z"
          fill="url(#b)"
        />
        <path
          d="M526 263c0 145.251-117.749 263-263 263S0 408.251 0 263 117.749 0 263 0s263 117.749 263 263Z"
          fill="url(#c)"
        />
      </g>
      <defs>
        <radialGradient
          id="b"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(250.49985 285.99962 -257.29675 225.35973 207 155)"
        >
          <stop stopColor="#FF00E5" />
          <stop offset=".997" stopColor="#FF015C" />
        </radialGradient>
        <radialGradient
          id="c"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(160.582 271.553 121.34) scale(515.843 1156.39)"
        >
          <stop stopColor="#8F00FF" />
          <stop offset=".997" stopColor="#FF017B" stopOpacity=".01" />
        </radialGradient>
        <filter
          id="a"
          x="0"
          y="0"
          width="526"
          height="530"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="32.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0" />
          <feBlend in2="shape" result="effect1_innerShadow_9_10" />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;
