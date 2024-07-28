import Error from "@/app/error";
import UpdateUser from "@/components/admin/UpdateUser";
import { getAuthHeader } from "@/helpers/authHeader";

interface Props {
  params: { id: string };
}

export const metadata = {
  title: "Update User - ADMIN",
};

const getUser = async (id: string) => {
  const authHeader = getAuthHeader();
  const res = await fetch(`${process.env.API_URL}/api/admin/users/${id}`, authHeader);

  if (!res.ok) {
    // Handle non-OK responses
    const errorText = await res.text();
    return { errMessage: errorText };
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    // Handle unexpected content types
    const errorText = await res.text();
    return { errMessage: "Unexpected content type: " + contentType + "\n" + errorText };
  }
};

export default async function UpdateUserPage({ params }: Props) {
  const data = await getUser(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <UpdateUser data={data} />;
}
