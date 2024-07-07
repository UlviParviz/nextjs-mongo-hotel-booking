import dbConnect from "@/server/config/db.connect";
import { forgotPassword } from "@/server/controllers/auth.controllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(forgotPassword);

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
