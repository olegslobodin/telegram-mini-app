import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@radix-ui/themes";

const { VITE_LOG_OUT_URL } = import.meta.env;

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() => logout({ logoutParams: { returnTo: VITE_LOG_OUT_URL } })}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
