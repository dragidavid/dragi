"use client";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const expandedStyles = "col-span-full row-start-auto z-10";

const cards = [
  {
    id: "projects",
    title: "Projects",
    isExpandable: true,
    baseStyles: "col-span-2 col-start-1 row-span-3",
    expandedStyles: expandedStyles,
  },
  {
    id: "sketches",
    title: "Sketches",
    baseStyles: "col-span-2 col-start-1 row-span-2",
    expandedStyles: expandedStyles,
  },
  {
    id: "goods",
    title: "Goods",
    baseStyles: "col-span-2 col-start-1 row-span-2",
    expandedStyles: expandedStyles,
  },
  {
    id: "about",
    title: "About",
    baseStyles: "col-span-2 col-start-3 row-span-5 row-start-1",
    expandedStyles: expandedStyles,
  },
  {
    id: "tools",
    title: "Tools",
    baseStyles: "col-span-2 row-span-2",
    expandedStyles: expandedStyles,
  },
  {
    id: "spotify",
    title: "Spotify",
    baseStyles: "col-span-2 col-start-5 row-span-4 row-start-1",
    expandedStyles: expandedStyles,
  },
  {
    id: "blog",
    title: "Blog",
    baseStyles: "col-span-2 col-start-5 row-span-3 row-start-5",
    expandedStyles: expandedStyles,
  },
];

export default function MainLayout() {
  const pathname = usePathname();

  const [selectedCard, setSelectedCard] = useState<string | null>(
    pathname !== "/" && pathname !== null ? pathname.slice(1) : null
  );

  console.log(selectedCard);

  return (
    <section className="h-2/3 w-2/3">
      <div
        className={clsx(
          "grid h-full w-full grid-cols-6 gap-5",
          selectedCard ? "grid-rows-[auto_1fr]" : "auto-rows-auto"
        )}
      >
        {cards.map((card) => (
          <motion.div
            layout
            initial={{
              opacity: 0,
            }}
            style={{
              borderRadius: "12px",
            }}
            animate={{ opacity: 1 }}
            key={card.id}
            className={clsx(
              "relative bg-green-300",
              selectedCard
                ? card.id === selectedCard
                  ? card.expandedStyles
                  : "row-start-1 h-10"
                : card.baseStyles
            )}
          >
            <motion.div
              layout
              initial={{
                opacity: 0,
              }}
              style={{
                borderRadius: "12px",
              }}
              animate={{ opacity: 1 }}
              className={clsx(
                "absolute inset-0.75 bg-pink-500",
                selectedCard
                  ? card.id === selectedCard
                    ? card.expandedStyles
                    : "row-start-1"
                  : card.baseStyles
              )}
            >
              <motion.div layout className="h-full w-full">
                {!selectedCard && (
                  <button
                    type="button"
                    className="block rounded-md bg-purple-600 p-2 text-sm text-white"
                    onClick={() => setSelectedCard(card.id)}
                  >
                    🔎
                  </button>
                )}

                {selectedCard && card.id !== selectedCard && (
                  <motion.button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    type="button"
                    className="flex h-full w-full items-center justify-center border-none bg-none text-sm text-white"
                    onClick={() => setSelectedCard(card.id)}
                  >
                    {card.title}
                  </motion.button>
                )}

                {selectedCard === card.id && (
                  <button
                    type="button"
                    className="block rounded-md bg-green-600 p-2 text-white"
                    onClick={() => setSelectedCard(null)}
                  >
                    &#9660;
                  </button>
                )}

                {selectedCard === card.id || !selectedCard ? (
                  <span className="text-sm">{card.title}</span>
                ) : null}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
