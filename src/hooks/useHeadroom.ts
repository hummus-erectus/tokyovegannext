"use client";

import { useEffect, useSyncExternalStore } from "react";

type HeadroomState = "unfixed" | "pinned" | "unpinned";

interface UseHeadroomOptions {
  /** Scroll tolerance going up (in pixels) */
  upTolerance?: number;
  /** Scroll tolerance going down (in pixels) */
  downTolerance?: number;
  /** Scroll position at which to start the behavior */
  pinStart?: number;
  /** Force pinned state (e.g., when mobile menu is open) */
  forcePinned?: boolean;
}

interface UseHeadroomReturn {
  state: HeadroomState;
  style: React.CSSProperties;
  /** Class name for styling based on state */
  className: string;
}

// Module-level scroll store
const scrollStore = {
  state: "unfixed" as HeadroomState,
  lastKnownScrollY: 0,
  listeners: new Set<() => void>(),
  
  subscribe(callback: () => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  },
  
  getSnapshot() {
    return scrollStore.state;
  },
  
  getServerSnapshot() {
    return "unfixed" as HeadroomState;
  },
  
  notify() {
    this.listeners.forEach((listener) => listener());
  },
  
  update(newState: HeadroomState) {
    if (newState !== this.state) {
      this.state = newState;
      this.notify();
    }
  }
};

export function useHeadroom({
  upTolerance = 5,
  downTolerance = 5,
  pinStart = 0,
  forcePinned = false,
}: UseHeadroomOptions = {}): UseHeadroomReturn {
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - scrollStore.lastKnownScrollY;

      // Below pinStart threshold - always show
      if (currentScrollY <= pinStart) {
        scrollStore.update("unfixed");
      }
      // Scrolling down
      else if (scrollDelta > downTolerance) {
        scrollStore.update("unpinned");
      }
      // Scrolling up
      else if (scrollDelta < -upTolerance) {
        scrollStore.update("pinned");
      }

      scrollStore.lastKnownScrollY = currentScrollY;
    };

    // Set initial scroll position
    scrollStore.lastKnownScrollY = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [upTolerance, downTolerance, pinStart]);

  const scrollState = useSyncExternalStore(
    scrollStore.subscribe.bind(scrollStore),
    scrollStore.getSnapshot,
    scrollStore.getServerSnapshot
  );

  // Override with forcePinned
  const effectiveState = forcePinned ? "pinned" : scrollState;

  const style: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    willChange: "transform",
    transition: "transform 200ms ease-in-out",
    transform:
      effectiveState === "unpinned"
        ? "translateY(calc(-100% + 10px))" // Keep small ripped edge peek
        : "translateY(0)",
  };

  return {
    state: effectiveState,
    style,
    className: `headroom headroom--${effectiveState}`,
  };
}
