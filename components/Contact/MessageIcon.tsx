import { GRADIENTS } from "lib/gradients";

// icon svg from https://github.com/jrgarciadev/react-iconly
const MessageIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-[40px]"
      viewBox="0 0 24 24"
      fill="url(#message)"
    >
      <defs>
        <linearGradient id="message" gradientTransform="rotate(45)" x2="170%">
          <stop offset="0%" stopColor={GRADIENTS.contact.colors[0]} />
          <stop offset="100%" stopColor={GRADIENTS.contact.colors[1]} />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9394 3C18.2804 3 19.5704 3.53 20.5194 4.481C21.4694 5.43 22.0004 6.71 22.0004 8.05V15.95C22.0004 18.74 19.7304 21 16.9394 21H7.0604C4.2694 21 2.0004 18.74 2.0004 15.95V8.05C2.0004 5.26 4.2594 3 7.0604 3H16.9394ZM18.5304 9.54L18.6104 9.46C18.8494 9.17 18.8494 8.75 18.5994 8.46C18.4604 8.311 18.2694 8.22 18.0704 8.2C17.8604 8.189 17.6604 8.26 17.5094 8.4L13.0004 12C12.4204 12.481 11.5894 12.481 11.0004 12L6.5004 8.4C6.1894 8.17 5.7594 8.2 5.5004 8.47C5.2304 8.74 5.2004 9.17 5.4294 9.47L5.5604 9.6L10.1104 13.15C10.6704 13.59 11.3494 13.83 12.0604 13.83C12.7694 13.83 13.4604 13.59 14.0194 13.15L18.5304 9.54Z"
      />
    </svg>
  );
};

export default MessageIcon;
