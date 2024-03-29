import { classNames } from "lib/utils";

import { GRADIENTS } from "lib/gradients";

const Projects = () => {
  return (
    <div className="flex h-full flex-col">
      <h1
        className={classNames(
          "gradient-text header mb-4",
          GRADIENTS.projects.class
        )}
      >
        Projects
      </h1>
      <div className="flex grow items-center justify-center">
        <p className="text-xs font-semibold">coming soon...</p>
      </div>
    </div>
  );
};

export default Projects;
