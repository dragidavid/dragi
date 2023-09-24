import Module from "components/Module";

import Navigation from "components/Navigation";
import Status from "components/Status";

import Fade from "components/ui/Fade";
import Line from "components/ui/Line";
import Pattern from "components/ui/Pattern";

import { cn } from "lib/cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("h-[100dvh] w-full pl-12", "xs:px-5", "sm:px-4")}>
      <div
        className={cn(
          "relative w-full",
          "xs:flex xs:flex-col xs:justify-center",
        )}
      >
        <Fade
          sides={[
            // {
            //   id: "top",
            //   className: cn(
            //     "left-0 top-0 h-[9vh] w-screen",
            //     "bg-gradient-to-t from-transparent to-background",
            //     "md:h-1/6",
            //   ),
            // },
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
                "md:h-1/6",
              ),
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
        />

        <Line
          className={cn(
            "-bottom-full -top-full left-0 w-px",
            "-translate-x-1/2",
          )}
        />

        <Module
          id="status"
          className={cn(
            "fixed bottom-0 left-0 top-0 !w-[--expanded-side-width]",
            "bg-background",
            "xs:relative xs:h-12 xs:!w-auto",
            "md:h-[calc(calc(100vh-var(--container-size))/2)]",
          )}
        >
          <div
            className={cn(
              "relative flex h-full w-full flex-col items-center justify-start whitespace-nowrap",
              "xs:items-start xs:justify-end ",
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

            <Pattern className={cn("xs:absolute xs:inset-0 xs:rotate-180")} />
          </div>
        </Module>

        <Module
          id="content"
          lines={{
            top: "-left-full -right-full hidden h-px -translate-y-1/2 xs:block",
          }}
          joints={{
            tl: "invisible xs:visible",
            tr: "invisible xs:visible",
            bl: "invisible xs:visible",
            br: "invisible xs:visible",
          }}
          className={cn(
            "h-[100dvh] pb-[--mobile-navigation-height]",
            "xs:h-[calc(100vh-6rem-var(--mobile-navigation-height))] xs:pb-0 md:h-[calc(var(--container-size)-var(--desktop-navigation-height))]",
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
            top: "left-0 -right-full h-px -translate-y-1/2 xs:-left-full",
          }}
          joints={{
            tl: "visible xs:invisible",
            tr: "invisible xs:visible",
            bl: "invisible",
            br: "invisible",
          }}
          className={cn(
            "fixed bottom-0 left-[--expanded-side-width] z-30 w-[calc(100vw-var(--expanded-side-width))]",
            "xs:relative xs:left-auto xs:w-full",
          )}
        >
          <Navigation />
        </Module>

        <Line
          className={cn(
            "-bottom-full -top-full right-0 w-px",
            "translate-x-1/2",
          )}
        />
      </div>
    </div>
  );
}
