import Module from "components/Module";

import Navigation from "components/Navigation";

import Fade from "components/ui/Fade";
import Line from "components/ui/Line";

import { cn } from "lib/cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative w-full",
        "xs:flex xs:flex-col xs:justify-center",
        "md:h-[--container-size]"
      )}
    >
      <Fade
        sides={[
          {
            id: "top",
            className: cn(
              "left-0 top-0 h-[9vh] w-screen",
              "bg-gradient-to-t from-transparent to-background",
              "md:h-1/6"
            ),
          },
          {
            id: "left",
            className: cn(
              "top-0 left-0 h-screen w-[7vw] invisible",
              "bg-gradient-to-l from-transparent to-background",
              "xs:visible",
              "sm:w-1/6"
            ),
          },
          {
            id: "bottom",
            className: cn(
              "bottom-0 left-0 h-[11vh] w-screen",
              "bg-gradient-to-b from-transparent to-background",
              "md:h-1/6"
            ),
          },
          {
            id: "right",
            className: cn(
              "top-0 right-0 h-screen w-[7vw] invisible",
              "bg-gradient-to-r from-transparent to-background",
              "xs:visible",
              "sm:w-1/6"
            ),
          },
        ]}
      />

      <Line
        className={cn("-bottom-full -top-full left-0 w-px", "-translate-x-1/2")}
      />

      <Module
        id="content"
        lines={{
          top: "-left-full -right-full hidden h-px -translate-y-1/2 xs:block",
        }}
        joints={{
          tl: "invisible xs:visible",
          tr: "invisible xs:visible",
          bl: "invisible",
          br: "invisible",
        }}
        moduleStyles="pb-[--mobile-navigation-height] h-[100dvh] xs:h-[calc(100vh-8vh-var(--mobile-navigation-height))] xs:pb-0 md:h-[calc(var(--container-size)-var(--desktop-navigation-height))]"
      >
        <div className="h-full flex-1 overflow-auto md:overflow-visible">
          {children}
        </div>
      </Module>

      <Module
        id="navigation"
        lines={{ top: "-left-full -right-full h-px -translate-y-1/2" }}
        joints={{
          tl: "visible",
          tr: "visible",
          bl: "invisible",
          br: "invisible",
        }}
        moduleStyles="fixed z-30 bottom-0 left-5 w-[calc(100vw-2.5rem)] xs:relative xs:left-auto xs:w-full"
      >
        <Navigation />
      </Module>

      <Line
        className={cn("-bottom-full -top-full right-0 w-px", "translate-x-1/2")}
      />
    </div>
  );
}
