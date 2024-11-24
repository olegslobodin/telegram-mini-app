import WebApp from "@twa-dev/sdk";
import { CONFIG } from "../constants";

const { VITE_API_URL } = import.meta.env;

interface GetItemResponse {
  error: string | null;
  result?: string;
}

export const tryGetItem = (key: string): Promise<GetItemResponse> => {
  return new Promise<GetItemResponse>((resolve) => {
    let isTimedOut = false;

    WebApp.CloudStorage.getItem(key, (error, result) => {
      if (!isTimedOut) {
        resolve({ error, result });
      }
    });

    setTimeout(() => {
      isTimedOut = true;
      resolve({ error: "tryGetItem - request timeout" });
    }, CONFIG.REQUEST_TIMEOUT);
  });
};

export const checkTelegramAuth = async (initData: string) => {
  debugger;
  const response = await fetch(`${VITE_API_URL}auth/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ initData }),
  });

  return response.ok ? await response.json() : null;
};
