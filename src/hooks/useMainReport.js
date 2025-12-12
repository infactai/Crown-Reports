import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useMainReport = (period, value) => {
  return useQuery({
    queryKey: ["mainReport", period, value],
    queryFn: () => api.getMainReport(period, value),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    enabled: !!period && !!value,
  });
};
