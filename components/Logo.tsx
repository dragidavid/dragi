type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <div
      className={`${className} absolute right-8 -top-8 h-28 w-28 rounded-full bg-purple-700`}
    />
  );
};

export default Logo;
