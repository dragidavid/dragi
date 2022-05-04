import { useMap } from "react-map-gl";
import { Root, Track, Thumb } from "@radix-ui/react-slider";

import { classNames } from "lib/utils";

import { GRADIENTS } from "lib/gradients";

const Zoom = () => {
  const { current: map } = useMap();

  return (
    <div className="absolute right-8 z-[2] h-1/3 w-1 translate-y-full rounded-full opacity-50 transition-opacity duration-200 hover:opacity-100">
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
          aria-label="thumb"
          className={classNames(
            "block h-4 w-4 rounded-full shadow-sm",
            "bg-gradient-to-br",
            GRADIENTS.map.class,
            "focus:outline-none focus-visible:ring focus-visible:ring-[#25B67A] focus-visible:ring-opacity-50"
          )}
        />
      </Root>
    </div>
  );
};

export default Zoom;
