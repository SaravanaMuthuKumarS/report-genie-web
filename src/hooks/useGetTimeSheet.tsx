import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AppContextType, TimeSheet } from "../types/appTypes";
import { ApiService } from "../service/ApiService";
import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";

export default function useGetTimeSheet(
): UseQueryResult<TimeSheet[]> {
  const { setTimeSheet } = useContext<AppContextType>(AppContext);
  return useQuery({
    staleTime: 5000,
    gcTime:6000,
    queryKey: ["timeSheet"],
    queryFn: async () => {
      return await ApiService.get("/timeSheet").then((response) => {
        setTimeSheet(response.data.entity.timeSheet);
      });
    },
    refetchInterval: 7000,
  });
}