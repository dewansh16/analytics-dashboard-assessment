import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const Icons = {
  menu: (props: IconProps) => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g id="menu">
        <path
          id="Icon"
          d="M5 20H35M5 10H35M5 30H35"
          stroke={props.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  ),
  info: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g id="info">
        <path
          id="Icon"
          d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke={props.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  ),
  home: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  logo: (props: IconProps) => (
    <span className="text-xl sm:text-3xl font-semibold text-white">EVDash</span>
  ),
  close: (props: IconProps) => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g id="Close" clipPath="url(#clip0_528_892)">
        <path
          id="Vector"
          d="M30.4992 9.51686C29.8492 8.86686 28.7992 8.86686 28.1492 9.51686L19.9992 17.6502L11.8492 9.5002C11.1992 8.8502 10.1492 8.8502 9.49922 9.5002C8.84922 10.1502 8.84922 11.2002 9.49922 11.8502L17.6492 20.0002L9.49922 28.1502C8.84922 28.8002 8.84922 29.8502 9.49922 30.5002C10.1492 31.1502 11.1992 31.1502 11.8492 30.5002L19.9992 22.3502L28.1492 30.5002C28.7992 31.1502 29.8492 31.1502 30.4992 30.5002C31.1492 29.8502 31.1492 28.8002 30.4992 28.1502L22.3492 20.0002L30.4992 11.8502C31.1325 11.2169 31.1325 10.1502 30.4992 9.51686Z"
          fill={props.fill || "white"}
        />
      </g>
      <defs>
        <clipPath id="clip0_528_892">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
};

export default Icons;

export type Icon = keyof typeof Icons;
