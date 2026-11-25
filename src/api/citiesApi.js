import { apiClient } from "./apiClient";
function getCitiesApi() {
  return apiClient.get("/cities");
}
export {
  getCitiesApi
};
