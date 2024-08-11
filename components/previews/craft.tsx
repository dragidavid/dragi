import { compareDesc } from "date-fns";

import { getPages } from "content/source";

import {
  MotionDiv,
  MotionPath,
  MotionLink,
} from "components/primitives/motion";

import { cn } from "lib/cn";

export default async function Preview() {
  const posts = getPages();

  const sortedPosts = posts.sort((a, b) => {
    return compareDesc(new Date(a.data.date), new Date(b.data.date));
  });

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (sortedPosts.length === 0) {
    return (
      <Container>
        <AnimatedSVG />
        <MotionDiv
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className={cn(
            "absolute inset-4 grid place-items-center font-mono text-xs",
            "text-primary/20",
          )}
        >
          <span>no posts yet</span>
        </MotionDiv>
      </Container>
    );
  }

  return (
    <Container>
      <AnimatedSVG />

      <MotionDiv
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className={cn("h-full px-4 py-6")}
      >
        <div className={cn("flex flex-col gap-2", "group")}>
          {sortedPosts.slice(0, 5).map((post) => (
            <MotionLink
              key={post.file.name}
              variants={linkVariants}
              href={post.url}
              className={cn(
                "text-sm",
                "truncate",
                "select-none outline-none",
                "text-primary",
                "first:pt-0",
                "hover:bg-primary hover:text-background",
                "focus:bg-primary focus:text-background",
                "xs:transition-[opacity,filter] xs:duration-200 xs:ease-in-out-quad",
                "xs:hover:bg-inherit xs:hover:text-inherit xs:hover:!opacity-100 xs:hover:!blur-none",
                "xs:focus:bg-inherit xs:focus:text-inherit xs:focus:!opacity-100 xs:focus:!blur-none",
                "xs:group-hover:opacity-50 xs:group-hover:blur-sm",
                "xs:group-focus-within:opacity-50 xs:group-focus-within:blur-sm",
              )}
            >
              {post.data.title}
            </MotionLink>
          ))}
        </div>
      </MotionDiv>
    </Container>
  );
}

function AnimatedSVG() {
  return (
    <div className={cn("px-1 py-0.5")}>
      <svg height="20" viewBox="0 0 158 24" fill="none">
        <defs>
          <linearGradient
            id="craft-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(var(--inverse))" />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.5"
            />
          </linearGradient>
        </defs>

        <MotionPath
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{
            opacity: 1,
            pathLength: 1,
            transition: { duration: 1, opacity: { duration: 0.2 } },
          }}
          d="M15.1566 3C-0.68555 16.9536 1.76262 24.2187 6.87562 19.6255C16.8877 10.6314 29.8656 5.96884 25.3392 11.9065C21.7609 16.6007 16.2897 21.4068 24.2108 18.438C32.1319 15.4691 43.4477 11.9065 36.6582 18.438C30.81 24.0639 41.7504 17.8442 50.803 14.5785C59.5639 11.418 63.2505 10.719 57.5926 16.6567C50.8563 23.726 71.1083 18.4142 78.5269 14.8754C90.9743 8.93768 88.1422 17.5473 107.945 19.6255C128.11 21.7417 166.79 11.0159 151.514 17.8442"
          stroke="url(#craft-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("relative flex size-full min-h-32 flex-col")}>
      {children}
    </div>
  );
}
