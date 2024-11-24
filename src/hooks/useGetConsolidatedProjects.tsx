import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Project } from "../types/appTypes";

export default function useGetConsolidatedProjects(
): UseQueryResult<Project[]> {
  return useQuery({
    staleTime: 5000,
    gcTime:6000,
    queryKey: ["projects"],
    queryFn: async () => {
      return await fetch("").then(
        (response) => response.json()
      );
    },
    refetchInterval: 7000,
  });
}