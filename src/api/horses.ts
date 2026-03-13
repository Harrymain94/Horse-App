import { apiClient } from "./client";
import type { Horse, CreateHorseRequest, UpdateHorseRequest } from "../types/horse";

export const horseApi = {
  getHorses(): Promise<Horse[]> {
    return apiClient.get("/horse");
  },

  getHorse(id: number): Promise<Horse> {
    return apiClient.get(`/horse/${id}`);
  },

  createHorse(data: CreateHorseRequest): Promise<{ id: number }> {
    return apiClient.put("/horse", data);
  },

  updateHorse(id: number, data: UpdateHorseRequest): Promise<Horse> {
    return apiClient.put(`/horse/${id}`, data);
  },
};