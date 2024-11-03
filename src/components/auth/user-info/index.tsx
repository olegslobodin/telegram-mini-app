import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../logout-button";
import LoginButton from "../login-button";

const AuthInfo = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading auth data...</div>;
  }

  return isAuthenticated ? (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <LogoutButton />
      </div>
    )
  ) : (
    <LoginButton />
  );
};

export default AuthInfo;
