import http from "@/utils/http";

export const apiGetUser = () => {
  return http.get("/user");
};
