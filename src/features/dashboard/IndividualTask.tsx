import type React from "react";
import type { TaskOccurrence } from "../../types";
import { NavLink } from "react-router";
import { SiTicktick } from "react-icons/si";
import { taskApi } from "../../api/taskAPI";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
// import CollaboratorPopout from "../collaboration/components/CollaboratorPopout";

type IndividualTaskProps = {
  task: TaskOccurrence;
};

const IndividualTask: React.FC<IndividualTaskProps> = ({task}) => {
  const formattedDate = new Date(task.startZonedDateTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedStartTime = new Date(task.startZonedDateTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedEndTime = new Date(task.endZonedDateTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const {timeframe} = useSelector((state: RootState) => state.task);
  const [isComplete, setisComplete] = useState(task.complete)
  const handleComplete = async () => {    
    try {
      await taskApi.completeOccurrence(task.id);
      setisComplete(!isComplete)
    } catch (err) {
      console.warn("Error completing the task: ", err);
    }
  };

  return (
    <div className="relative full bg-(--secondary-bg) px-4 py-2 rounded-lg flex flex-row items-center justify-between my-2 border border-(--primary-border)">
      <div className={`absolute left-0 h-full w-0.5 bg-green-400`} />
      <div className="flex flex-row items-center gap-5">
        <button onClick={handleComplete} className={` hover:text-green-500 ${isComplete ? "text-green-500" : ""}`}>
          <SiTicktick />
        </button>
        <NavLink to={`/occurrence/${task.id}`} className="cursor-pointer">
          {task.taskName}
        </NavLink>
      </div>
      <div className="text-(--secondary-text) flex justify-center items-center">
        {/* <CollaboratorPopout collaborators={task.collaborators} /> */}
        {/* {task.status} */}
        {
          timeframe !== 'TODAY' ?
          <span> {formattedDate} </span> :
          <span>{formattedStartTime} - {formattedEndTime}</span>
        }
      </div>
    </div>
  );
};

export default IndividualTask;
