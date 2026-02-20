import {FallbackImage} from "@/components/FallbackImage";
import {type ReactNode} from "react";

type PolaroidCoverProps = {
  title: string;
  imageUrl?: string;
  fallbackImage?: string;
  reverse: boolean;
};

function PolaroidCover({title, imageUrl, fallbackImage, reverse}: PolaroidCoverProps) {
  const src = imageUrl || fallbackImage;
  if (!src) return null;

  return (
    <div className="relative shrink-0 mx-auto md:mx-0 md:self-start">
      {/* Tape/clip at the top */}
      <div className="tape-top-center" />

      {/* Polaroid-style frame */}
      <div
        className="relative bg-white p-3 pb-6 shadow-lg"
        style={{
          transform: reverse ? "rotate(2deg)" : "rotate(-2deg)",
        }}
      >
        <div className="relative w-36 h-52 md:w-44 md:h-64 overflow-hidden bg-slate-100">
          <FallbackImage
            src={src}
            fallbackSrc={fallbackImage}
            alt={title}
            fill
            className="object-cover"
            fallbackClassName="object-contain p-2"
          />
        </div>
      </div>
    </div>
  );
}

type IndexCardProps = {
  title: string;
  reverse: boolean;
  /** Content rendered between the header and description (e.g. language badges, author) */
  meta?: ReactNode;
  children: ReactNode;
  /** Action button rendered at bottom-right */
  action: ReactNode;
};

function IndexCard({title, reverse, meta, children, action}: IndexCardProps) {
  return (
    <div
      className="relative w-full flex-1 min-w-0"
      style={{
        transform: reverse ? "rotate(-1deg)" : "rotate(1deg)",
      }}
    >
      {/* Tape decorations */}
      <div className="pointer-events-none absolute right-2 top-2 z-20 h-7 w-28 origin-center rotate-40 rounded-sm bg-amber-200/70 shadow-sm overflow-hidden" />
      <div className="pointer-events-none absolute bottom-2 left-2 z-20 h-7 w-28 origin-center rotate-40 rounded-sm bg-amber-200/70 shadow-sm overflow-hidden" />

      <div
        className="relative overflow-hidden bg-white shadow-md font-mono"
        style={{
          backgroundImage:
            "repeating-linear-gradient(#ffffff, #ffffff 25px, #9198e5 26px, #9198e5 27px)",
          backgroundPosition: "0 34px",
        }}
      >
        <header
          className="relative z-10 h-9"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff, #ffffff 33px, #f9a8d4 35px, #f9a8d4 36px)",
          }}
        >
          <span className="relative left-3 top-2 text-xl md:text-2xl font-bold text-slate-900">
            {title}
          </span>
        </header>

        <div className="relative z-10 px-5 pb-6 pt-7">
          {meta}
          {children}
          <div className="mt-5 flex justify-end">
            {action}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface MediaListItemProps {
  title: string;
  description: string;
  imageUrl?: string;
  /** Shown inside the polaroid when imageUrl is missing */
  fallbackImage?: string;
  reverse?: boolean;
  /** Content rendered between the header and description (e.g. language badges, author) */
  meta?: ReactNode;
  /** Action button rendered at bottom-right */
  action: ReactNode;
}

export function MediaListItem({
  title,
  description,
  imageUrl,
  fallbackImage,
  reverse = false,
  meta,
  action,
}: MediaListItemProps) {
  return (
    <div
      className={`w-full flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-6 md:gap-10 items-center md:items-start`}
    >
      <PolaroidCover title={title} imageUrl={imageUrl} fallbackImage={fallbackImage} reverse={reverse} />
      <IndexCard title={title} reverse={reverse} meta={meta} action={action}>
        <p className="text-slate-800 text-[15px] md:text-base leading-[27px] whitespace-pre-line">
          {description}
        </p>
      </IndexCard>
    </div>
  );
}
