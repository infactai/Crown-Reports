import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useSalespeople = () => {
  return useQuery({
    queryKey: ["salespeople"],
    queryFn: () => api.getSalespeople(),
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
};
