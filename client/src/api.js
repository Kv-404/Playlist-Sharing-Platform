const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export function getToken() {
  return localStorage.getItem("token");
}

export async function api(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error("Cannot reach the server. Start the API and try again.");
  }

  const data = await response.json().catch(() => ({}));
  if (response.status === 401 && auth && token) {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth:logout"));
  }
  if (!response.ok || data.success === false) {
    const error = new Error(data.message || "Request failed");
    error.status = response.status;
    throw error;
  }
  return data.data;
}
