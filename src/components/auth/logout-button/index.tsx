import { useAuth0 } from "@auth0/auth0-react";

const { VITE_LOG_OUT_URL } = import.meta.env;

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: VITE_LOG_OUT_URL } })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
