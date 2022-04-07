import { createContext, FC, ReactNode, useContext, useState } from "react";

import Bio from "components/Bio";
import Spotify from "components/Spotify";
import Projects from "components/Projects";
import Switch from "components/Switch";
import Activity from "components/Activity";
import Map from "components/Map";
import Contact from "components/Contact";

import { GRADIENTS } from "lib/entities";

import type { GridTile, Gradients } from "lib/types";

type LayoutContextProps = {
  tiles: GridTile[];
  isDraggable: boolean;
  toggleLayoutLock: () => void;
  setInlineGradient: (id: keyof typeof GRADIENTS, gradient: string) => void;
  getInlineGradient: (id: keyof typeof GRADIENTS) => string;
};

const TILES: GridTile[] = [
  {
    id: "bio",
    component: <Bio />,
  },
  {
    id: "spotify",
    component: <Spotify />,
  },
  {
    id: "projects",
    component: <Projects />,
  },
  {
    id: "switch",
    component: <Switch />,
  },
  {
    id: "map",
    component: <Map />,
  },
  {
    id: "activity",
    component: <Activity />,
  },
  {
    id: "contact",
    component: <Contact />,
  },
];

const LayoutContext = createContext<LayoutContextProps>(
  {} as LayoutContextProps
);

export const useLayoutContext = () => useContext(LayoutContext);

const LayoutProvider: FC<ReactNode> = ({ children }) => {
  const [isDraggable, setIsDraggable] = useState<boolean>(true);
  const [gradients, setGradients] = useState<Gradients>(GRADIENTS);

  const toggleLayoutLock = (): void => {
    setIsDraggable(!isDraggable);
  };

  const setInlineGradient = <K extends keyof typeof GRADIENTS>(
    id: K,
    gradient: string
  ): void =>
    setGradients({
      ...gradients,
      [id]: { inline: gradient },
    });

  const getInlineGradient = <K extends keyof typeof GRADIENTS>(id: K): string =>
    gradients[id].inline;

  return (
    <LayoutContext.Provider
      value={{
        tiles: TILES,
        isDraggable,
        toggleLayoutLock,
        setInlineGradient,
        getInlineGradient,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
