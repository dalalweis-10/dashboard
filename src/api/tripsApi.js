import { apiClient } from "./apiClient";
function getTripsApi() {
  return apiClient.get("/trips");
}
function getTripApi(id) {
  return apiClient.get(`/trips/${id}`);
}
function createTripApi(dto) {
  return apiClient.post("/trips", dto);
}
function updateTripApi(id, dto) {
  return apiClient.patch(`/trips/${id}`, dto);
}
function deleteTripApi(id) {
  return apiClient.delete(`/trips/${id}`);
}
export {
  createTripApi,
  deleteTripApi,
  getTripApi,
  getTripsApi,
  updateTripApi
};
