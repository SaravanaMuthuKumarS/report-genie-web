import { useMutation } from "@tanstack/react-query";
import { ApiService } from "../service/ApiService";
import { useContext } from "react";
import { AuthContextType } from "../types/appTypes";
import { AuthContext } from "../context/AuthContextProvider";

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
        localStorage.setItem("accessToken", response.data.response.token);
        localStorage.setItem("role", response.data.response.isFinance);
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
      return await ApiService.post("/auth/register", {
        fullName,
        password,
        mailId,
        projects,
        isFinance
      }).then((response) => {
        localStorage.setItem("role", response.data.response.isFinance);
        localStorage.setItem("accessToken", response.data.response.token);
      }); 
    },
  });
}
