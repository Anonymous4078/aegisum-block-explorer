import { type NextRequest, NextResponse } from "next/server";
import { rpcCall } from "@/lib/data";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  try {
    // Get client IP
    const ip: string =
      request.ip ??
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown";

    // Apply rate limiting (60 requests per minute)
    if (!rateLimit(ip, 60, 60000)) {
      return new NextResponse("Rate limit exceeded", {
        status: 429,
        headers: {
          "Content-Type": "text/plain",
          "Retry-After": "60",
        },
      });
    }

    const difficulty = await rpcCall<number>("getdifficulty");

    return new NextResponse(difficulty, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=30",
      },
    });
  } catch (error) {
    console.error("Error in difficulty API route:", error);

    return new NextResponse("0.0000000000", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
