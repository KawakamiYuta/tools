export const styles = {
  container: "w-full",

  header: {
    wrapper: "flex items-center justify-between mb-3",
    title: "text-lg font-semibold",
    meta: "flex items-center gap-3",
    count: "text-sm text-gray-600",
  },

  empty: "text-sm text-gray-500",

  tableWrapper: "border rounded-md overflow-hidden",

  table: "w-full text-sm border border-gray-200 [border-collapse:collapse]",
  thead: "bg-gray-50",
  th: "px-3 py-2 text-left font-medium border border-gray-200 cursor-pointer select-none",
  thContent: "flex items-center gap-1",
//   td: "px-3 py-2 border border-gray-200",
  th: "px-3 py-2 border border-gray-400",
td: "px-3 py-2 border border-gray-400",

  descriptionCell: "flex items-center gap-2 max-w-full",
  descriptionText: "truncate",

  rangeText: "text-gray-500",
  durationText: "text-right font-semibold",

  pagination: "flex items-center justify-between p-2",
  paginationText: "text-sm text-gray-600",
};
