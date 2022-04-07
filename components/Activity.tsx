import classNames from "classnames";

import { GRADIENTS } from "lib/entities";

const Activity = () => {
  return (
    <div className="flex">
      <h1 className={classNames("header", GRADIENTS.activity.class)}>
        Activity
      </h1>
    </div>
  );
};

export default Activity;
