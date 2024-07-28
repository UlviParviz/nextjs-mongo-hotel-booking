import dbConnect from "@/server/config/db.connect";
import { myBookings } from "@/server/controllers/booking.controllers";
import { isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).get(myBookings);

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  const response = await router.run(request, ctx);

  // Ensure that the response is a valid NextResponse object
  if (response instanceof NextResponse) {
    return response;
  }

  // Fallback response if the response type is not as expected
  return NextResponse.json(
    { message: "Unexpected response type" },
    { status: 500 }
  );
}
