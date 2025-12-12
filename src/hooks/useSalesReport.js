import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useSalesReport = (salespersonName, period, value) => {
  return useQuery({
    queryKey: ["salesReport", salespersonName, period, value],
    queryFn: () => api.getSalesReport(salespersonName, period, value),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!salespersonName && !!period && !!value,
    retry: 2,
  });
};
