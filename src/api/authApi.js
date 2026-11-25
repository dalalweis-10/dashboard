import { apiClient, clearStoredToken, getStoredToken, setStoredToken } from "./apiClient";
function loginApi(email, password) {
  return apiClient.post("/auth/login", { email, password }, false);
}
function getMeApi() {
  return apiClient.get("/auth/me");
}
export {
  clearStoredToken,
  getMeApi,
  getStoredToken,
  loginApi,
  setStoredToken
};
