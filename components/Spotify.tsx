import { useState, useEffect } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import Image from "next/image";

import fetcher from "lib/fetcher";
import { getColors, randomNumber, randomArray } from "lib/utils";

import { NowPlayingSong, Color } from "lib/types";

export default function Spotify() {
  const [colors, setColors] = useState<Color[] | undefined>(undefined);
  const { data } = useSWR<NowPlayingSong>("/api/spotify/now-playing", fetcher);

  useEffect(() => {
    if (data && data.albumImageUrl) {
      getColors(data.albumImageUrl, 4).then((res) => setColors(res));
    }
  }, [data]);

  return (
    <div className="relative h-full">
      {colors &&
        colors.map((color: Color) => (
          <motion.div
            key={color.name}
            className="absolute mix-blend-normal blur-2xl filter"
            style={{
              backgroundColor: color.hex,
              left: `${randomNumber(-20, 50)}%`,
              top: `${randomNumber(-20, 50)}%`,
              height: `${randomNumber(80, 90)}%`,
              width: `${randomNumber(50, 90)}%`,
              borderRadius: `${randomArray(4, 80, 100).join("% ")}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: [0, ...randomArray(4, -100, 100), 0],
              y: [0, ...randomArray(4, -100, 100), 0],
              scale: [1, ...randomArray(4, 0.82, 2, true), 1],
              rotate: 360,
            }}
            transition={{
              opacity: { duration: 2 },
              default: {
                ease: "easeInOut",
                duration: randomNumber(10, 14),
                repeat: Infinity,
              },
            }}
          />
        ))}
      <div className="relative h-full bg-white/60 dark:bg-slate-900/60">
        <div className="flex h-full flex-col">
          <div>
            <Image
              src={"/Spotify_Icon_White.png"}
              alt="spotify_white"
              width={72}
              height={72}
            />
          </div>
          <h2>Now Playing:</h2>
          <p>{data?.title}</p>
          <p>{data?.artist}</p>
        </div>
      </div>
    </div>
  );
}
