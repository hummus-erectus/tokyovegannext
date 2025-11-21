import Link from "next/link";
import Image from "next/image";

interface ResourceCardProps {
  title: string;
  description: string;
  href: string;
  imageUrl?: string;
  icon?: string;
  accentColor?: string; // e.g. "emerald", "amber"
  isExternal?: boolean;
}

export function ResourceCard({
  title,
  description,
  href,
  imageUrl,
  icon = "📄",
  accentColor = "emerald",
  isExternal = true
}: ResourceCardProps) {
  // Map colors to Tailwind classes safely
  const colors: Record<string, { text: string; bg: string; border: string }> = {
    emerald: { text: "text-emerald-700", bg: "from-emerald-50 to-white", border: "shadow-emerald-50 hover:shadow-emerald-200" },
    amber: { text: "text-amber-700", bg: "from-amber-50 to-white", border: "shadow-amber-50 hover:shadow-amber-200" },
    rose: { text: "text-rose-700", bg: "from-rose-50 to-white", border: "shadow-rose-50 hover:shadow-rose-200" },
    blue: { text: "text-blue-700", bg: "from-blue-50 to-white", border: "shadow-blue-50 hover:shadow-blue-200" },
    slate: { text: "text-slate-700", bg: "from-slate-50 to-white", border: "shadow-slate-50 hover:shadow-slate-200" },
  };

  const theme = colors[accentColor] || colors.emerald;
  const Component = isExternal ? "a" : Link;
  const props = isExternal ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <Component
      href={href}
      {...props}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-white/50 bg-linear-to-br ${theme.bg} text-slate-900 shadow-lg ${theme.border} transition hover:-translate-y-1`}
    >
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="flex flex-1 flex-col p-6">
        {!imageUrl && (
          <span className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-2xl ${theme.text}`}>
            {icon}
          </span>
        )}
        
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 flex-1 text-sm text-slate-600">{description}</p>
        
        <span className={`mt-4 text-sm font-semibold ${theme.text}`}>
          {isExternal ? "Visit →" : "Read more →"}
        </span>
      </div>
    </Component>
  );
}
