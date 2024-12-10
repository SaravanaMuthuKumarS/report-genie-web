import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TimeSheet } from "../types/appTypes";
import { ApiService } from "../service/ApiService";

export default function useGetTimeSheet(props: { selectedYear: number, selectedFromMonth: string, selectedToMonth: string, selectedClient: string, selectedProject: string }
): UseQueryResult<TimeSheet[]> {
  return useQuery({
    // staleTime: 500000,
    // gcTime: 600000,
    queryKey: ["timeSheet", props],
    queryFn: async () => {
      const response = await ApiService.post("/timesheets", props );
      console.log(response.data.response.timesheets);
      
      return response.data.response.timesheets;
    },
    // refetchInterval: 700000,
  });
}