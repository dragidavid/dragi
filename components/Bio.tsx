import Logo from "components/Logo";

const Bio = () => {
  return (
    <div className="grid-tile flex">
      <Logo className="z-0 scale-[2] blur-2xl" />

      <h1 className="gradient-bio bg-clip-text text-3xl font-bold text-transparent">
        This is Bio
      </h1>
    </div>
  );
};

export default Bio;
