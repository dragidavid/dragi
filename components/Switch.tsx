import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DynamicDarkModeSwitch = dynamic(
  () => {
    const promise = import("react-toggle-dark-mode").then(
      (module) => module.DarkModeSwitch
    );
    return promise;
  },
  {
    ssr: false,
    loading: () => (
      <DarkModeSwitch checked={false} onChange={() => undefined} />
    ),
  }
);

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
      <DynamicDarkModeSwitch
        className="h-14 w-14"
        checked={resolvedTheme === "dark"}
        onChange={handleThemeSwitch}
        size={20}
      />
    </div>
  );
};

export default Switch;
