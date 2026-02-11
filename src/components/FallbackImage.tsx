"use client";

import Image from "next/image";
import {useState} from "react";

interface FallbackImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  fill?: boolean;
  className?: string;
  fallbackClassName?: string;
}

export function FallbackImage({
  src,
  fallbackSrc,
  alt,
  fill,
  className,
  fallbackClassName,
}: FallbackImageProps) {
  const [errored, setErrored] = useState(false);
  const useFallback = errored && fallbackSrc;
  const activeSrc = useFallback ? fallbackSrc : src;
  const activeClass = useFallback ? (fallbackClassName ?? className) : className;

  return (
    <Image
      src={activeSrc}
      alt={alt}
      fill={fill}
      className={activeClass}
      onError={() => {
        if (!errored) setErrored(true);
      }}
    />
  );
}
