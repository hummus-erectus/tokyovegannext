import {notFound} from "next/navigation";

// Catch-all so unknown paths render the localized not-found page inside the site layout
export default function CatchAllPage() {
  notFound();
}
