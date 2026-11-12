import React from "react";
import StatusBox from "./StatusBox";
import { IoMdCheckboxOutline } from "react-icons/io";
import { useTimeFilter } from "../../hooks/useTimeFilter";

interface StatusSectionProps {
  taskCounts?: {
    toDo: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    overdue: number;
  };
}

// const StatusSection: React.FC<StatusSectionProps> = ({ taskCounts }) => {
const StatusSection: React.FC<StatusSectionProps> = () => {

    const { taskCounts } = useTimeFilter();
  return (
    <div className="w-full grid gap-4 grid-cols-2 md:grid-cols-4">
      <StatusBox
        icon={<IoMdCheckboxOutline />}
        count={taskCounts?.toDo ?? 0}
        status="To do"
      />
      <StatusBox
        icon={<IoMdCheckboxOutline />}
        count={taskCounts?.inProgress ?? 0}
        status="In progress"
      />
      <StatusBox
        icon={<IoMdCheckboxOutline />}
        count={taskCounts?.completed ?? 0}
        status="Completed"
      />
      <StatusBox
        icon={<IoMdCheckboxOutline />}
        count={taskCounts?.overdue ?? 0}
        status="Overdue"
      />
    </div>
  );
};

export default StatusSection;