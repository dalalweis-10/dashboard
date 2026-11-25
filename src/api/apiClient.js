const API_BASE_URL = "https://sairna.abdulrahman-hares.com/api/v1/dashboard";
const TOKEN_STORAGE_KEY = "sairna-auth-token";
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
function getStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}
function setStoredToken(token) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}
function clearStoredToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}
const STATUS_MESSAGES = {
  400: "\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u0633\u0644\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629\u060C \u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u062A\u0647\u0627 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",
  401: "\u0627\u0646\u062A\u0647\u062A \u0627\u0644\u062C\u0644\u0633\u0629 \u0623\u0648 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629\u060C \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0646 \u062C\u062F\u064A\u062F.",
  403: "\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0642\u064A\u0627\u0645 \u0628\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621.",
  404: "\u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F.",
  500: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."
};
function extractMessage(payload) {
  if (!payload) return null;
  if (typeof payload === "string") return payload;
  if (typeof payload === "object") {
    const record = payload;
    if (typeof record.message === "string") return record.message;
    if (Array.isArray(record.message) && record.message.length > 0) {
      return record.message.filter((m) => typeof m === "string").join("\u060C ");
    }
    if (typeof record.error === "string") return record.error;
  }
  return null;
}
async function request(method, path, options = {}) {
  const { body, auth = true } = options;
  const headers = {
    "Content-Type": "application/json"
  };
  if (auth) {
    const token = getStoredToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== void 0 ? JSON.stringify(body) : void 0
    });
  } catch {
    throw new ApiError("\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645\u060C \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B.", 0);
  }
  if (response.status === 204) {
    return void 0;
  }
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  if (!response.ok) {
    const serverMessage = extractMessage(payload);
    if (response.status === 401 && auth) {
      clearStoredToken();
      window.dispatchEvent(new Event("sairna:unauthorized"));
    }
    throw new ApiError(
      serverMessage ?? STATUS_MESSAGES[response.status] ?? "\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.",
      response.status
    );
  }
  if (payload && typeof payload === "object" && "data" in payload) {
    const record = payload;
    if (Array.isArray(record.data) || record.data === null || typeof record.data !== "object" || ("id" in record.data || "data" in record.data)) {
      return record.data;
    }
  }
  return payload;
}
const apiClient = {
  get(path, auth = true) {
    return request("GET", path, { auth });
  },
  post(path, body, auth = true) {
    return request("POST", path, { body, auth });
  },
  patch(path, body, auth = true) {
    return request("PATCH", path, { body, auth });
  },
  delete(path, auth = true) {
    return request("DELETE", path, { auth });
  }
};
export {
  ApiError,
  apiClient,
  clearStoredToken,
  getStoredToken,
  setStoredToken
};
