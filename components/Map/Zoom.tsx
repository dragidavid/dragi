import classNames from "classnames";
import { useMap } from "react-map-gl";
import { Root, Track, Thumb } from "@radix-ui/react-slider";

import { GRADIENTS } from "lib/entities";

const Zoom = () => {
  const { map } = useMap();

  return (
    <div className="absolute right-8 z-[2] h-1/3 w-1 rounded-full opacity-50 transition-opacity duration-200 hover:opacity-100">
      <Root
        aria-label="zoom"
        max={11}
        min={5}
        defaultValue={[10]}
        step={0.1}
        className="relative flex h-full w-full touch-none select-none flex-col items-center"
        orientation="vertical"
        onValueChange={(value) => map?.zoomTo(value[0])}
      >
        <Track className="relative w-full grow rounded-full bg-black/10 dark:bg-white/20" />
        <Thumb
          className={classNames(
            "block h-4 w-4 rounded-full bg-gradient-to-br shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-[#25B67A] focus-visible:ring-opacity-50",
            GRADIENTS.map.class
          )}
        />
      </Root>
    </div>
  );
};

export default Zoom;
