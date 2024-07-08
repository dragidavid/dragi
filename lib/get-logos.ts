import { everyLogo, type Logo } from "components/primitives/logo";

export async function getLogos(names?: Logo[]) {
  const { logos } = await import("components/primitives/logo");

  const logosToUse = names || everyLogo;

  return logosToUse.reduce(
    (acc, name) => {
      if (logos[name]) {
        acc[name] = logos[name];
      }
      return acc;
    },
    {} as typeof logos,
  );
}
