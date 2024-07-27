import dbConnect from "@/server/config/db.connect";
import { uploadRoomImages } from "@/server/controllers/room.controllers";
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

router.use(isAuthenticatedUser, authorizeRoles("admin")).put(uploadRoomImages);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
