function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function asNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) return Number(value);
  return null;
}
function extractOverview(data) {
  const root = isRecord(data) && isRecord(data.data) ? data.data : isRecord(data) ? data : {};
  const revenueRaw = root.totalRevenue ?? root.revenue ?? root.totalIncome ?? root.income ?? null;
  const revenueNum = asNumber(revenueRaw);
  const revenueStr = typeof revenueRaw === "string" ? revenueRaw : revenueNum !== null ? String(revenueNum) : null;
  return {
    revenue: revenueStr,
    activeTrips: asNumber(root.activeTrips ?? root.tripsCount ?? root.trips),
    todayPassengers: asNumber(root.todayPassengers ?? root.passengersToday ?? root.passengers),
    fleetAvailability: asNumber(root.fleetAvailability ?? root.fleetAvailabilityRate)
  };
}
function buildDashboardData(overview, trips, bookings, users) {
  const bookingActivity = bookings.slice(0, 6).map((b) => {
    const user = users.find((u) => u.id === b.userId);
    return {
      id: `booking-${b.id}`,
      type: "booking",
      message: `\u062D\u062C\u0632 #${b.id} \u0628\u0648\u0627\u0633\u0637\u0629 ${user?.name ?? "\u0645\u0633\u062A\u062E\u062F\u0645"} \u2014 ${b.seatsCount} \u0645\u0642\u0627\u0639\u062F`,
      time: b.createdAt ? new Date(b.createdAt).toLocaleString("ar-SA") : ""
    };
  });
  return {
    stats: extractOverview(overview),
    recentTrips: trips.slice(0, 5),
    activity: bookingActivity
  };
}
export {
  buildDashboardData
};
