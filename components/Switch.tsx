import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useHotkeys } from "react-hotkeys-hook";
import { DarkModeSwitch } from "react-toggle-dark-mode";

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

  useHotkeys("ctrl+t", handleThemeSwitch, [resolvedTheme]);

  return (
    <div className="flex h-full items-center justify-center">
      <DarkModeSwitch
        className="h-12 w-12"
        checked={resolvedTheme === "dark"}
        onChange={handleThemeSwitch}
        size={20}
      />
    </div>
  );
};

export default Switch;
