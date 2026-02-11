import {MediaListItem} from "@/components/MediaListItem";
import {PaperButton} from "@/components/PaperButton";

export interface MovieListItemProps {
  title: string;
  description: string;
  href: string;
  imageUrl?: string;
  locale?: "en" | "ja";
  reverse?: boolean;
}

function getStreamingService(url: string):
  | "YouTube"
  | "Netflix"
  | "Prime Video"
  | "Hulu"
  | "Disney+"
  | "Apple TV"
  | "Vimeo"
  | undefined {
  try {
    const host = new URL(url).hostname.toLowerCase();

    if (host.includes("youtube.com") || host.includes("youtu.be")) return "YouTube";
    if (host.includes("netflix.com")) return "Netflix";
    if (host.includes("primevideo.com") || host.includes("amazon.")) return "Prime Video";
    if (host.includes("hulu.com")) return "Hulu";
    if (host.includes("disneyplus.com")) return "Disney+";
    if (host.includes("tv.apple.com") || host.includes("apple.com")) return "Apple TV";
    if (host.includes("vimeo.com")) return "Vimeo";

    return undefined;
  } catch {
    return undefined;
  }
}

export function MovieListItem({
  title,
  description,
  href,
  imageUrl,
  locale = "en",
  reverse = false,
}: MovieListItemProps) {
  const isJaPage = locale === "ja";
  const service = getStreamingService(href);
  const tiltClass = reverse ? "-rotate-2" : "rotate-2";
  const counterTiltClass = reverse ? "rotate-2" : "-rotate-2";

  const watchLabel = isJaPage
    ? service
      ? `${service}で見る`
      : "視聴する"
    : service
      ? `Watch on ${service}`
      : "Watch";

  const action = (
    <PaperButton
      href={href}
      type="external"
      variant="sticker"
      color="yellow"
      size="sm"
      className={`px-4 py-2 font-bold shadow-md origin-center ${tiltClass}`}
    >
      <span className={`inline-block origin-center ${counterTiltClass}`}>
        {watchLabel}
      </span>
    </PaperButton>
  );

  return (
    <MediaListItem
      title={title}
      description={description}
      imageUrl={imageUrl}
      fallbackImage="/images/placeholder-movie.svg"
      reverse={reverse}
      action={action}
    />
  );
}
