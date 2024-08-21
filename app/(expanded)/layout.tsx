import Fade from "components/fade";
import Line from "components/line";
import Stars from "components/stars";
import Module from "components/module";
import Status from "components/status";
import Navigation from "components/navigation";

import { cn } from "lib/cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "size-full pl-[--expanded-side-width]",
        "xs:h-dvh xs:px-5",
        "sm:px-4",
        "md:px-0",
      )}
    >
      <div
        className={cn(
          "relative w-full",
          "xs:flex xs:flex-col xs:justify-center",
        )}
      >
        {/* <Fade
          sides={[
            {
              id: "left",
              className: cn(
                "top-0 left-0 h-screen w-[7vw] invisible",
                "bg-gradient-to-l from-transparent to-background",
                "xs:visible",
                "sm:w-1/6",
              ),
            },
            {
              id: "bottom",
              className: cn(
                "bottom-0 left-0 h-[11vh] w-screen",
                "bg-gradient-to-b from-transparent to-background",
                "md:h-[14%]",
              ),
              blurSteps: 4,
            },
            {
              id: "right",
              className: cn(
                "top-0 right-0 h-screen w-[7vw] invisible",
                "bg-gradient-to-r from-transparent to-background",
                "xs:visible",
                "sm:w-1/6",
              ),
            },
          ]}
        /> */}

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
            "fixed bottom-0 left-0 top-0 !w-[--expanded-side-width]",
            "xs:relative xs:h-12 xs:!w-auto",
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
                "w-full",
                "rotate-180 [writing-mode:vertical-lr]",
                "xs:rotate-0 xs:[writing-mode:inherit]",
              )}
            >
              <Status />
            </div>

            <Stars
              id="tsparticles"
              minSize={0.2}
              maxSize={1}
              density={100}
              className={cn(
                "absolute inset-x-0 bottom-0 top-1/3 xs:inset-0 xs:rotate-180",
              )}
            />
          </div>
        </Module>

        <Module
          id="content"
          lines={{
            top: "-inset-x-screen hidden h-px -translate-y-1/2 bg-muted xs:block",
          }}
          tiltedLines={{
            tl: "invisible left-0 top-0 h-screen w-px origin-top rotate-[135deg] bg-vertical-dashed xs:visible",
            tr: "invisible right-0 top-0 h-screen w-px origin-top -rotate-[135deg] bg-vertical-dashed xs:visible",
            bl: "invisible bottom-0 left-0 h-screen w-px origin-bottom -rotate-[135deg] bg-vertical-dashed xs:visible",
            br: "invisible bottom-0 right-0 h-screen w-px origin-bottom rotate-[135deg] bg-vertical-dashed xs:visible",
          }}
          crosses={{
            tl: "invisible xs:visible",
            tr: "invisible xs:visible",
            bl: "invisible xs:visible",
            br: "invisible xs:visible",
          }}
          className={cn(
            "xs:h-[calc(100vh-6rem-var(--mobile-navigation-height))]",
            "md:h-[--container-size]",
          )}
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
            "fixed inset-x-6 bottom-0 z-30 w-auto rounded-lg",
            "border border-muted bg-extreme",
            "xs:relative xs:inset-x-auto xs:bottom-auto xs:left-auto xs:w-full xs:border-none xs:bg-transparent",
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
