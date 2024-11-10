import React from "react";
import ReactDOM from "react-dom/client";
import CountClicker from "./components/count-clicker/index.tsx";
import "./index.css";
import WebApp from "@twa-dev/sdk";
import { ENVIRONMENTS } from "./constants/index.ts";
import LayoutProvider from "./contexts/layout/index.tsx";
import Layout from "./components/layout/index.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

if (process.env.NODE_ENV === ENVIRONMENTS.DEV) {
  location.hash = "#tgWebAppVersion=7.8";
}
WebApp.ready();

const {
  VITE_APP_DOMAIN,
  VITE_APP_CLIENT_ID,
  VITE_API_AUDIENCE,
  VITE_AUTH_REDIRECT_URL,
} = import.meta.env;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={VITE_APP_DOMAIN}
      clientId={VITE_APP_CLIENT_ID}
      authorizationParams={{
        audience: VITE_API_AUDIENCE,
        redirect_uri: VITE_AUTH_REDIRECT_URL,
      }}
    >
      <LayoutProvider>
        <Layout>
          <CountClicker />
        </Layout>
      </LayoutProvider>
    </Auth0Provider>
  </React.StrictMode>
);
