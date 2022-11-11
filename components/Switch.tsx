import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Switch = () => {
  const [, setMounted] = useState<boolean>(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleThemeSwitch = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else if (resolvedTheme === "light") {
      setTheme("dark");
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <button onClick={handleThemeSwitch}>change theme</button>
    </div>
  );
};

export default Switch;
