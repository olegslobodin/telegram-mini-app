import WebApp from "@twa-dev/sdk";
import { CONFIG } from "../constants";

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
