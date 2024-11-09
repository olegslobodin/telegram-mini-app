import React from "react";
import ReactDOM from "react-dom/client";
import CountClicker from "./components/count-clicker/index.tsx";
import "./index.css";
import WebApp from "@twa-dev/sdk";
import { AUTH0, ENVIRONMENTS } from "./constants/index.ts";
import LayoutProvider from "./contexts/layout/index.tsx";
import Layout from "./components/layout/index.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

if (process.env.NODE_ENV === ENVIRONMENTS.DEV) {
  location.hash = "#tgWebAppVersion=7.8";
}
WebApp.ready();

const redirectUrl = `${window.location.origin}${window.location.pathname}`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0.APP_DOMAIN}
      clientId={AUTH0.APP_CLIENT_ID}
      authorizationParams={{
        audience: AUTH0.API_AUDIENCE,
        redirect_uri: redirectUrl,
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
