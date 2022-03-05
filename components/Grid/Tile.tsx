import Logo from "components/Logo";

import { GridTile } from "lib/types";

const Tile = ({ id, component }: GridTile) => {
  return (
    <>
      <div className={`glow gradient-${id}`} />

      <div>
        {id === "bio" && <Logo className="z-10" />}

        {component}
      </div>
    </>
  );
};

export default Tile;
