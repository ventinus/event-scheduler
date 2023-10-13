import { CognitoUser } from "amazon-cognito-identity-js";
import atob from "atob";

const groupsKey = "cognito:groups";
interface CognitoAttributes {
  [groupsKey]: string[];
  [key: string]: any;
}

export const getUserGroups = (user?: CognitoUser): string[] => {
  if (!user) {
    console.log("No user provided to get groups");
    return [];
  }

  // @ts-ignore user.storage doesn't exist, but it does
  const { storage } = user;
  const idTokenKey = Object.keys(storage).find((key) =>
    key.includes("idToken")
  );
  const idToken = storage[idTokenKey];

  if (!idToken) {
    console.log(`No idToken found in user.storage with key ${idTokenKey}`);
    return [];
  }

  const attributes: CognitoAttributes = JSON.parse(atob(idToken.split(".")[1]));

  return attributes[groupsKey] || [];
};

export const isManager = (groups: string[]) => groups.includes("Managers");
