import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";

import { cages } from "lib/cages";

export default function MainLayout() {
  return (
    <section className="grid h-full w-full auto-rows-auto grid-cols-6 gap-5">
      {cages.map((cage) => (
        <motion.div
          key={cage.id}
          layout
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          className={clsx("relative overflow-hidden rounded-xl", cage.styles)}
        >
          {cage.hasOwnPage && (
            <Link href={cage.href} className="absolute top-3 left-3 z-10">
              <div className="block rounded-full bg-green-500 p-1" />
            </Link>
          )}

          {cage.component && (
            <div className="absolute inset-0">{cage.component}</div>
          )}
        </motion.div>
      ))}
    </section>
  );
}
