import api from "./../services/api";

export const fethData = async () => {
  return await api.get("/api/account/profile");
}
