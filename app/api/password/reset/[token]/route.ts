
import dbConnect from "@/server/config/db.connect";
import { resetPassword } from "@/server/controllers/auth.controller";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.put(resetPassword);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}