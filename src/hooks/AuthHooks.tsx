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
