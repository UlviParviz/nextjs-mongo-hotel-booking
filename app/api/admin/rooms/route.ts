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

export async function POST(request: NextRequest, ctx: RequestContext): Promise<void | Response> {
  const response = await router.run(request, ctx);
  if (response instanceof Response) {
    return response;
  } else {
    return new Response(null, { status: 200 });
  }
}

export async function GET(request: NextRequest, ctx: RequestContext): Promise<void | Response> {
  const response = await router.run(request, ctx);
  if (response instanceof Response) {
    return response;
  } else {
    return new Response(null, { status: 200 });
  }
}
