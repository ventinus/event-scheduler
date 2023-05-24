import { Link } from "react-router-dom";
import { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { Button } from "@mui/material";

import { paths } from "../utils/routes";

interface HeaderProps {
  onSignOut: WithAuthenticatorProps["signOut"];
}

function Header({ onSignOut }: HeaderProps) {
  return (
    <>
      <Button onClick={onSignOut}>Sign out</Button>
      <Link to={paths.events()}>Go to events</Link>
    </>
  );
}

export default Header;
