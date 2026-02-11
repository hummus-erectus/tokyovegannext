"use client";

import {useState, type TransitionEvent, type CSSProperties} from "react";

/**
 * Reusable hook for the 3D paper-lift hover effect.
 * Cards appear taped at the top and lift from the bottom on hover,
 * like peeling a piece of paper off a board.
 */
export function usePaperLift() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName !== "transform") return;
    if (!isHovered) {
      setIsActive(false);
    }
  };

  const containerStyle: CSSProperties = {
    perspective: "800px",
  };

  const cardStyle: CSSProperties = {
    transformStyle: "preserve-3d",
    transformOrigin: "top center",
    transform: isHovered ? "rotateX(8deg)" : "rotateX(0deg)",
    boxShadow: isHovered
      ? "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      : "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
  };

  return {
    isHovered,
    isActive,
    containerProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTransitionEnd: handleTransitionEnd,
      style: containerStyle,
    },
    cardStyle,
  };
}
