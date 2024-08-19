import { useUserContext } from "./useUserContext";

export const useUserAuth = () => {
  const useUser = useUserContext();

  return !!useUser.user?.nome;
};
