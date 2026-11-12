import { NavLink } from "react-router";
import Card from "../common/Primitives/Card";
import IndividualTask from "./IndividualTask";
import { useTimeFilter } from "../../hooks/useTimeFilter";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const TaskWidget = () => {
  const {
    // data,
    loading,
    error,
    // getTasks,
  } = useTimeFilter();

  // useEffect(() => {
  //   getTasks().catch(() => {
  //     // The hook already stores the error.
  //   });
  // }, [getTasks]);

  
  const { taskData } = useSelector((state: RootState) => state.task);

  return (
    <Card className="flex flex-col gap-3 p-2 h-auto lg:bg-(--secondary-bg) lg:border-transparent">
      <div className="w-full flex flex-row justify-between px-5 py-2 text-(--secondary-text)">
        <p>My Tasks</p>

        <NavLink
          to="/tasks"
          className="hover:text-(--primary-text)"
        >
          View all
        </NavLink>
      </div>

      <div className="px-2 py-2">
        {loading && <p>Loading tasks...</p>}

        {error && <p>Unable to load tasks.</p>}

        {!loading && !error && taskData.length === 0 && (
          <p>No tasks for today.</p>
        )}

        {!loading &&
          !error &&
          taskData.map((task) => (
            <IndividualTask
              key={task.id}
              task={task}
            />
          ))}
      </div>
    </Card>
  );
};

export default TaskWidget;
