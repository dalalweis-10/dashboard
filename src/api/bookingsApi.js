import { apiClient } from "./apiClient";
function getBookingsApi() {
  return apiClient.get("/bookings");
}
function getBookingApi(id) {
  return apiClient.get(`/bookings/${id}`);
}
function cancelBookingApi(id) {
  return apiClient.post(`/bookings/${id}/cancel`);
}
export {
  cancelBookingApi,
  getBookingApi,
  getBookingsApi
};
