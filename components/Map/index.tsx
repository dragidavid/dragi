import ReactMapGL, { Marker } from "react-map-gl";
import { useTheme } from "next-themes";

import Zoom from "components/Map/Zoom";

import { classNames } from "lib/utils";

import { GRADIENTS } from "lib/gradients";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="absolute inset-0 z-[1] flex items-center overflow-hidden rounded-3xl">
      <ReactMapGL
        id="map"
        initialViewState={{
          latitude: 51.5044953,
          longitude: -0.0098106,
          zoom: 10,
        }}
        mapStyle={
          resolvedTheme === "dark"
            ? "mapbox://styles/vrylol/cl1qaiypf001214ozg2vk12ig"
            : "mapbox://styles/vrylol/cl1qcssxo00ah15qglxktiw85"
        }
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        interactive={false}
        attributionControl={false}
      >
        <Marker latitude={51.5044953} longitude={-0.0098106}>
          <div
            className={classNames(
              "h-28 w-28 rounded-full bg-gradient-to-r opacity-30 ring-2 ring-[#25B67A]",
              GRADIENTS.map.class
            )}
            role="figure"
            aria-label="marker"
          />
        </Marker>
        <Zoom />
      </ReactMapGL>
    </div>
  );
};

export default Map;
