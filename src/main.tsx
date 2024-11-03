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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="smart-inc.eu.auth0.com"
      clientId="mGRIysGyaqGc7w5MtFf5eiYw8tTrVGuF"
      authorizationParams={{
        redirect_uri: window.location.origin,
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
