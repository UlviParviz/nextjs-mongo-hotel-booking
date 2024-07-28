import dbConnect from "@/server/config/db.connect";
import { getRoomBookedDates } from "@/server/controllers/booking.controllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getRoomBookedDates);

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  const response = await router.run(request, ctx);

  // Ensure that the response is a NextResponse
  if (response instanceof NextResponse) {
    return response;
  }

  // Fallback response if needed
  return NextResponse.json(
    { message: "Unexpected response type" },
    { status: 500 }
  );
}
