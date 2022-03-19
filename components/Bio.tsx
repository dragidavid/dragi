import Logo from "components/Logo";

const Bio = () => {
  return (
    <div className="flex">
      <Logo className="z-0 scale-[2] blur-2xl" />

      <h1 className="gradient-bio tile-title">Hey 👋</h1>
    </div>
  );
};

export default Bio;
