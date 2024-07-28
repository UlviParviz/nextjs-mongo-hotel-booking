import dbConnect from "@/server/config/db.connect";
import { getSalesStats } from "@/server/controllers/booking.controllers";
import { authorizeRoles, isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(getSalesStats);

export async function GET(request: NextRequest, ctx: RequestContext): Promise<void | Response> {
  const response = await router.run(request, ctx);
  
  // Ensure the response is valid
  if (response instanceof Response) {
    return response;
  }

  // Return a default response if the controller does not return a Response
  return new Response(null, { status: 200 });
}
