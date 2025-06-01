"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { motion, useAnimate, useMotionValue } from "motion/react";

import { cn } from "@/lib/cn";

export const Marquee = memo(
  ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => {
    const [moveBy, setMoveBy] = useState<number | undefined>(undefined);

    const containerRef = useRef<HTMLDivElement>(null);
    const hasInitialAnimationRun = useRef(false);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
    const isVisible = useRef(true);

    const [scope, animate] = useAnimate();
    const isAnimating = useMotionValue(false);

    const animationConfig = useMemo(
      () => ({
        duration: (moveBy: number) => (moveBy / 50) * 3,
        times: [0, 0.45, 0.55, 1],
        ease: "linear" as const,
      }),
      [],
    );

    const getMoveBy = useCallback(() => {
      if (scope.current && containerRef.current) {
        const newMoveBy =
          scope.current.offsetWidth - containerRef.current.clientWidth;

        if (newMoveBy > 0) {
          setMoveBy(newMoveBy);
        } else {
          setMoveBy(undefined);
        }
      }
    }, [scope]);

    const runAnimation = useCallback(
      async (animationDelay: number = 0) => {
        if (!moveBy || !isVisible.current) return;

        isAnimating.set(true);

        try {
          await animate(scope.current, { x: 0 }, { duration: 0 });

          await animate(
            scope.current,
            { x: [0, -moveBy, -moveBy, 0] },
            {
              duration: animationConfig.duration(moveBy),
              times: animationConfig.times,
              delay: animationDelay,
              ease: animationConfig.ease,
            },
          );
        } finally {
          isAnimating.set(false);
        }
      },
      [animate, scope, moveBy, isAnimating, animationConfig],
    );

    const startAnimation = useCallback(async () => {
      if (!isAnimating.get() && moveBy && isVisible.current) {
        await runAnimation(0);
      }
    }, [runAnimation, moveBy, isAnimating]);

    useEffect(() => {
      if (!containerRef.current) return;

      resizeObserverRef.current = new ResizeObserver((entries) => {
        requestAnimationFrame(() => {
          getMoveBy();
        });
      });

      resizeObserverRef.current.observe(containerRef.current);

      return () => {
        resizeObserverRef.current?.disconnect();
      };
    }, [getMoveBy]);

    useEffect(() => {
      if (!containerRef.current) return;

      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          isVisible.current = entry.isIntersecting;

          if (
            entry.isIntersecting &&
            moveBy &&
            !hasInitialAnimationRun.current
          ) {
            hasInitialAnimationRun.current = true;

            runAnimation(3);
          }
        },
        { threshold: 0.1 },
      );

      intersectionObserverRef.current.observe(containerRef.current);

      return () => {
        intersectionObserverRef.current?.disconnect();
      };
    }, [moveBy, runAnimation]);

    useEffect(() => {
      getMoveBy();
    }, [getMoveBy]);

    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={className}
        aria-live="off"
        aria-atomic="true"
      >
        <motion.div
          ref={scope}
          onHoverStart={startAnimation}
          onTap={startAnimation}
          className={cn("w-max whitespace-nowrap")}
          tabIndex={-1}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  },
);
