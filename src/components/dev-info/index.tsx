import WebApp from "@twa-dev/sdk";

export const DevInfo = () => (
  <>
    <div>API version: {WebApp.version}</div>
    <div>Env: {process.env.NODE_ENV}</div>
  </>
);
