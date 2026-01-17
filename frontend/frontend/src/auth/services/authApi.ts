import api from "../../services/api";

// Send login data to backend
export const loginApi = (data: any) => {
  return api.post("/login", data);
};
