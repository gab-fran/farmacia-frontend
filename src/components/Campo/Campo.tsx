import type { ReactNode } from "react";
export default function Campo({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <label>
      <span>{titulo}</span>
      {children}
    </label>
  );
}
