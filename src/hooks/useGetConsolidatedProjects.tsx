import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AppContextType, Project } from "../types/appTypes";
import { ApiService } from "../service/ApiService";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";

export default function useGetConsolidatedProjects(
): UseQueryResult<Project[]> {
  const { setConsolidatedProjects } = useContext<AppContextType>(AppContext);
  return useQuery({
    staleTime: 5000,
    gcTime:6000,
    queryKey: ["consolidatedProjects"],
    queryFn: async () => {
      return await ApiService.get("/projects/consolidated").then((response) => {
        setConsolidatedProjects(response.data.response.projects);
      });
    },
    refetchInterval: 7000,
  });
}