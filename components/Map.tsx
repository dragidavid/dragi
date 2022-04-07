import classNames from "classnames";

import { GRADIENTS } from "lib/entities";

const Map = () => {
  return (
    <div className="flex">
      <h1 className={classNames("header", GRADIENTS.map.class)}>Map</h1>
    </div>
  );
};

export default Map;
