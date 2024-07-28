import dbConnect from "@/server/config/db.connect";
import { registerUser } from "@/server/controllers/auth.controllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(registerUser);

export async function POST(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  const response = await router.run(request, ctx);

  // Ensure that the response is a NextResponse
  if (response instanceof NextResponse) {
    return response;
  }

  // Fallback if the response is not of type NextResponse
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
