import dbConnect from "@/server/config/db.connect";
import { uploadAvatar } from "@/server/controllers/auth.controller";
import { isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(uploadAvatar);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
