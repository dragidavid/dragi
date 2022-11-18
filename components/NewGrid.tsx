"use client";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

const cards = [
  {
    id: "projects",
    title: "Projects",
    isExpandable: true,
    baseStyles: "col-span-2 col-start-1 row-span-3",
    expandedStyles: "w-full h-full",
  },
  {
    id: "sketches",
    title: "Sketches",
    isExpandable: true,
    baseStyles: "col-span-2 col-start-1 row-span-2",
    expandedStyles: "w-full h-full",
  },
  {
    id: "goods",
    title: "Goods",
    isExpandable: true,
    baseStyles: "col-span-2 col-start-1 row-span-2",
    expandedStyles: "w-full h-full",
  },
  {
    id: "about",
    title: "About",
    isExpandable: false,
    baseStyles: "col-span-2 col-start-3 row-span-5 row-start-1",
    expandedStyles: "w-full h-full",
  },
  {
    id: "tools",
    title: "Tools",
    isExpandable: true,
    baseStyles: "col-span-2 row-span-2",
    expandedStyles: "w-full h-full",
  },
  {
    id: "spotify",
    title: "Spotify",
    isExpandable: true,
    baseStyles: "col-span-2 col-start-5 row-span-4 row-start-1",
    expandedStyles: "w-full h-full",
  },
  {
    id: "blog",
    title: "Blog",
    isExpandable: true,
    baseStyles: "col-span-2 col-start-5 row-span-3 row-start-5",
    expandedStyles: "w-full h-full",
  },
];

export default function NewGrid() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  console.log(selectedCard);

  return (
    <div
      className={clsx(
        "h-full",
        selectedCard ? "block" : "grid auto-rows-auto grid-cols-6 gap-12"
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {cards
          .filter((card) => (selectedCard ? selectedCard === card.id : card))
          .map((card) => (
            <motion.div
              layout
              transition={{ duration: 1 }}
              initial={{
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={card.id}
              className={clsx(
                "box",
                card.id === selectedCard ? card.expandedStyles : card.baseStyles
              )}
            >
              <motion.div layout>
                {card.isExpandable ? (
                  <button
                    type="button"
                    className="block rounded-md bg-purple-600 p-2 text-white"
                    onClick={() => setSelectedCard(card.id)}
                  >
                    expand
                  </button>
                ) : null}
                {selectedCard && (
                  <button
                    type="button"
                    className="block rounded-md bg-green-600 p-2 text-white"
                    onClick={() => setSelectedCard(null)}
                  >
                    minimize
                  </button>
                )}
                <Link
                  href={`/${card.id}`}
                  onClick={() => setSelectedCard(card.id)}
                >
                  {card.title}
                </Link>
              </motion.div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
