import GitHubIcon from "components/Footer/GitHubIcon";

import { classNames } from "lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex min-h-[7rem] items-center justify-center">
      <p className="text-sm">{currentYear} David Dragovacz</p>
      <span className="mx-2">&bull;</span>
      <a
        href="https://www.github.com/dragidavid/dragi"
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(
          "transition-colors duration-200 ease-in-out",
          "hover:cursor-ne-resize hover:text-black hover:dark:text-white"
        )}
        aria-label="github"
      >
        <GitHubIcon />
      </a>
    </footer>
  );
};

export default Footer;
