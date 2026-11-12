import { useState, useCallback } from "react";
import { taskApi } from "../../../api/taskAPI";
import type { SchedulingAssistantResponse } from "../../../types";

export function useSchedulingAssistant() {
  const [data, setData] = useState<SchedulingAssistantResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedule = useCallback(
    async (usernames: string[], from: string, to: string) => {
      if (!usernames.length || !from || !to) return null;
      setIsLoading(true);
      setError(null);

      try {
        const response = await taskApi.getSchedulingAssistant(usernames, from, to);
        setData(response.data);
        return response.data;
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "Failed to load scheduling assistant data";
        setError(msg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    schedules: data?.schedules || [],
    isLoading,
    error,
    fetchSchedule,
  };
}
