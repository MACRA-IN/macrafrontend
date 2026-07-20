export const getStatusBadge = (status) => {
  switch (status) {
    case "scheduled":
      return { text: "Scheduled", className: "bg-yellow-100 text-yellow-700" };
    case "preparing":
      return { text: "Preparing", className: "bg-orange-100 text-orange-700" };
    case "out_for_delivery":
      return { text: "Out for Delivery", className: "bg-blue-100 text-blue-700" };
    case "delivered":
      return { text: "Delivered", className: "bg-emerald-100 text-emerald-700" };
    case "paused":
      return { text: "Paused", className: "bg-amber-100 text-amber-700" };
    default:
      return { text: "Upcoming", className: "bg-gray-100 text-gray-600" };
  }
};
