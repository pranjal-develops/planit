import { useState, useCallback, useEffect } from "react";

export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

type ErrorWithMessage = {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return typeof error === "object" && error !== null;
}


export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const data = await asyncFunction();

      setState({
        data,
        isLoading: false,
        error: null,
      });

      return data;
    } catch (err: unknown) {
      const errorMessage =
        isErrorWithMessage(err)
          ? err.response?.data?.message || err.message
          : "An unexpected error occurred";

      setState({
        data: null,
        isLoading: false,
        error: errorMessage,
      });

      throw err;
    }

  }, [asyncFunction]);

  useEffect(() => {
    if (!immediate) return;

    const timeoutId = setTimeout(() => {
      execute().catch(() => { });
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [execute, immediate]);

  return {
    ...state,
    refetch: execute,
  };
}
