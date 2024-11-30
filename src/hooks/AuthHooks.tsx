import { useMutation } from "@tanstack/react-query";
import { ApiService } from "../service/ApiService";

export default function useLogin() {
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      return await ApiService.post("/auth/login", {
        username,
        password,
      }).then((response) => {
        localStorage.setItem("accessToken", response.data.entity.accessToken);
      });
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: async ({ 
      fullName, 
      password,
      mailId, 
      projects, 
      isFinance
    } :
    {
      fullName: string;
      password: string;
      mailId: string;
      projects: {id:string}[];
      isFinance: boolean;
    }) => {
      return await ApiService.post("/auth/signup", {
        fullName,
        password,
        mailId,
        projects,
        isFinance
      }).then((response) => {
        localStorage.setItem("accessToken", response.data.entity.accessToken);
      }); 
    },
  });
}
