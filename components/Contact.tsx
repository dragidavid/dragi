import classNames from "classnames";

import { GRADIENTS } from "lib/entities";

const Contact = () => {
  return (
    <div className="flex h-full flex-col">
      <h2
        className={classNames(
          "gradient-text header hidden md:block",
          GRADIENTS.contact.class
        )}
      >
        Contact
      </h2>

      <p className="hidden lg:block">
        Drop me an email or check out my resume.
      </p>

      <p className="lg:hidden">
        Drop me an{" "}
        <a
          href="mailto:dragovacz.dd@gmail.com"
          className={classNames(
            "gradient-text font-bold hover:cursor-ne-resize",
            GRADIENTS.contact.class,
            "after:bg-gradient-to-br",
            "relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[40px] after:rounded-full",
            "after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100",
            "after:transition-transform after:duration-200 after:ease-in-out"
          )}
        >
          email
        </a>{" "}
        or check out my{" "}
        <a
          href="https://read.cv/dragi"
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(
            "gradient-text font-bold hover:cursor-ne-resize",
            GRADIENTS.contact.class,
            "after:bg-gradient-to-br",
            "relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[59px] after:rounded-full",
            "after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100",
            "after:transition-transform after:duration-200 after:ease-in-out"
          )}
        >
          resume.
        </a>
      </p>

      <div className="hidden grow flex-col items-center justify-evenly md:flex-row lg:flex">
        <a
          href="mailto:dragovacz.dd@gmail.com"
          className="transition-transform duration-200 ease-in-out will-change-transform hover:rotate-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="url(#mail)"
            strokeWidth="2"
          >
            <defs>
              <linearGradient
                id="mail"
                gradientTransform="rotate(45)"
                x2="170%"
              >
                <stop offset="0%" stopColor={GRADIENTS.contact.colors[0]} />
                <stop offset="100%" stopColor={GRADIENTS.contact.colors[1]} />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </a>

        <a
          href="https://read.cv/dragi"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-200 ease-in-out will-change-transform hover:rotate-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="url(#resume)"
            strokeWidth="2"
          >
            <defs>
              <linearGradient
                id="resume"
                gradientTransform="rotate(45)"
                x2="170%"
              >
                <stop offset="0%" stopColor={GRADIENTS.contact.colors[0]} />
                <stop offset="100%" stopColor={GRADIENTS.contact.colors[1]} />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Contact;
