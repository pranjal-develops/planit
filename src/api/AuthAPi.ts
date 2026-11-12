import type { User } from "../types";
import { api } from "./api";

export interface SearchUserResult {
  id: number;
  username: string;
  pfp?: string;
  firstName?: string;
  lastName?: string;
  banner?: string;
}

export const authApi = {
  login: (data: User) => api.post("/user/login", data),
  register: (data: User) => api.post("/user/register", data),
  refresh: (data: User) => api.post("/user/refresh"),
  getProfile: (username: string) => api.get<User>(`/user/${username}`),
  searchUsers: (username: string) => api.get<SearchUserResult[]>(`/user/search/${username}`),
};