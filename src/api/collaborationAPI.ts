import { api } from "./api";

export const collaborationApi = {
  inviteCollaborators: (taskId: number | string, usernames: string[]) =>
    api.post(`/collaborations/tasks/${taskId}/invite`, usernames),

  acceptInvitation: (requestId: number | string) =>
    api.post(`/collaborations/requests/${requestId}/accept`),

  rejectInvitation: (requestId: number | string, reason?: string) =>
    api.post(`/collaborations/requests/${requestId}/reject`, null, {
      params: { reason },
    }),

  approveCollaboration: (requestId: number | string) =>
    api.post(`/collaborations/requests/${requestId}/approve`),
};
