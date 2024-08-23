"use client";

import { createContext, useState } from "react";
import { UserResponseAPI } from "../types/user";

type IUser = {
  user: UserResponseAPI | null;
  setUser: React.Dispatch<React.SetStateAction<UserResponseAPI | null>>;
};

export const UserContext = createContext<IUser>({
  user: null,
  setUser: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserResponseAPI | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
