import React, { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { getUserGroups } from "./userUtils";

interface UserContext {
  id: string;
  email: string;
  groups: string[];
  isManager?: boolean;
}

const initialState = {
  id: "",
  email: "",
  groups: [],
  isManager: undefined,
} as UserContext;

const UserCtx = createContext(initialState);

// TODO: use better type for children
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, userSet] = useState(initialState);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((authUser) => {
        const groups = getUserGroups(authUser);
        userSet({
          groups,
          id: authUser.attributes.sub,
          email: authUser.attributes.email,
          isManager: groups.includes("Managers"),
        });
      })
      .catch((err) => {
        console.log("error getting current authenticated user", err);
      });
  }, []);

  if (!user.id) return null;

  return <UserCtx.Provider value={user}>{children}</UserCtx.Provider>;
};

export const useUser = () => useContext(UserCtx);
