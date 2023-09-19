import React, { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { getUserGroups } from "./userUtils";

interface UserContext {
  groups: string[];
  isManager?: boolean;
}

const initialState = {
  groups: [],
  isManager: undefined,
} as UserContext;

const UserCtx = createContext(initialState);

// TODO: use better type for children
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, userSet] = useState(initialState);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      const groups = getUserGroups(user);
      userSet({
        groups,
        isManager: groups.includes("Managers"),
      });
    });
  }, []);

  return <UserCtx.Provider value={user}>{children}</UserCtx.Provider>;
};

export const useUser = () => useContext(UserCtx);
