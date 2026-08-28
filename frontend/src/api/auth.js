const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/auth";
const AUTH_STORAGE_KEY = "codeops_auth";

async function requestAuth(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.detail || data.message || "Authentication failed";
    throw new Error(message);
  }

  return data;
}

export function login(payload) {
  return requestAuth("/login", payload);
}

export function signup(payload) {
  return requestAuth("/signup", payload);
}

export function saveAuthSession(data) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token: data.access_token,
      user: data.user,
    }),
  );
  window.dispatchEvent(new Event("auth-change"));
}

export function getAuthSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAuthSession()?.token);
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("auth-change"));
}
