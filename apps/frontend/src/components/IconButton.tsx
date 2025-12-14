import { ReactNode } from "react";

export function IconButton({
  icon,
  onClick,
  active = false,
}: {
  icon: ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-md transition
        ${active ? "bg-neutral-700" : "hover:bg-neutral-800"}
        text-neutral-300 hover:text-white
      `}
    >
      {icon}
    </button>
  );
}
