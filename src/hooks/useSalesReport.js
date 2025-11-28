import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useSalesReport = (salespersonName) => {
  return useQuery({
    queryKey: ["salesReport", salespersonName],
    queryFn: () => api.getSalesReport(salespersonName),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!salespersonName, // Only run if salesperson is selected
    retry: 2,
  });
};
