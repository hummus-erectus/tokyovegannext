'use client';

import { useEffect, useRef, useState } from 'react';
import { annotate } from 'rough-notation';
import type { RoughAnnotation, RoughAnnotationConfig } from 'rough-notation/lib/model';

interface RoughHighlightProps {
  children: React.ReactNode;
  /** Whether the annotation should be shown (controlled mode). */
  show?: boolean;
  /** The type of annotation (e.g., 'highlight', 'underline', 'box', 'crossed-off', 'circle') */
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
  /** Trigger mode: 'hover' triggers on mouse enter, 'visible' triggers when scrolled into view */
  trigger?: 'hover' | 'visible' | 'none';
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
  trigger = 'none',
  hideDelay = 0,
}: RoughHighlightProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Determine if we should show based on controlled prop or trigger state
  const shouldShow =
    trigger === 'hover' ? isHovered :
    trigger === 'visible' ? isVisible :
    controlledShow;

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

  // Intersection Observer for 'visible' trigger
  useEffect(() => {
    if (trigger !== 'visible' || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: unobserve after showing once?
          // observer.unobserve(entry.target);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '0px 0px -50px 0px' // Slightly trigger before it hits the bottom
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [trigger]);

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
      padding: [2, 4], // Slight padding
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
      onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
      onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
    >
      {children}
    </span>
  );
}
