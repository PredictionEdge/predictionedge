"use client";

import { useState, useRef } from "react";
import { Info } from "lucide-react";

interface Props {
  text: string;
  className?: string;
}

export default function InfoTooltip({ text, className = "" }: Props) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  function updatePos() {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ x: rect.left + rect.width / 2, y: rect.top });
    }
  }

  return (
    <span className={`relative inline-flex ${className}`}>
      <button
        ref={ref}
        type="button"
        onMouseEnter={() => { updatePos(); setShow(true); }}
        onMouseLeave={() => setShow(false)}
        onClick={() => { updatePos(); setShow(!show); }}
        className="text-muted-foreground/40 hover:text-muted-foreground/90 transition-colors"
      >
        <Info className="h-3 w-3" />
      </button>
      {show && (
        <span
          className="fixed px-3 py-2 text-[10px] leading-relaxed text-muted-foreground bg-popover border border-border/50 rounded-lg shadow-lg whitespace-normal w-56 z-[100] pointer-events-none"
          style={{ left: pos.x, top: pos.y - 8, transform: "translate(-50%, -100%)" }}
        >
          {text}
        </span>
      )}
    </span>
  );
}
