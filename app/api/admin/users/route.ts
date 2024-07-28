import dbConnect from "@/server/config/db.connect";
import { allAdminUsers } from "@/server/controllers/auth.controllers";
import { authorizeRoles, isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminUsers);

export async function GET(request: NextRequest, ctx: RequestContext): Promise<NextResponse> {
  const response = await router.run(request, ctx);
  // Ensure the response is of type NextResponse
  if (response instanceof NextResponse) {
    return response;
  }
  // Fallback if the response is not of type NextResponse
  return NextResponse.json({ message: 'Success' }, { status: 200 });
}
