import { z } from "zod";

// Cache duration in milliseconds (20 minutes)
const cacheDuration = 20 * 60 * 1000;

type PriceCache = {
  price: string;
  timestamp: number;
};

type TickerResponse = {
  success: boolean;
  initialprice: string;
  price: string;
  high: string;
  low: string;
  volume: string;
  bid: string;
  ask: string;
};

let priceCache: PriceCache | null = null;

// Zod schema to validate API response
const TickerResponseSchema = z.object({
  success: z.boolean(),
  initialprice: z.string(),
  price: z.string(),
  high: z.string(),
  low: z.string(),
  volume: z.string(),
  bid: z.string(),
  ask: z.string(),
});

export async function getAegsPrice(): Promise<string> {
  // Check if cache is valid
  if (priceCache && Date.now() - priceCache.timestamp < CACHE_DURATION) {
    return priceCache.price;
  }

  try {
    // Cache is expired or doesn't exist, fetch new data
    const response = await fetch(
      "https://tradeogre.com/api/v1/ticker/AEGS-USDT",
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Aegisum-Explorer/1.0",
        },
        // Use Next.js cache
        next: { revalidate: cacheDuration / 1000 },
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const json: unknown = await response.json();
    const parsed = TickerResponseSchema.safeParse(json);

    if (!parsed.success) {
      throw new Error("Invalid TickerResponse format");
    }

    const { data } = parsed;

    if (data.success && data.price) {
      // Update cache
      priceCache = {
        price: data.price,
        timestamp: Date.now(),
      };
      return data.price;
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error("Error fetching AEGS price:", error);

    // If fetch fails, try to use old cached data even if expired
    if (priceCache) {
      return priceCache.price;
    }

    // Default fallback value if everything fails
    return "0.000000";
  }
}

// Helper function to calculate USD value from AEGS amount
export function calculateUsdValue(
  aegsAmount: number,
  aegsPrice: string,
): string {
  const price = Number.parseFloat(aegsPrice);
  const usdValue = aegsAmount * price;
  // Round to 2 decimal places (pennies)
  return usdValue.toFixed(2);
}
