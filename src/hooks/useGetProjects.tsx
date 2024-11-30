import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AppContextType, Project } from "../types/appTypes";
import { ApiService } from "../service/ApiService";
import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";

export default function useGetProjects(
): UseQueryResult<Project[]> {
  const { setProjects } = useContext<AppContextType>(AppContext);
  return useQuery({
    staleTime: 5000,
    gcTime:6000,
    queryKey: ["projects"],
    queryFn: async () => {
      return await ApiService.get("/projects").then((response) => {
        setProjects(response.data.entity.projects);
      });
    },
    refetchInterval: 7000,
  });
}