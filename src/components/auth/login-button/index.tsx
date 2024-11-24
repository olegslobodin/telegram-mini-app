import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@radix-ui/themes";
import { checkTelegramAuth } from "../../../utils";
import WebApp from "@twa-dev/sdk";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const checkAuth = async () => {
    try {
      debugger;
      const { text } = await checkTelegramAuth(WebApp.initData);

      WebApp.showAlert(`Check auth result: ${text}`);
    } catch (error) {
      WebApp.showAlert(error);
    }
  };

  return (
    <>
      <Button onClick={() => loginWithRedirect()}>Log In</Button>
      <Button onClick={() => checkAuth()}>Check Auth</Button>
    </>
  );
};

export default LoginButton;
