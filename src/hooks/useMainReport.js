import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useMainReport = () => {
  return useQuery({
    queryKey: ["mainReport"],
    queryFn: () => api.getMainReport(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
