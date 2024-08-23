import { useUsersFetchContext } from "./useUsersFetchContext";

const useUserList = () => {
  const usersFatchContext = useUsersFetchContext();
  return usersFatchContext.usersFetch;
};

export default useUserList;
