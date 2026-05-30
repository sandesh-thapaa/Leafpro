import { NextResponse } from "next/server";

interface ApiMeta {
  timestamp: string;
  requestId: string;
}

function generateMeta(): ApiMeta {
  return {
    timestamp: new Date().toISOString(),
    requestId: `leaf-${crypto.randomUUID().slice(0, 8)}`,
  };
}

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      error: null,
      meta: generateMeta(),
    },
    { status }
  );
}

export function errorResponse(
  error: string,
  status = 400,
  code?: string
) {
  return NextResponse.json(
    {
      success: false,
      data: null,
      error,
      code: code ?? status.toString(),
      meta: generateMeta(),
    },
    { status }
  );
}
