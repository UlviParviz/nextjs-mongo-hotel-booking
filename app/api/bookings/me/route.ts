import dbConnect from "@/server/config/db.connect";
import { myBookings } from "@/server/controllers/booking.controllers";
import { isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).get(myBookings);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
