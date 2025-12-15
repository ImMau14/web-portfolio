import React from "react"

export type LogoProps = React.SVGProps<SVGSVGElement> & {
  className?: string
  theme?: string
}

const Logo: React.FC<LogoProps> = ({ className, theme = "light", ...props }) => (
  <svg
    viewBox="538 302 183 137"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    overflow="hidden"
    className={className}
    {...props}
  >
    <defs>
      <clipPath id="clip0">
        <path d="M538 302 721 302 721 439 538 439Z" fillRule="evenodd" clipRule="evenodd" />
      </clipPath>
      <linearGradient
        x1="600.182"
        y1="339.654"
        x2="659.141"
        y2="280.695"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
        id={`fill1-${theme}`}
      >
        {theme === "dark" ? (
          <>
            <stop offset="0" stopColor="#A9D18E" />
            <stop offset="1" stopColor="#70AD47" />
          </>
        ) : (
          <>
            <stop offset="0" stopColor="#527e34" />
            <stop offset="1" stopColor="#345021" />
          </>
        )}
      </linearGradient>
    </defs>

    <g clipPath="url(#clip0)">
      <path
        d="M669.351 302.44 688.62 310.175 629.701 357.74 629.701 357.804 629.661 357.772 629.621 357.804 629.621 357.74 570.703 310.175 589.972 302.44 629.661 336.682Z"
        fill={`url(#fill1-${theme})`}
        fillRule="evenodd"
      />
      <path
        d="M3.98974 111 19.2259 104.212 41.806 55.7084 42 55.7084 41.903 55.5 42 55.2916 41.806 55.2916 19.2259 6.78794 3.98974 0 0 15.7603 17.282 55.5 0 95.2397Z"
        className="fill-current text-gray-800 dark:text-white"
        fill="currentColor"
        transform="matrix(1 0 0 -1 679 438)"
      />
      <path
        d="M576.105 327 561.232 333.788 539.189 382.292 539 382.292 539.095 382.5 539 382.708 539.189 382.708 561.232 431.212 576.105 438 580 422.24 563.129 382.5 580 342.76Z"
        className="fill-current text-gray-800 dark:text-white"
        fill="currentColor"
      />
    </g>
  </svg>
)

export default Logo
