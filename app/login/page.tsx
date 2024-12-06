"use client";

import { useSession } from "next-auth/react";
import Login from "@/components/login/Login";
import Loading from "@/components/common/Loading";

const LoginPage = () => {
    const { status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return <Login />
};

export default LoginPage;