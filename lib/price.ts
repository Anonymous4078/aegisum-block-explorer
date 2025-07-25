import { z } from "zod";

// Cache duration in milliseconds (20 minutes)
const cacheDuration = 20 * 60 * 1000;

type PriceCache = {
  price: string;
  timestamp: number;
};

let priceCache: PriceCache | null = null;

// Zod schema to validate API response
const TickerResponseSchema = z.object({
  ask: z.string(),
  bid: z.string(),
  high: z.string(),
  initialprice: z.string(),
  low: z.string(),
  price: z.string(),
  success: z.boolean(),
  volume: z.string(),
});

function updateCache(price: string) {
  priceCache = {
    price,
    timestamp: Date.now(),
  };
}

export async function getAegsPrice(): Promise<string> {
  // Check if cache is valid
  const cached = priceCache; // capture snapshot

  if (cached && Date.now() - cached.timestamp < cacheDuration) {
    return cached.price;
  }

  let latestPrice: string | null = null;

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
      latestPrice = data.price;
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error("Error fetching AEGS price:", error);
  }

  if (latestPrice) {
    updateCache(latestPrice);
    return latestPrice;
  }
  
    // If fetch fails, try to use old cached data even if expired
    if (cached) {
      return cached.price;
    }

    // Default fallback value if everything fails
    return "0.000000";
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
