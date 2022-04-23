import classNames from "classnames";

import { GRADIENTS } from "lib/gradients";

const Projects = () => {
  return (
    <div className="flex">
      <h1
        className={classNames(
          "gradient-text header mb-4",
          GRADIENTS.projects.class
        )}
      >
        Projects
      </h1>
    </div>
  );
};

export default Projects;
