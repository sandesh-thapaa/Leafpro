import { NextResponse } from "next/server";
import { connectDB, isDBConnected } from "@/lib/db";

export async function GET() {
  const start = performance.now();

  try {
    if (!isDBConnected()) {
      await connectDB();
    }
  } catch {
    return NextResponse.json(
      {
        status: "degraded",
        db: "disconnected",
        uptime: process.uptime(),
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    status: "ok",
    db: "connected",
    uptime: process.uptime(),
    responseTime: `${Math.round(performance.now() - start)}ms`,
  });
}
