import dbConnect from "@/server/config/db.connect";
import { deleteRoom, updateRoom } from "@/server/controllers/room.controllers";
import { authorizeRoles, isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateRoom);
router.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteRoom);

export async function PUT(
  request: NextRequest,
  ctx: RequestContext
): Promise<Response> {
  const response = await router.run(request, ctx);
  if (response instanceof Response) {
    return response;
  } else {
    return new Response(null, { status: 200 });
  }
}

export async function DELETE(
  request: NextRequest,
  ctx: RequestContext
): Promise<Response> {
  const response = await router.run(request, ctx);
  if (response instanceof Response) {
    return response;
  } else {
    return new Response(null, { status: 200 });
  }
}
