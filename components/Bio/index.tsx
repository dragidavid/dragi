import classNames from "classnames";

import Wave from "components/Bio/Wave";

import { randomNumber } from "lib/utils";

import { useLayoutContext } from "contexts/LayoutContext";

import { GRADIENTS } from "lib/gradients";

const Bio = () => {
  const { getInlineGradient } = useLayoutContext();

  return (
    <div className="h-full">
      <div
        className="absolute top-[-30%] left-[-30%] rounded-[50%] opacity-40 blur-2xl filter"
        style={{
          backgroundImage: getInlineGradient("bio"),
          height: `${randomNumber(80, 120)}%`,
          width: `${randomNumber(80, 120)}%`,
          transform: `rotate(${randomNumber(-360, 360)}deg)`,
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:gap-6">
          <h1 className="header">
            <Wave />
          </h1>

          <h1
            className={classNames("gradient-text header", GRADIENTS.bio.class)}
          >
            David Dragovacz
          </h1>
        </div>

        <div className="flex grow flex-col justify-evenly">
          <p>
            I&apos;m David, a London based frontend engineer working mostly with
            TypeScript and React.
          </p>

          <p>
            I enjoy tinkering with three.js and learning about anything web3
            related.
          </p>

          <p>
            Currently working at{" "}
            <a
              href="https://deliveroo.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold transition-colors duration-200 ease-in-out hover:cursor-ne-resize hover:text-[#00ccbc]"
            >
              deliveroo
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
