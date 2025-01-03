import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Project } from "../types/appTypes";
import { ApiService } from "../service/ApiService";

export default function useGetProjects(
): UseQueryResult<Project[]> {
  return useQuery({
    // staleTime: 500000,
    // gcTime:600000,
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await ApiService.get("/projects");
      return response.data.response.projects;
    },
    // refetchInterval: 700000,
  });
}