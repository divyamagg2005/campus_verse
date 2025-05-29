import type { SVGProps } from "react";

export const Icons = {
  Logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15.5 9.5C15.5 8.11929 14.3807 7 13 7H10C8.34315 7 7 8.34315 7 10V14C7 15.6569 8.34315 17 10 17H13C14.3807 17 15.5 15.8807 15.5 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export type IconKeys = keyof typeof Icons;
