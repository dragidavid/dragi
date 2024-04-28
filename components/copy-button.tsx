"use client";

import { useState, useEffect } from "react";

import Icon from "components/icon";

import { Button } from "components/primitives/button";

import { cn } from "lib/cn";

export default function CopyButton({
  value,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { value?: string }) {
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
      className={cn("absolute right-4 top-4 !size-6", "text-secondary")}
      {...props}
    >
      {hasCopied ? (
        <Icon name="check" size="14" />
      ) : (
        <Icon name="copy" size="20" />
      )}
      <span className="sr-only">Copy code</span>
    </Button>
  );
}
