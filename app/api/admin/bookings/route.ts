import dbConnect from "@/server/config/db.connect";
import { allAdminBookings } from "@/server/controllers/booking.controllers";
import { authorizeRoles, isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminBookings);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
