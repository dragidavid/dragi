import Logo from "components/Logo";

const Bio = () => {
  return (
    <div className="grid-tile flex items-center justify-center">
      <Logo className="z-0 scale-[2] blur-2xl" />

      <div className="text-3xl">Content ✨</div>
    </div>
  );
};

export default Bio;
