import classNames from "classnames";

import { GRADIENTS } from "lib/entities";

type StatProps = {
  display: string;
  value: number;
};

const Stat = ({ display, value }: StatProps) => {
  return (
    <div className="basis-1/2 lg:basis-auto">
      <p className="mb-3 text-xs md:text-sm">{display}</p>
      <h1
        className={classNames("gradient-text header", GRADIENTS.activity.class)}
      >
        {value}
      </h1>
    </div>
  );
};

export default Stat;
