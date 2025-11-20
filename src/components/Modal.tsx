"use client";

import {useEffect, useRef} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  children: React.ReactNode;
}

export function Modal({isOpen, onCloseAction, children}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isClient = typeof document !== "undefined";

  useEffect(() => {
    if (!isClient || !isOpen) return;
    const {body} = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isClient, isOpen]);

  useEffect(() => {
    if (!isClient || !isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isClient, isOpen, onCloseAction]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onCloseAction();
    }
  };

  if (!isClient || !isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/70 px-4 py-10 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>,
    document.body
  );
}
