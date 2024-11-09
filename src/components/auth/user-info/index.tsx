import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../logout-button";
import LoginButton from "../login-button";
import {
  getAdminResource,
  getProtectedResource,
  getPublicResource,
} from "../../../services/messages";
import { LayoutContext } from "../../../contexts/layout";
import { useContext } from "react";

const UserInfo = () => {
  const { user, isLoading } = useAuth0();
  const {
    state: { isAuthenticated, authToken },
  } = useContext(LayoutContext);

  if (isLoading) {
    return <div>Loading auth data...</div>;
  }

  const fetchResource = async (handler: Function) => {
    const data = await handler(authToken);

    console.log("Fetched message:");
    console.log(JSON.stringify(data));
  };

  return isAuthenticated ? (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={() => fetchResource(getPublicResource)}>
          Fetch public data
        </button>
        <button onClick={() => fetchResource(getProtectedResource)}>
          Fetch protected data
        </button>
        <button onClick={() => fetchResource(getAdminResource)}>
          Fetch admin data
        </button>
        <LogoutButton />
      </div>
    )
  ) : (
    <LoginButton />
  );
};

export default UserInfo;
