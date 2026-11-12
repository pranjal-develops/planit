import { useState, useCallback } from "react";
import { taskApi } from "../../../api/taskAPI";
import type { TaskCreateRequest } from "../../../types";

export function useTaskMutations() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTask = useCallback(async (data: TaskCreateRequest) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await taskApi.createTask(data);
      return response.data;
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to create task";
      setError(msg);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const deleteTask = useCallback(async (id: string | number) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await taskApi.deleteTask(id);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to delete task";
      setError(msg);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const rescheduleOccurrence = useCallback(
    async (occurrenceId: string | number, newStart: string, newEnd: string) => {
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await taskApi.rescheduleOccurrence(occurrenceId, newStart, newEnd);
        return response.data;
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "Failed to reschedule task";
        setError(msg);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return {
    createTask,
    deleteTask,
    rescheduleOccurrence,
    isSubmitting,
    error,
  };
}
