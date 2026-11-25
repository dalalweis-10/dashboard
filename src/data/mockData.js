
const stats = [
  { id: "revenue", label: "إجمالي الإيرادات", value: "٤٨٢٬٥٠٠ ر.س", change: "+١٢٫٥٪", trend: "up", icon: "wallet" },
  { id: "trips", label: "الرحلات النشطة", value: "١٤", change: "+٣", trend: "up", icon: "route" },
  { id: "passengers", label: "عدد الركاب اليوم", value: "٣٢٧", change: "+٨٫٢٪", trend: "up", icon: "users" },
  { id: "fleet", label: "معدل إتاحة الأسطول", value: "٨٩٪", change: "-٢٪", trend: "down", icon: "truck" }
];

const weeklyRevenue = [
  { day: "السبت", value: 62e3 },
  { day: "الأحد", value: 71e3 },
  { day: "الإثنين", value: 58e3 },
  { day: "الثلاثاء", value: 83e3 },
  { day: "الأربعاء", value: 76e3 },
  { day: "الخميس", value: 91e3 },
  { day: "الجمعة", value: 41500 }
];

const trips = [
  { id: "TRP-2401", route: "دمشق → حلب", driver: "أحمد الخطيب", vehicle: "دمشق ٤٥٢١", passengers: 42, status: "in-progress", date: "٢٠٢٦/١١/١٥", revenue: 8400 },
  { id: "TRP-2402", route: "دمشق → حمص", driver: "محمد العلي", vehicle: "دمشق ٧٧٨٨", passengers: 28, status: "completed", date: "٢٠٢٦/١١/١٥", revenue: 5600 },
  { id: "TRP-2403", route: "حلب → اللاذقية", driver: "سامر الحسن", vehicle: "حلب ١٢٣٤", passengers: 35, status: "scheduled", date: "٢٠٢٦/١١/١٦", revenue: 4200 },
  { id: "TRP-2404", route: "حمص → طرطوس", driver: "محمود إبراهيم", vehicle: "حمص ٩٩٠٠", passengers: 18, status: "completed", date: "٢٠٢٦/١١/١٤", revenue: 2700 },
  { id: "TRP-2405", route: "دمشق → درعا", driver: "ياسر الأحمد", vehicle: "دمشق ٤٥٦٧", passengers: 22, status: "cancelled", date: "٢٠٢٦/١١/١٤", revenue: 0 },
  { id: "TRP-2406", route: "حماة → حلب", driver: "فراس مصطفى", vehicle: "حماة ٣٣٤٤", passengers: 31, status: "in-progress", date: "٢٠٢٦/١١/١٥", revenue: 4650 },
  { id: "TRP-2407", route: "اللاذقية → طرطوس", driver: "عمر درويش", vehicle: "اللاذقية ٨٨٢١", passengers: 15, status: "scheduled", date: "٢٠٢٦/١١/١٦", revenue: 1800 },
  { id: "TRP-2408", route: "دمشق → إدلب", driver: "نزار صالح", vehicle: "دمشق ٦٦٥٥", passengers: 38, status: "completed", date: "٢٠٢٦/١١/١٣", revenue: 6200 }
];

const drivers = [
  { id: "DRV-001", name: "أحمد الخطيب", phone: "+963 944 123 456", license: "نقل ثقيل - ١٢٣٤٥", status: "active", trips: 342, rating: 4.8, joinDate: "٢٠٢٣/٠٣/١٥" },
  { id: "DRV-002", name: "محمد العلي", phone: "+963 933 234 567", license: "نقل ثقيل - ٢٣٤٥٦", status: "active", trips: 298, rating: 4.6, joinDate: "٢٠٢٣/٠٥/٢٢" },
  { id: "DRV-003", name: "سامر الحسن", phone: "+963 988 345 678", license: "نقل ثقيل - ٣٤٥٦٧", status: "off-duty", trips: 187, rating: 4.9, joinDate: "٢٠٢٢/١١/٠٨" },
  { id: "DRV-004", name: "محمود إبراهيم", phone: "+963 944 456 789", license: "نقل ثقيل - ٤٥٦٧٨", status: "active", trips: 256, rating: 4.5, joinDate: "٢٠٢٣/٠١/١٢" },
  { id: "DRV-005", name: "ياسر الأحمد", phone: "+963 933 567 890", license: "نقل ثقيل - ٥٦٧٨٩", status: "on-leave", trips: 203, rating: 4.3, joinDate: "٢٠٢٣/٠٧/٠١" },
  { id: "DRV-006", name: "فراس مصطفى", phone: "+963 988 678 901", license: "نقل ثقيل - ٦٧٨٩٠", status: "active", trips: 312, rating: 4.7, joinDate: "٢٠٢٢/٠٩/١٥" },
  { id: "DRV-007", name: "عمر درويش", phone: "+963 944 789 012", license: "نقل ثقيل - ٧٨٩٠١", status: "active", trips: 145, rating: 4.4, joinDate: "٢٠٢٤/٠٢/٢٠" },
  { id: "DRV-008", name: "نزار صالح", phone: "+963 933 890 123", license: "نقل ثقيل - ٨٩٠١٢", status: "off-duty", trips: 278, rating: 4.8, joinDate: "٢٠٢٣/٠٤/٠٣" }
];

const vehicles = [
  { id: "VHC-001", plate: "دمشق ٤٥٢١", model: "مرسيدس ترافيلر ٢٠٢٤", capacity: 49, status: "active", lastService: "٢٠٢٦/١٠/٢٨", mileage: 42500 },
  { id: "VHC-002", plate: "دمشق ٧٧٨٨", model: "تويوتا كوستر ٢٠٢٣", capacity: 30, status: "active", lastService: "٢٠٢٦/١١/٠٢", mileage: 38200 },
  { id: "VHC-003", plate: "حلب ١٢٣٤", model: "مرسيدس ترافيلر ٢٠٢٤", capacity: 49, status: "maintenance", lastService: "٢٠٢٦/١١/١٠", mileage: 51000 },
  { id: "VHC-004", plate: "حمص ٩٩٠٠", model: "تويوتا هايس ٢٠٢٣", capacity: 15, status: "active", lastService: "٢٠٢٦/١٠/١٥", mileage: 28700 },
  { id: "VHC-005", plate: "دمشق ٤٥٦٧", model: "مرسيدس ترافيلر ٢٠٢٣", capacity: 35, status: "idle", lastService: "٢٠٢٦/٠٩/٢٨", mileage: 45300 },
  { id: "VHC-006", plate: "حماة ٣٣٤٤", model: "تويوتا كوستر ٢٠٢٤", capacity: 30, status: "active", lastService: "٢٠٢٦/١١/٠٥", mileage: 18900 },
  { id: "VHC-007", plate: "اللاذقية ٨٨٢١", model: "تويوتا هايس ٢٠٢٢", capacity: 15, status: "active", lastService: "٢٠٢٦/١٠/٢٠", mileage: 62100 },
  { id: "VHC-008", plate: "دمشق ٦٦٥٥", model: "مرسيدس ترافيلر ٢٠٢٤", capacity: 49, status: "maintenance", lastService: "٢٠٢٦/١١/١٢", mileage: 34500 }
];

const bookings = [
  { id: "BKG-9001", customer: "محمد دياب", phone: "+963 944 111 223", route: "دمشق → حلب", date: "٢٠٢٦/١١/١٦", seats: 2, amount: 400, status: "confirmed", payment: "paid" },
  { id: "BKG-9002", customer: "أحمد منصور", phone: "+963 933 222 334", route: "دمشق → حمص", date: "٢٠٢٦/١١/١٦", seats: 1, amount: 200, status: "confirmed", payment: "paid" },
  { id: "BKG-9003", customer: "فادي سليمان", phone: "+963 988 333 445", route: "حلب → اللاذقية", date: "٢٠٢٦/١١/١٧", seats: 3, amount: 360, status: "pending", payment: "unpaid" },
  { id: "BKG-9004", customer: "عبد الرحمن خليل", phone: "+963 944 444 556", route: "حمص → طرطوس", date: "٢٠٢٦/١١/١٦", seats: 1, amount: 150, status: "confirmed", payment: "paid" },
  { id: "BKG-9005", customer: "بشار الحسين", phone: "+963 933 555 667", route: "دمشق → درعا", date: "٢٠٢٦/١١/١٥", seats: 4, amount: 480, status: "cancelled", payment: "refunded" },
  { id: "BKG-9006", customer: "يوسف مراد", phone: "+963 988 666 778", route: "حماة → حلب", date: "٢٠٢٦/١١/١٧", seats: 2, amount: 300, status: "confirmed", payment: "paid" },
  { id: "BKG-9007", customer: "مروان عثمان", phone: "+963 944 777 889", route: "دمشق → إدلب", date: "٢٠٢٦/١١/١٨", seats: 1, amount: 200, status: "pending", payment: "unpaid" },
  { id: "BKG-9008", customer: "رامي ديب", phone: "+963 933 888 990", route: "اللاذقية → طرطوس", date: "٢٠٢٦/١١/١٦", seats: 2, amount: 240, status: "completed", payment: "paid" }
];

const customers = [
  { id: "CUS-001", name: "محمد دياب", phone: "+963 944 111 223", email: "m.diab@example.com", trips: 24, totalSpent: 9600, lastTrip: "٢٠٢٦/١١/١٠", status: "active" },
  { id: "CUS-002", name: "أحمد منصور", phone: "+963 933 222 334", email: "a.mansour@example.com", trips: 18, totalSpent: 7200, lastTrip: "٢٠٢٦/١١/٠٨", status: "active" },
  { id: "CUS-003", name: "فادي سليمان", phone: "+963 988 333 445", email: "f.suleiman@example.com", trips: 31, totalSpent: 12400, lastTrip: "٢٠٢٦/١١/١٢", status: "active" },
  { id: "CUS-004", name: "عبد الرحمن خليل", phone: "+963 944 444 556", email: "a.khalil@example.com", trips: 7, totalSpent: 2100, lastTrip: "٢٠٢٦/١٠/٢٨", status: "inactive" },
  { id: "CUS-005", name: "بشار الحسين", phone: "+963 933 555 667", email: "b.hussein@example.com", trips: 15, totalSpent: 5400, lastTrip: "٢٠٢٦/١١/٠٥", status: "active" },
  { id: "CUS-006", name: "يوسف مراد", phone: "+963 988 666 778", email: "y.murad@example.com", trips: 42, totalSpent: 16800, lastTrip: "٢٠٢٦/١١/١٤", status: "active" },
  { id: "CUS-007", name: "مروان عثمان", phone: "+963 944 777 889", email: "m.othman@example.com", trips: 3, totalSpent: 600, lastTrip: "٢٠٢٦/٠٩/٢٠", status: "inactive" },
  { id: "CUS-008", name: "رامي ديب", phone: "+963 933 888 990", email: "r.deeb@example.com", trips: 12, totalSpent: 4320, lastTrip: "٢٠٢٦/١١/٠١", status: "active" }
];

const recentActivity = [
  { id: "1", type: "booking", message: "حجز جديد: محمد دياب - دمشق → حلب", time: "قبل ١٢ دقيقة" },
  { id: "2", type: "trip", message: "اكتملت الرحلة TRP-2402: دمشق → حمص", time: "قبل ٣٤ دقيقة" },
  { id: "3", type: "payment", message: "تم استلام دفعة ٤٠٠ ر.س من أحمد منصور", time: "قبل ساعة" },
  { id: "4", type: "vehicle", message: "المركبة حلب ١٢٣٤ دخلت الصيانة الدورية", time: "قبل ساعتين" },
  { id: "5", type: "driver", message: "السائق سامر الحسن أنهى مناوبته", time: "قبل ٣ ساعات" },
  { id: "6", type: "booking", message: "إلغاء حجز BKG-9005: دمشق → درعا", time: "قبل ٤ ساعات" }
];

export {
  bookings,
  customers,
  drivers,
  recentActivity,
  stats,
  trips,
  vehicles,
  weeklyRevenue
};
