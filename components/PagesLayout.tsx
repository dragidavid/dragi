import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";

const cards = [
  {
    id: "projects",
    title: "Projects",
    baseStyles: "col-span-2 col-start-1 row-span-3",
    isExpandable: true,
  },
  {
    id: "sketches",
    title: "Sketches",
    baseStyles: "col-span-2 col-start-1 row-span-2",
    isExpandable: true,
  },
  {
    id: "goods",
    title: "Goods",
    baseStyles: "col-span-2 col-start-1 row-span-2",
    isExpandable: true,
  },
  {
    id: "about",
    title: "About",
    baseStyles: "col-span-2 col-start-3 row-span-5 row-start-1",
    isExpandable: false,
  },
  {
    id: "tools",
    title: "Tools",
    baseStyles: "col-span-2 row-span-2",
    isExpandable: true,
  },
  {
    id: "spotify",
    title: "Spotify",
    baseStyles: "col-span-2 col-start-5 row-span-4 row-start-1",
    isExpandable: true,
  },
  {
    id: "blog",
    title: "Blog",
    baseStyles: "col-span-2 col-start-5 row-span-3 row-start-5",
    isExpandable: true,
  },
];

export default function MainLayout() {
  return (
    <section className="h-full w-full">
      <div className="grid h-full w-full auto-rows-auto grid-cols-6 gap-5">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            layout
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            style={{
              borderRadius: "6px",
            }}
            className={clsx(
              "rounded-md border-2 border-white/5 bg-[#050505] p-3 transition-colors duration-300 hover:border-white/10",
              card.baseStyles
            )}
          >
            {card.isExpandable ? (
              <Link href={`/${card.id}`}>
                <button
                  type="button"
                  className="block rounded-full bg-green-500 p-1"
                ></button>
              </Link>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
