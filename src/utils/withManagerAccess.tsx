import React from "react";
import { Unauthorized } from "../components";
import { useUser } from "./userCtx";
import Loader from "../components/Loader";

export const withManagerAccess =
  (Component: React.FunctionComponent): React.FunctionComponent =>
  (props: any) => {
    const isManager = useUser();

    if (isManager === undefined) {
      return <Loader />;
    }

    return isManager ? <Component {...props} /> : <Unauthorized />;
  };
