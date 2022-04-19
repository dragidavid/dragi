import GitHubIcon from "components/Footer/GitHubIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex min-h-[8rem] items-center justify-center">
      <p className="text-sm">{currentYear} David Dragovacz</p>
      <span className="mx-2">&bull;</span>
      <a
        href="https://www.github.com/dragidavid/dragi"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors duration-200 ease-in-out hover:cursor-ne-resize hover:text-black hover:dark:text-white"
      >
        <GitHubIcon />
      </a>
    </footer>
  );
};

export default Footer;
