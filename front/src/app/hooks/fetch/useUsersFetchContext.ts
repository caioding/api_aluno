import { UsersFetchContext } from "@/app/state/UsersFetchProvider";
import { useContext } from "react";

export const useUsersFetchContext = () => {
  return useContext(UsersFetchContext);
};
