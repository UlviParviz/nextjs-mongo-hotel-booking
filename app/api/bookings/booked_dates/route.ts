import dbConnect from "@/server/config/db.connect";
import { getRoomBookedDates } from "@/server/controllers/booking.controllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getRoomBookedDates);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
