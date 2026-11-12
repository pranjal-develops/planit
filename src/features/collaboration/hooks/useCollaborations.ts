import { useState, useCallback } from "react";
import { collaborationApi } from "../../../api/collaborationAPI";

export function useCollaborations() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inviteCollaborators = useCallback(async (taskId: number | string, usernames: string[]) => {
    setIsProcessing(true);
    setError(null);
    try {
      await collaborationApi.inviteCollaborators(taskId, usernames);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to invite collaborators");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const acceptInvitation = useCallback(async (requestId: number | string) => {
    setIsProcessing(true);
    setError(null);
    try {
      await collaborationApi.acceptInvitation(requestId);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to accept invitation");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const rejectInvitation = useCallback(async (requestId: number | string, reason?: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      await collaborationApi.rejectInvitation(requestId, reason);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to reject invitation");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const approveCollaboration = useCallback(async (requestId: number | string) => {
    setIsProcessing(true);
    setError(null);
    try {
      await collaborationApi.approveCollaboration(requestId);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to approve collaboration");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    inviteCollaborators,
    acceptInvitation,
    rejectInvitation,
    approveCollaboration,
    isProcessing,
    error,
  };
}
