'use client';

import Image from 'next/image';

interface PolaroidCardProps {
  title: string;
  stickyLabel: string;
  image: string;
  color: string;
  rotation: string;
  marginTop: string;
  stickyPos: string;
  stickyRotation: string;
  titleClass: string;
  isJapanese: boolean;
}

export function PolaroidCard({
  title,
  stickyLabel,
  image,
  color,
  rotation,
  marginTop,
  stickyPos,
  stickyRotation,
  titleClass,
  isJapanese,
}: PolaroidCardProps) {
  return (
    <div
      className={`relative group ${marginTop} ${rotation} transition-transform duration-300`}
    >
      {/* Polaroid Card containing Tape */}
      <div className="relative bg-white p-4 pb-8 shadow-xl shadow-slate-300/60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
        {/* Tape Element */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-24">
          <div className="tape-section">
            <div className="tape-top-center" />
          </div>
        </div>

        <div className="relative aspect-square w-full overflow-hidden bg-slate-100 mt-2">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 33vw, 300px"
            />
        </div>
        <div className="mt-4 text-center">
            <h3 className={titleClass}>
              <span className="polaroid-title-highlight px-1">{title}</span>
            </h3>
        </div>
      </div>

      {/* Sticky Note Badge */}
      <div className={`absolute ${stickyPos} w-44 md:w-40 z-10 transition duration-300 group-hover:scale-110 group-hover:z-20`}>
        <div className={`sticky-container ${stickyRotation}`}>
          <div className="sticky-outer">
            <div className="sticky-wrapper">
              <div className={`sticky-content ${color} p-4 text-center flex flex-col items-center justify-center shadow-lg min-h-[100px]`}>
                <p className={`font-hand font-bold text-slate-900 leading-tight ${isJapanese ? "text-2xl" : "text-3xl"}`} style={{ whiteSpace: "pre-wrap" }}>
                  {stickyLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
