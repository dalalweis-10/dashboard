import { apiClient } from "./apiClient";
function getUsersApi() {
  return apiClient.get("/users");
}
function getUserApi(id) {
  return apiClient.get(`/users/${id}`);
}
export {
  getUserApi,
  getUsersApi
};
