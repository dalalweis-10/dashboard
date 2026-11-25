import { apiClient } from "./apiClient";
function getOverviewApi() {
  return apiClient.get("/overview");
}
export {
  getOverviewApi
};
