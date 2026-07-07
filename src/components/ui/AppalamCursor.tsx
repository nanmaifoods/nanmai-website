"use client";

import { useEffect, useRef } from "react";

const TEXT_SELECTOR = 'input, textarea, select, [contenteditable="true"]';
const CURSOR_SIZE = 26;

/**
 * Replaces the OS pointer with the appalam image. Tracks the mouse 1:1
 * (no smoothing/lag) so it behaves exactly like a normal cursor, just
 * with a gentle roll as it travels horizontally. Only activates on
 * devices with a fine pointer and when reduced motion isn't requested.
 */
export function AppalamCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const el = dotRef.current;
    if (!el) return;

    document.documentElement.classList.add("appalam-cursor-active");

    let lastX: number | null = null;
    let rotation = 0;
    let visible = false;

    const handleMove = (e: MouseEvent) => {
      rotation += lastX === null ? 0 : (e.clientX - lastX) * 1.1;
      lastX = e.clientX;

      if (!visible) {
        visible = true;
      }

      const target = e.target as Element | null;
      const overText = !!target?.closest?.(TEXT_SELECTOR);
      el.style.opacity = overText ? "0" : "1";

      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) rotate(${rotation}deg)`;
    };

    const handleLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.documentElement.classList.remove("appalam-cursor-active");
    };
  }, []);

  return (
    <div ref={dotRef} className="appalam-cursor" aria-hidden="true">
      <img
        src="/images/new_assets/appalam-cursor.png"
        alt=""
        draggable={false}
        width={CURSOR_SIZE}
        height={CURSOR_SIZE}
      />
    </div>
  );
}
