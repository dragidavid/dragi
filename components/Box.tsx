"use client";

interface BoxProps {
  title: string;
}

export default function Box({ title }: BoxProps) {
  return <div>Box {title}</div>;
}
