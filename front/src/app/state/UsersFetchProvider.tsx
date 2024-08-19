"use client";

import { createContext, useState } from "react";
import { UserResponseAPI } from "../types/user";

type Users = {
  usersFetch: UserResponseAPI[] | null;
  setUserFetch: React.Dispatch<React.SetStateAction<UserResponseAPI[] | null>>;
};

export const UsersFetchContext = createContext<Users>({
  usersFetch: null,
  setUserFetch: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UsersFetchProvider = ({ children }: UserProviderProps) => {
  const [usersFetch, setUserFetch] = useState<UserResponseAPI[] | null>(null);

  return (
    <UsersFetchContext.Provider value={{ usersFetch, setUserFetch }}>
      {children}
    </UsersFetchContext.Provider>
  );
};

export default UsersFetchProvider;
