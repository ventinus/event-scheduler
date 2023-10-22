import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import "@aws-amplify/ui-react/styles.css";

import { Header } from "../components";

import { createProfileRequest, fetchProfile } from "../utils/api";
import { useUser } from "../utils/userCtx";
import { useAlert } from "../utils/alertCtx";
import { paths } from "../utils/routes";

function Root() {
  const alert = useAlert();
  const { pathname } = useLocation();
  const { id, email, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      fetchProfile(id).then((profile) => {
        if (!profile) {
          createProfileRequest({ id, name: email }).then(() => {
            if (pathname !== paths.profile()) {
              alert.setInfo(
                "Head over to your [profile page](/profile) to finish registration"
              );
            }
          });
        }
      });
    }
  }, [isSignedIn]);

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </>
  );
}

export default Root;
