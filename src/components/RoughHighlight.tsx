'use client';

import { useEffect, useRef, useState } from 'react';
import { annotate } from 'rough-notation';
import type { RoughAnnotation, RoughAnnotationConfig } from 'rough-notation/lib/model';

interface RoughHighlightProps {
  children: React.ReactNode;
  /** Whether the annotation should be shown. If true, animates in. If false, animates out. */
  show?: boolean;
  /** The type of annotation (e.g., 'highlight', 'underline', 'box', 'crossed-off', etc.) */
  type?: RoughAnnotationConfig['type'];
  /** Color of the annotation */
  color?: string;
  /** Stroke width for lines */
  strokeWidth?: number;
  /** Duration of the animation in milliseconds */
  animationDuration?: number;
  /** Whether to animate in multiple lines sequentially instead of as one block */
  multiline?: boolean;
  /** Additional CSS classes for the wrapper span */
  className?: string;
  /** Trigger show on hover automatically */
  hover?: boolean;
  /** Delay before hiding the annotation on hover out (ms) */
  hideDelay?: number;
}

export function RoughHighlight({
  children,
  show: controlledShow,
  type = 'highlight',
  color = 'rgba(253, 224, 71, 0.4)', // Tailwind yellow-300 with opacity
  strokeWidth = 2,
  animationDuration = 600,
  multiline = false,
  className = '',
  hover = false,
  hideDelay = 0,
}: RoughHighlightProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Determine if we should show based on controlled prop or hover state
  const shouldShow = hover ? isHovered : controlledShow;

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hideDelay > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, hideDelay);
    } else {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    if (!elementRef.current) return;

    // Clean up previous annotation if it exists and config changed
    if (annotationRef.current) {
      annotationRef.current.remove();
    }

    // Create new annotation
    annotationRef.current = annotate(elementRef.current, {
      type,
      color,
      strokeWidth,
      animationDuration,
      multiline,
      iterations: 2, // How many times it draws the sketchy lines (default is 2)
      padding: [0, 4], // Slight padding left/right
    });

    return () => {
      if (annotationRef.current) {
        annotationRef.current.remove();
        annotationRef.current = null;
      }
    };
  }, [type, color, strokeWidth, animationDuration, multiline]);

  // Handle showing/hiding
  useEffect(() => {
    if (!annotationRef.current) return;

    if (shouldShow) {
      annotationRef.current.show();
    } else {
      annotationRef.current.hide();
    }
  }, [shouldShow]);

  return (
    <span
      ref={elementRef}
      className={`inline ${className}`}
      onMouseEnter={hover ? handleMouseEnter : undefined}
      onMouseLeave={hover ? handleMouseLeave : undefined}
    >
      {children}
    </span>
  );
}
