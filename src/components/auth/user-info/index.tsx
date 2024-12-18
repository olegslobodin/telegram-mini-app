import { useAuth0 } from "@auth0/auth0-react";
import { Button, Text } from "@radix-ui/themes";
import WebApp from "@twa-dev/sdk";
import LogoutButton from "../logout-button";
import LoginButton from "../login-button";
import {
  getAdminResource,
  getProtectedResource,
  getPublicResource,
} from "../../../services/messages";
import { LayoutContext } from "../../../contexts/layout";
import { useContext, useState } from "react";

const UserInfo = () => {
  const { user, isLoading } = useAuth0();
  const {
    state: { isAuthenticated, authToken },
  } = useContext(LayoutContext);
  const [message, setMessage] = useState("");
  const [isFetchingMessage, setIsFetchingMessage] = useState(false);

  if (isLoading) {
    return <div>Loading auth data...</div>;
  }

  const fetchResource = async (
    handler:
      | typeof getPublicResource
      | typeof getProtectedResource
      | typeof getAdminResource
  ) => {
    try {
      setIsFetchingMessage(true);
      const data = await handler(authToken!, WebApp.initData);
      setMessage(data.text);
    } catch (error) {
      console.log("Error fetching message");
      console.log(error);
    } finally {
      setIsFetchingMessage(false);
    }
  };

  return (
    <>
      {isAuthenticated && user ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}

      <div>
        <Button
          onClick={() => fetchResource(getPublicResource)}
          variant="soft"
          loading={isFetchingMessage}
        >
          Fetch public data
        </Button>
        <Button
          onClick={() => fetchResource(getProtectedResource)}
          variant="soft"
          loading={isFetchingMessage}
        >
          Fetch protected data
        </Button>
        <Button
          onClick={() => fetchResource(getAdminResource)}
          variant="soft"
          loading={isFetchingMessage}
        >
          Fetch admin data
        </Button>
      </div>
      <Text>{message}</Text>
    </>
  );
};

export default UserInfo;
