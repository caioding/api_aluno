import { UserContext } from "@/app/state/UserProvider";
import { useContext } from "react";

export const useUserContext = () => {
  return useContext(UserContext);
};
