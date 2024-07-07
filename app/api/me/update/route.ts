import dbConnect from "@/server/config/db.connect";
import { updateProfile } from "@/server/controllers/auth.controllers";
import { allRooms, newRoom } from "@/server/controllers/room.controllers";
import { isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();


router.use(isAuthenticatedUser).put(updateProfile);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

