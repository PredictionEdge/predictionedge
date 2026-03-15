"use client";

import { useState } from "react";
import { Info } from "lucide-react";

interface Props {
  text: string;
  className?: string;
}

export default function InfoTooltip({ text, className = "" }: Props) {
  const [show, setShow] = useState(false);

  return (
    <span className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
      >
        <Info className="h-3 w-3" />
      </button>
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground bg-popover border border-border/50 rounded-lg shadow-lg whitespace-normal w-56 z-50">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-border/50" />
        </span>
      )}
    </span>
  );
}
