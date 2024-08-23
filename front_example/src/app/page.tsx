"use client";

import { useRouter } from "next/navigation";
import { useUserAuth } from "./hooks/user/useLoginAuth";

const Home = () => {
  const userAuth = useUserAuth();

  const router = useRouter();

  if (!userAuth) return router.push("/login");
  return router.push("/usuario");
};

export default Home;
