import classNames from "classnames";

import { GRADIENTS } from "lib/entities";

type StatProps = {
  display: string;
  value: number;
};

const Stat = ({ display, value }: StatProps) => {
  return (
    <div className="my-4 basis-1/2">
      <p className="mb-2 text-sm text-black/50 dark:text-white/50">{display}</p>
      <h1 className={classNames("header", GRADIENTS.activity.class)}>
        {value}
      </h1>
    </div>
  );
};

export default Stat;
