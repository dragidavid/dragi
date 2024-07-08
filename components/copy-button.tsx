"use client";

import { useState, useEffect } from "react";

import Icon from "components/icon";

import { Button } from "components/primitives/button";

import { cn } from "lib/cn";

export default function CopyButton({ value }: { value?: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant="subtle"
      onClick={() => {
        navigator.clipboard.writeText(value || "");

        setHasCopied(true);
      }}
      className={cn(
        "absolute right-3.5 top-3.5 size-4.5 p-0.5",
        "text-secondary",
      )}
    >
      {hasCopied ? (
        <Icon name="check" size="full" />
      ) : (
        <Icon name="copy" size="full" />
      )}
      <span className="sr-only">Copy code</span>
    </Button>
  );
}
