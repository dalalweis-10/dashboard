import { apiClient } from "./apiClient";
function getCompaniesApi() {
  return apiClient.get("/companies");
}
function createCompanyApi(dto) {
  return apiClient.post("/companies", dto);
}
function updateCompanyApi(id, dto) {
  return apiClient.patch(`/companies/${id}`, dto);
}
function deleteCompanyApi(id) {
  return apiClient.delete(`/companies/${id}`);
}
export {
  createCompanyApi,
  deleteCompanyApi,
  getCompaniesApi,
  updateCompanyApi
};
