import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Client } from "../types/appTypes";
import { ApiService } from "../service/ApiService";

export default function useGetClients(
): UseQueryResult<Client[]> {
  return useQuery({
    // staleTime: 500000,
    // gcTime:600000,
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await ApiService.get("/clients");
      return response.data.response.clients;
    },
    // refetchInterval: 700000,
  });
}