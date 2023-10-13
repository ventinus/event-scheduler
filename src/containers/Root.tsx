import { useEffect } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";

import { Header } from "../components";

import { createProfileRequest, fetchProfile } from "../utils/api";
import { useUser } from "../utils/userCtx";
import { useAlert } from "../utils/alertCtx";
import { paths } from "../utils/routes";

import "@aws-amplify/ui-react/styles.css";
import { Profile } from "../API";
import { Container } from "@mui/material";

interface RootProps extends WithAuthenticatorProps {
  id: string;
  email: string;
}

function HomePage({ signOut, id, email }: RootProps) {
  const { profile } = useLoaderData() as { profile: Profile };
  const alert = useAlert();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!profile) {
      createProfileRequest({ id, name: email });
      if (pathname !== paths.profile()) {
        alert.setInfo(
          "Head over to your [profile page](/profile) to finish registration"
        );
      }
    }
  }, [profile]);

  return (
    <>
      <Header onSignOut={signOut} />
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </>
  );
}

export default withAuthenticator(HomePage);
