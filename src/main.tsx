import "@radix-ui/themes/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import CountClicker from "./components/count-clicker/index.tsx";
import WebApp from "@twa-dev/sdk";
import LayoutProvider from "./contexts/layout/index.tsx";
import Layout from "./components/layout/index.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Theme, ThemePanel } from "@radix-ui/themes";

const {
  DEV,
  VITE_APP_DOMAIN,
  VITE_APP_CLIENT_ID,
  VITE_API_AUDIENCE,
  VITE_AUTH_REDIRECT_URL,
} = import.meta.env;

if (DEV) {
  location.hash = "#tgWebAppVersion=7.8";
}
WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={VITE_APP_DOMAIN}
      clientId={VITE_APP_CLIENT_ID}
      authorizationParams={{
        audience: VITE_API_AUDIENCE,
        redirect_uri: VITE_AUTH_REDIRECT_URL,
      }}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <Theme>
        <LayoutProvider>
          <Layout>
            {DEV && <ThemePanel />}
            <CountClicker />
          </Layout>
        </LayoutProvider>
      </Theme>
    </Auth0Provider>
  </React.StrictMode>
);
