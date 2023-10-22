import React, { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { getUserGroups } from "./userUtils";

interface UserContext {
  id: string;
  username: string;
  email: string;
  groups: string[];
  isSignedIn: boolean;
  isManager?: boolean;
}

const initialState = {
  id: "",
  username: "",
  email: "",
  groups: [],
  isSignedIn: false,
  isManager: undefined,
} as UserContext;

const UserCtx = createContext(initialState);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, userSet] = useState(initialState);
  const [hasChecked, hasCheckedSet] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((authUser) => {
        const groups = getUserGroups(authUser);
        userSet({
          groups,
          id: authUser.attributes.sub,
          username: authUser.username,
          email: authUser.attributes.email,
          isSignedIn: true,
          isManager: groups.includes("Managers"),
        });
      })
      .catch((err) => {
        console.log("no current authenticated user", err);
      })
      .finally(() => {
        hasCheckedSet(true);
      });
  }, []);

  if (!hasChecked) return null;

  return <UserCtx.Provider value={user}>{children}</UserCtx.Provider>;
};

export const useUser = () => useContext(UserCtx);
