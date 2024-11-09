const apiServerUrl = "http://localhost:6060";

const get = async (url: string, authToken?: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : "",
      "Content-Type": "application/json",
    },
  });

  return response.ok ? await response.json() : null;
};

export const getPublicResource = () =>
  get(`${apiServerUrl}/api/messages/public`);

export const getProtectedResource = (authToken: string) =>
  get(`${apiServerUrl}/api/messages/protected`, authToken);

export const getAdminResource = (authToken: string) =>
  get(`${apiServerUrl}/api/messages/admin`, authToken);
