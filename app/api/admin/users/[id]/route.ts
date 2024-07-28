import dbConnect from "@/server/config/db.connect";
import {
  deleteUser,
  getUserDetails,
  updateUser,
} from "@/server/controllers/auth.controllers";
import { authorizeRoles, isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin"));

router.get(getUserDetails);
router.put(updateUser);
router.delete(deleteUser);

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<void | NextResponse> {
  const response = await router.run(request, ctx);
  if (response instanceof NextResponse) {
    return response;
  }
  return NextResponse.json({ message: "Success" }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  ctx: RequestContext
): Promise<void | NextResponse> {
  const response = await router.run(request, ctx);
  if (response instanceof NextResponse) {
    return response;
  }
  return NextResponse.json({ message: "Success" }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  ctx: RequestContext
): Promise<void | NextResponse> {
  const response = await router.run(request, ctx);
  if (response instanceof NextResponse) {
    return response;
  }
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
