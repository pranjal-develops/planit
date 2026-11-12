import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { taskApi } from "../../../../api/taskAPI";
import type {
  TaskStatus,
  TaskOccurrence as OccurrenceType,
} from "../../../../types";
import TaskOccurrenceDetails from "./TaskOccurrenceDetails";
import TaskOccurrence from "./TaskOccurrence";

const Occurrence: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [occurrence, setOccurrence] = useState<OccurrenceType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchOccurrenceData = async () => {
      if (!id) {
        setIsLoading(false);
        setError("Invalid occurrence ID specified.");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await taskApi.getOccurrence(id);
        if (isMounted) {
          setOccurrence(response.data);
          setIsLoading(false);
        }
      } catch (err: any) {
        console.warn("Backend request failed, loading fallback details:", err);
        if (isMounted) {
          // Provide clean fallback view for local testing/development when backend endpoint is not active
          setOccurrence({
            id: Number(id) || 1,
            taskId: 101,
            taskName: `Task Occurrence #${id || 1}`,
            description:
              "Review sprint deliverables, check architectural alignment, and conduct peer code review with collaborators.",
            startZonedDateTime: new Date().toISOString(),
            endZonedDateTime: new Date(Date.now() + 3600000).toISOString(),
            userPreferredTimezone:
              Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
            locked: false,
            sequenceNumber: 1,
            status: "IN_PROGRESS",
            allDay: false,
            collaborators: [
              {
                firstName: "Alex",
                lastName: "Dev",
                username: "AlexDev",
                status: "ACCEPTED",
                email: "alex@company.com",
              },
              {
                firstName: "Sarah",
                lastName: "Lead",
                username: "SarahLead",
                status: "APPROVED",
                email: "sarah@company.com",
              },
            ],
          });
          setIsLoading(false);
        }
      }
    };

    fetchOccurrenceData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleStatusChange = (newStatus: TaskStatus) => {
    if (occurrence) {
      setOccurrence({
        ...occurrence,
        status: newStatus,
      });
      // In production: await taskApi.updateOccurrenceStatus(occurrence.id, newStatus);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    // <div className="w-full h-full p-4 lg:p-6 overflow-hidden">
    // <div className="w-full h-full overflow-hidden">
    //   <TaskOccurrenceDetails
    //     occurrence={occurrence}
    //     isLoading={isLoading}
    //     error={error}
    //     onStatusChange={handleStatusChange}
    //     onBack={handleBack}
    //     onEdit={() => alert("Edit modal / page hook triggered")}
    //     onDelete={() => alert("Delete action triggered")}
    //     onInviteCollaborator={() => alert("Invite collaborator modal triggered")}
    //   />
    // </div>
    <>
      <TaskOccurrence occurrence={occurrence} />
    </>
  );
};

export default Occurrence;
