import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export interface ResourceItem {
  id: string;
  active: boolean;
  title: {
    en: string;
    ja: string;
  };
  description: {
    en: string;
    ja: string;
  };
  url: string;
  imageUrl?: string;
  category?: string;
  type?: string; // e.g. "Online Shop", "Supermarket", etc.
  languages: ("en" | "ja")[];
}

type SheetRow = {
  get: (key: string) => unknown;
};

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function getResources(sheetId: string): Promise<ResourceItem[]> {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.warn("Google Sheets credentials missing. Returning mock data.");
    return getMockResources();
  }

  try {
    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    return rows
      .map((row: SheetRow): ResourceItem => {
        const id = row.get("id") as string;
        const active = row.get("active") === "TRUE";
        const titleEn = row.get("title_en") as string;
        const titleJa = row.get("title_ja") as string;
        const descriptionEn = row.get("description_en") as string;
        const descriptionJa = row.get("description_ja") as string;
        const url = row.get("url") as string;
        const imageUrl = row.get("image_url") as string | undefined;
        const category = row.get("category") as string | undefined;
        const type = row.get("type") as string | undefined;

        const languagesRaw = ((row.get("languages") as string | undefined) ?? "")
          .toString()
          .toLowerCase()
          .replace(/\s/g, "");

        let languages: ("en" | "ja")[] = [];

        if (languagesRaw === "en") {
          languages = ["en"];
        } else if (languagesRaw === "ja") {
          languages = ["ja"];
        } else if (languagesRaw === "en,ja" || languagesRaw === "ja,en" || languagesRaw === "bilingual") {
          languages = ["en", "ja"];
        } else {
          if (titleEn) languages.push("en");
          if (titleJa) languages.push("ja");
          if (languages.length === 0) {
            languages = ["en"];
          }
        }

        return {
          id,
          active,
          title: {
            en: titleEn,
            ja: titleJa,
          },
          description: {
            en: descriptionEn,
            ja: descriptionJa,
          },
          url,
          imageUrl,
          category,
          type,
          languages,
        };
      })
      .filter((item) => item.active && !!item.id);
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error);
    return [];
  }
}

function getMockResources(): ResourceItem[] {
  return [
    {
      id: "1",
      active: true,
      title: { en: "Tokyo Vegan Guide (Mock)", ja: "東京ヴィーガンガイド (仮)" },
      description: { en: "A complete guide to vegan living in Tokyo.", ja: "東京でのヴィーガン生活の完全ガイド。" },
      url: "https://example.com",
      category: "Guide",
      languages: ["en", "ja"]
    },
    {
      id: "2",
      active: true,
      title: { en: "Vegan Map (Mock)", ja: "ヴィーガンマップ (仮)" },
      description: { en: "Find restaurants near you.", ja: "近くのレストランを探す。" },
      url: "https://example.com/map",
      category: "Map",
      languages: ["en", "ja"]
    }
  ];
}
