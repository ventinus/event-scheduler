import { Outlet } from "react-router-dom";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";

import { Header } from "../components";

import "@aws-amplify/ui-react/styles.css";

function HomePage({ signOut }: WithAuthenticatorProps) {
  return (
    <>
      <Header onSignOut={signOut} />
      <Outlet />
    </>
  );
}

export default withAuthenticator(HomePage);

// {"at_hash":"3KIhjUiWvVLZDFnLjBXhew","sub":"7ee5da75-002a-4365-a62d-53df1c384970","cognito:groups":["us-west-2_9EiQtYD6z_Google"],"email_verified":false,"iss":"https:\/\/cognito-idp.us-west-2.amazonaws.com\/us-west-2_9EiQtYD6z","cognito:username":"google_102613502779525861182","nonce":"6mawJDgf46RyQBLez0V8Q77x5Js9QA6fiH3yWf-q6EaIOF06BWveRj7PCRDg2mhZ-57a3P6Ocwf6nXr3LASq2fgB6GkHX0VoCVYZVZ0SLCSZEwZr4lbAXMLdEXiSNErMo5wLhD_OoFCdXMyJmG5Wkkj6z5GnzG0_47r5YbKVnUM","origin_jti":"bc551b17-853e-4db7-a213-591eb6b77425","aud":"2todpsba6aij4tlrqhein3trrm","identities":[{"userId":"102613502779525861182","providerName":"Google","providerType":"Google","issuer":null,"primary":"true","dateCreated":"1682704282933"}],"token_use":"id","auth_time":1682790684,"exp":1682794284,"iat":1682790684,"jti":"f681320a-54df-4510-8b9d-4f2943261456","email":"jonradgray@gmail.com"}
