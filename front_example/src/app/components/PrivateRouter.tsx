"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserAuth } from "../hooks/user/useLoginAuth";

const PrivateRoute = () => {
  const router = useRouter();
  const isAuthenticated = useUserAuth();

  useEffect(() => {});

  !isAuthenticated && router.push("login");

  return <></>;
};

export default PrivateRoute;
