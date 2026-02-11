"use client";

import {useEffect, useRef, useState, useCallback} from "react";
import {createPortal} from "react-dom";

type Phase = "closed" | "opening" | "open" | "closing";

interface ModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  children: React.ReactNode;
}

export function Modal({isOpen, onCloseAction, children}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isClient = typeof document !== "undefined";
  const [phase, setPhase] = useState<Phase>("closed");
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // React-safe: adjust state during render based on prop change
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen && phase === "closed") {
      setPhase("opening");
    } else if (!isOpen && (phase === "open" || phase === "opening")) {
      setPhase("closing");
    }
  }

  // Schedule the enter animation after the DOM paints the initial state
  useEffect(() => {
    if (phase !== "opening") return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("open"));
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const handleTransitionEnd = useCallback(() => {
    if (phase === "closing") {
      setPhase("closed");
    }
  }, [phase]);

  const isMounted = phase !== "closed";
  const isVisible = phase === "open";

  useEffect(() => {
    if (!isClient || !isMounted) return;
    const {body} = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isClient, isMounted]);

  useEffect(() => {
    if (!isClient || !isMounted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isClient, isMounted, onCloseAction]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onCloseAction();
    }
  };

  if (!isClient || !isMounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center px-4 py-10"
      onClick={handleBackdropClick}
      onTransitionEnd={handleTransitionEnd}
      role="dialog"
      aria-modal="true"
      style={{
        backgroundColor: isVisible ? "rgba(15, 23, 42, 0.6)" : "rgba(15, 23, 42, 0)",
        backdropFilter: isVisible ? "blur(4px)" : "blur(0px)",
        transition: "background-color 0.35s ease, backdrop-filter 0.35s ease",
      }}
    >
      <div
        style={{
          transform: isVisible
            ? "scale(1) rotate(0deg)"
            : "scale(0.92) rotate(-3deg)",
          opacity: isVisible ? 1 : 0,
          transformOrigin: "top center",
          transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
