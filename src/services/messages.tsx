const { VITE_API_URL } = import.meta.env;

const get = async (url: string, authToken?: string, initData?: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : "",
      "Content-Type": "application/json",
      "Telegram-Authorization": initData ?? "",
    },
  });

  return response.ok ? await response.json() : null;
};

export interface Message {
  text: string;
}

export const getPublicResource = (): Promise<Message> =>
  get(`${VITE_API_URL}messages/public`);

export const getProtectedResource = (
  authToken: string,
  initData: string
): Promise<Message> =>
  get(`${VITE_API_URL}messages/protected`, authToken, initData);

export const getAdminResource = (
  authToken: string,
  initData: string
): Promise<Message> =>
  get(`${VITE_API_URL}messages/admin`, authToken, initData);
