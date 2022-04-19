import classNames from "classnames";

import { GRADIENTS } from "lib/entities";

const Projects = () => {
  return (
    <div className="flex">
      <h1
        className={classNames("gradient-text header", GRADIENTS.projects.class)}
      >
        Projects
      </h1>
    </div>
  );
};

export default Projects;
