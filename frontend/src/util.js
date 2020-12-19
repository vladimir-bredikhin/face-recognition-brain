export const request = async (
  url,
  method = "GET",
  body = undefined,
  headers = { "Content-Type": "application/json" }
) => {
  const response = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : body,
    headers,
  });
  return await response.json();
};
