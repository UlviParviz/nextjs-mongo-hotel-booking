"use client";
import React from "react";
import ButtonLoader from "../layout/ButtonLoader";
import { useFormStatus } from "react-dom";

type Props = {
  text: string;
  className?: string;
};

const SubmitButton = ({ text, className }: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      // className="btn btn-danger form-btn w-100 py-2"
      className={className}
    >
      {pending ? <ButtonLoader /> : text}
    </button>
  );
};

export default SubmitButton;
