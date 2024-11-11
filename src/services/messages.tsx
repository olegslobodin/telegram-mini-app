const { VITE_API_URL } = import.meta.env;

const get = async (url: string, authToken?: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : "",
      "Content-Type": "application/json",
    },
  });

  return response.ok ? await response.json() : null;
};

export interface Message {
  text: string;
}

export const getPublicResource = (): Promise<Message> =>
  get(`${VITE_API_URL}messages/public`);

export const getProtectedResource = (authToken: string): Promise<Message> =>
  get(`${VITE_API_URL}messages/protected`, authToken);

export const getAdminResource = (authToken: string): Promise<Message> =>
  get(`${VITE_API_URL}messages/admin`, authToken);
