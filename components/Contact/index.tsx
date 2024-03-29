import MessageIcon from "components/Contact/MessageIcon";
import DocumentIcon from "components/Contact/DocumentIcon";

import { classNames } from "lib/utils";

import * as gtag from "lib/analytics";

import { GRADIENTS } from "lib/gradients";

const Contact = () => {
  return (
    <div className="flex h-full flex-col">
      <h2
        className={classNames(
          "gradient-text header mb-4 hidden md:block",
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
          onClick={() =>
            gtag.event({ action: "click", category: "contact", label: "email" })
          }
          className={classNames(
            "gradient-text font-bold hover:cursor-ne-resize",
            GRADIENTS.contact.class,
            "after:bg-gradient-to-br",
            "relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[42px] after:rounded-full",
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
          onClick={() =>
            gtag.event({
              action: "click",
              category: "contact",
              label: "resume",
            })
          }
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

      <div className="hidden grow flex-col items-center justify-evenly lg:flex lg:flex-row">
        <a
          href="mailto:dragovacz.dd@gmail.com"
          className="cta-icon"
          aria-label="email"
          onClick={() =>
            gtag.event({ action: "click", category: "contact", label: "email" })
          }
        >
          <MessageIcon />
        </a>

        <a
          href="https://read.cv/dragi"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-icon"
          aria-label="resume"
          onClick={() =>
            gtag.event({
              action: "click",
              category: "contact",
              label: "resume",
            })
          }
        >
          <DocumentIcon />
        </a>
      </div>
    </div>
  );
};

export default Contact;
