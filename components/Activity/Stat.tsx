import classNames from "classnames";

import { GRADIENTS } from "lib/entities";

type StatProps = {
  display: string;
  value: number;
};

const Stat = ({ display, value }: StatProps) => {
  return (
    <div className="basis-1/2 lg:basis-auto">
      <p className="mb-2 text-sm text-black/50 dark:text-white/50">{display}</p>
      <h1 className={classNames("header", GRADIENTS.activity.class)}>
        {value}
      </h1>
    </div>
  );
};

export default Stat;
