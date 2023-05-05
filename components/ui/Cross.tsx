import { cn } from "lib/cn";

type Corner = "tl" | "tr" | "bl" | "br";

export type Corners = [Corner, ...Corner[]] & { length: 1 | 2 | 3 | 4 };

const VALUES: Record<
  Corner,
  {
    position: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
      transform?: string;
    };
  }
> = {
  tl: {
    position: {
      top: 0,
      left: 0,
      transform: "translate(-50%, -50%)",
    },
  },
  tr: {
    position: {
      top: 0,
      right: 0,
      transform: "translate(50%, -50%)",
    },
  },
  bl: {
    position: {
      bottom: 0,
      left: 0,
      transform: "translate(-50%, 50%)",
    },
  },
  br: {
    position: {
      bottom: 0,
      right: 0,
      transform: "translate(50%, 50%)",
    },
  },
};

export default function Cross({ corners }: { corners: Corners }) {
  return (
    <>
      {corners.map((corner: Corner) => (
        <svg
          key={corner}
          viewBox="0 0 7 7"
          className={cn("absolute z-40 h-[7px] w-[7px]", "text-primary")}
          style={VALUES[corner].position}
        >
          <line x1="3.5" x2="3.5" y2="7" stroke="currentColor" />
          <line x1="7" y1="3.5" y2="3.5" stroke="currentColor" />
        </svg>
      ))}
    </>
  );
}
