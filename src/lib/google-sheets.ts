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
}

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
      .map((row) => ({
        id: row.get("id"),
        active: row.get("active") === "TRUE",
        title: {
          en: row.get("title_en"),
          ja: row.get("title_ja"),
        },
        description: {
          en: row.get("description_en"),
          ja: row.get("description_ja"),
        },
        url: row.get("url"),
        imageUrl: row.get("image_url"),
        category: row.get("category"),
      }))
      .filter((item): item is ResourceItem => item.active && !!item.id); // Type guard
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
      category: "Guide"
    },
    {
      id: "2",
      active: true,
      title: { en: "Vegan Map (Mock)", ja: "ヴィーガンマップ (仮)" },
      description: { en: "Find restaurants near you.", ja: "近くのレストランを探す。" },
      url: "https://example.com/map",
      category: "Map"
    }
  ];
}
