import classNames from "classnames";

import Logo from "components/Logo";

import { GRADIENTS } from "lib/entities";

const Bio = () => {
  return (
    <div className="flex flex-col">
      <Logo className="z-[1] scale-[2] blur-2xl" />

      <h2 className={classNames("header", GRADIENTS.bio.class)}>
        David Dragovacz
      </h2>
    </div>
  );
};

export default Bio;
