import Fade from "@/components/fade";
import Line from "@/components/line";
import Stars from "@/components/stars";
import Module from "@/components/module";
import Status from "@/components/status";
import Navigation from "@/components/navigation";

import { cn } from "@/lib/cn";

const fadeClasses = {
  top: cn(
    "left-0 top-0 h-[7vh] w-screen invisible",
    "bg-linear-to-t from-transparent to-background",
    "xs:visible",
    "md:h-[1/6]",
  ),
  left: cn(
    "top-0 left-0 h-screen w-[7vw] invisible",
    "bg-linear-to-l from-transparent to-background",
    "xs:visible",
    "sm:w-1/6",
  ),
  bottom: cn(
    "bottom-0 left-0 h-[11vh] w-screen",
    "bg-linear-to-b from-transparent to-background",
    "md:h-1/6",
  ),
  right: cn(
    "top-0 right-0 h-screen w-[7vw] invisible",
    "bg-linear-to-r from-transparent to-background",
    "xs:visible",
    "sm:w-1/6",
  ),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "size-full pl-(--expanded-side-width)",
        "xs:min-h-screen xs:px-3",
        "md:px-0",
      )}
    >
      <div className={cn("relative size-full min-h-dvh")}>
        <Fade
          sides={Object.entries(fadeClasses).map(([id, className]) => ({
            id,
            className,
          }))}
        />

        <Line
          className={cn(
            "-bottom-full -top-full left-0 w-px",
            "bg-muted",
            "-translate-x-1/2",
          )}
        />

        <Module
          id="status"
          className={cn(
            "fixed bottom-0 left-0 top-0 w-(--expanded-side-width)!",
            "xs:relative xs:h-[7vh] xs:w-auto!",
            "md:h-[calc(calc(100vh-var(--container-size))/2)]",
          )}
        >
          <div
            className={cn(
              "relative flex size-full flex-col items-center justify-start whitespace-nowrap",
              "xs:items-start xs:justify-end",
            )}
          >
            <div
              className={cn(
                "rotate-180 [writing-mode:vertical-lr]",
                "xs:hidden",
              )}
            >
              <Status />
            </div>

            <Stars
              id="tsparticles"
              minSize={0.2}
              maxSize={1}
              density={100}
              className={cn("absolute inset-0")}
            />
          </div>
        </Module>

        <Module
          id="content"
          lines={{
            top: "-inset-x-screen hidden h-px -translate-y-1/2 bg-muted xs:block",
          }}
          tiltedLines={{
            tl: "invisible left-0 top-0 bg-horizontal-dashed xs:visible",
            tr: "invisible right-0 top-0 bg-horizontal-dashed xs:visible",
            bl: "invisible bottom-0 left-0 bg-horizontal-dashed xs:visible",
            br: "invisible bottom-0 right-0 bg-horizontal-dashed xs:visible",
          }}
          crosses={{
            tl: "invisible xs:visible",
            tr: "invisible xs:visible",
            bl: "invisible xs:visible",
            br: "invisible xs:visible",
          }}
          className={cn("xs:h-[80vh]", "md:h-(--container-size)")}
        >
          <div
            className={cn("h-full flex-1 overflow-auto", "md:overflow-visible")}
          >
            {children}
          </div>
        </Module>

        <Module
          id="navigation"
          lines={{
            top: "invisible -left-screen -right-screen h-px -translate-y-1/2 bg-muted xs:visible",
          }}
          crosses={{
            tl: "invisible",
            tr: "invisible xs:visible",
            bl: "invisible",
            br: "invisible",
          }}
          className={cn(
            "fixed inset-x-4 bottom-4 z-50 w-auto rounded-3xl",
            "xs:relative xs:inset-x-auto xs:bottom-0 xs:z-30 xs:h-[13vh] xs:w-full",
            "md:h-[calc(calc(100vh-var(--container-size))/2)]",
          )}
        >
          <Navigation />
        </Module>

        <Line
          className={cn(
            "-bottom-full -top-full right-0 w-px",
            "bg-muted",
            "translate-x-1/2",
          )}
        />
      </div>
    </div>
  );
}
