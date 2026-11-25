import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import {
  createCompanyApi,
  deleteCompanyApi,
  getCompaniesApi,
  updateCompanyApi
} from "@/api/companiesApi";
import { getCitiesApi } from "@/api/citiesApi";
import {
  getTripApi,
  getTripsApi,
  createTripApi,
  updateTripApi,
  deleteTripApi
} from "@/api/tripsApi";
import {
  cancelBookingApi,
  getBookingApi,
  getBookingsApi
} from "@/api/bookingsApi";
import { getUserApi, getUsersApi } from "@/api/usersApi";
const queryKeys = {
  overview: ["overview"],
  cities: ["cities"],
  companies: ["companies"],
  trips: ["trips"],
  trip: (id) => ["trips", id],
  bookings: ["bookings"],
  booking: (id) => ["bookings", id],
  users: ["users"],
  user: (id) => ["users", id]
};
function asArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "object" && value !== null) {
    for (const key of ["data", "items", "results", "rows"]) {
      const inner = value[key];
      if (Array.isArray(inner)) return inner;
    }
  }
  return [];
}
function useCities() {
  return useQuery({
    queryKey: queryKeys.cities,
    queryFn: async () => asArray(await getCitiesApi())
  });
}
function useCompanies() {
  return useQuery({
    queryKey: queryKeys.companies,
    queryFn: async () => asArray(await getCompaniesApi())
  });
}
function useCreateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompanyApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.companies })
  });
}
function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }) => updateCompanyApi(id, dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.companies })
  });
}
function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompanyApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.companies })
  });
}
function useTrips() {
  return useQuery({
    queryKey: queryKeys.trips,
    queryFn: async () => asArray(await getTripsApi())
  });
}
function useTrip(id) {
  return useQuery({
    queryKey: queryKeys.trip(id),
    queryFn: () => getTripApi(id)
  });
}
function useCreateTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTripApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.trips })
  });
}
function useUpdateTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }) => updateTripApi(id, dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.trips })
  });
}
function useDeleteTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTripApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.trips })
  });
}
function useBookings() {
  return useQuery({
    queryKey: queryKeys.bookings,
    queryFn: async () => asArray(await getBookingsApi())
  });
}
function useBooking(id) {
  return useQuery({
    queryKey: queryKeys.booking(id),
    queryFn: () => getBookingApi(id)
  });
}
function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBookingApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.bookings })
  });
}
function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: async () => asArray(await getUsersApi())
  });
}
function useUser(id) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => getUserApi(id)
  });
}
export {
  queryKeys,
  useBooking,
  useBookings,
  useCancelBooking,
  useCities,
  useCompanies,
  useCreateCompany,
  useCreateTrip,
  useDeleteCompany,
  useDeleteTrip,
  useTrip,
  useTrips,
  useUpdateCompany,
  useUpdateTrip,
  useUser,
  useUsers
};
