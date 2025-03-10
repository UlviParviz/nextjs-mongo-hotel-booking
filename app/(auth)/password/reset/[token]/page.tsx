import ResetPassword from "@/components/user/ResetPassword";
import React from "react";

export const metadata = {
  title: "Reset Password - Bookly",
};

interface Props {
  params: { token: string };
}

const ResetPasswordPage = ({ params }: Props) => {
  return (
    <div>
      <ResetPassword token={params?.token} />
    </div>
  );
};

export default ResetPasswordPage;
