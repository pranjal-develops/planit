import React, { useState } from "react";
import type { TaskCreateRequest } from "../../../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

const TaskCreation = () => {
  const {user} = useSelector((state: RootState)=> state.auth)
  const [task, setTask] = useState<Partial<TaskCreateRequest>>({
    title: "",
    taskTimezone: user?.preferredTimezone ?? "UTC"
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!task.title || !task.taskTimezone || !task.recurrenceType) {
    console.error("Missing required fields");
    return;
  }

  const request: TaskCreateRequest = {
    title: task.title,
    taskTimezone: task.taskTimezone,
    recurrenceType: task.recurrenceType,
    description: task.description,
    allDay: task.allDay,
  };
  console.log(request);
};


  return (
    <form className="w-full h-full p-5 flex  flex-col gap-5">
      <h1 className="text-2xl">Task Title</h1>
       <label htmlFor="task-name" className="block w-full">
        <input
        className="bg-(--secondary-bg) text-(--primary-text) px-3 py-2 rounded-xl cursor-text active:border-(--accent-bg)"
        id="task-name"
          type="text"
          placeholder="Title"
          value={task?.title ?? ""}
          onChange={(e) => {
            const title = e.target.value
            console.log(e.target.value);
            
            setTask((prev)=>{
                // if(!prev) return prev;
                return{
                    ...prev,
                    title
                }
            });
          }}
        />
      </label>
      <h2>Description</h2>
      <label htmlFor="task-description" className="block w-full">
    <input
      id="task-description"
        className="bg-(--secondary-bg) text-(--primary-text) px-3 py-2 rounded-xl cursor-text"
        type="text"
        placeholder="Description"
        value={task.description ?? ""}
        onChange={(e) =>{
          const description = e.target.value
          console.log(description);
          setTask((prev)=> {
            return{
              ...prev,
              description
            }
          })
          
        }

        }
        />
      </label>
      <label>
        <input type="date" className="cursor-pointer"/>
      </label>
    </form>
  );
};

export default TaskCreation;
