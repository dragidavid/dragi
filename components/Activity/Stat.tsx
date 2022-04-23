import classNames from "classnames";

import { GRADIENTS } from "lib/gradients";

import type { StatDetails } from "lib/types";

type StatProps = StatDetails;

const Stat = ({ display, value }: StatProps) => {
  return (
    <div className="flex basis-1/2 flex-col justify-center lg:basis-auto lg:items-start">
      <p className="mb-1 text-xs md:mb-3">{display}</p>
      <h1
        className={classNames("gradient-text header", GRADIENTS.activity.class)}
      >
        {value}
      </h1>
    </div>
  );
};

export default Stat;
