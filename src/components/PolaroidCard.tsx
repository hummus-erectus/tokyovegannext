'use client';

import Image from 'next/image';
import { PaperSurface } from '@/components/PaperSurface';
import { WashiTape } from '@/components/WashiTape';

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
  liftedCorner?: 'none' | 'bottom-left' | 'bottom-right' | 'top-right';
  hover?: boolean | "hinge";
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
  liftedCorner = 'bottom-right',
  hover = false,
}: PolaroidCardProps) {

  const variant = color.includes('green')
    ? 'sakura'
    : color.includes('yellow')
      ? 'indigo'
      : 'emerald';

  const stickyIsRight = stickyPos.includes('-right-');
  const tapePlacement = stickyIsRight ? 'top-left' : 'top-right';
  const tapeRotation = stickyIsRight ? -38 : 38;

  return (
    <div
      className={`relative group ${marginTop} ${rotation}`}
    >
      <WashiTape variant={variant} placement={tapePlacement} rotation={tapeRotation} size="md" />

      {/* Polaroid Card */}
      <PaperSurface
        seed={`polaroid-${image}`}
        variant="polaroid"
        shadow="sm"
        edge="deckle"
        liftedCorner={liftedCorner}
        hover={hover}
        contentClassName="p-4 pb-8"
      >
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
      </PaperSurface>

      {/* Sticky Note Badge */}
      <div className={`absolute ${stickyPos} w-44 md:w-40 z-10 transition duration-300 group-hover:scale-110 group-hover:z-20`}>
        <div className={`sticky-container ${stickyRotation}`}>
          <div className="sticky-outer">
            <div className="sticky-wrapper">
              <div className={`sticky-content ${color} p-4 text-center flex flex-col items-center justify-center shadow-lg min-h-[100px]`}>
                <p className={`font-decorative font-bold text-slate-900 leading-tight ${isJapanese ? "text-2xl" : "text-3xl"}`} style={{ whiteSpace: "pre-wrap" }}>
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
