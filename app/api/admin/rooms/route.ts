import dbConnect from "@/server/config/db.connect";
import { allAdminRooms, newRoom } from "@/server/controllers/room.controllers";
import { authorizeRoles, isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).post(newRoom);
router.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminRooms);

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
