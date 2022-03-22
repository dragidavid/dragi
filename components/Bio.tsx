import Logo from "components/Logo";

const Bio = () => {
  return (
    <div className="flex flex-col">
      <Logo className="z-[1] scale-[2] blur-2xl" />

      <h2 className="gradient-bio header">David Dragovacz</h2>
    </div>
  );
};

export default Bio;
