import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import type { TaskOccurrence, TaskStatus } from "../../../types";
import { useTimeFilter } from "../../../hooks/useTimeFilter";
import TaskOccurrenceDetails from "./occurrence/TaskOccurrenceDetails";
import Card from "../../common/Primitives/Card";
import TaskListHeader from "./list/TaskListHeader";
import TaskListFilters from "./list/TaskListFilters";
import TaskCard from "./list/TaskCard";
import TaskListPagination from "./list/TaskListPagination";
import NewTask from "./CreateTask/NewTask";
import MobileTaskCard from "./list/MobileTaskCard";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

export const TasksListSection: React.FC = () => {
    const navigate = useNavigate();
    
  const {taskData} = useSelector((state: RootState)=> state.task);
    const {
        // data: occurrences,
        loading: isLoading,
        // timeframe,
        // setTimeframe,
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems,
        // pageSize,
        // setPageSize,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
    } = useTimeFilter();

    const [selectedOccurrence, setSelectedOccurrence] = useState<TaskOccurrence | null>(null);
    const [newTask, setNewTask] = useState<boolean>(false);

    const activeSelected = selectedOccurrence ?? taskData[0] ?? null;

    const handleStatusChange = (newStatus: TaskStatus) => {
        if (activeSelected) {
            setSelectedOccurrence({ ...activeSelected, status: newStatus });
        }
    };

    return (
        <div className="relative hidden p-3 sm:p-5 w-full h-full lg:overflow-hidden lg:flex flex-col gap-4">
            <div className="relative grid gap-4 grid-cols-1 lg:grid-cols-[340px_1fr] h-full min-h-0 overflow-hidden">
                {/* Left Column Card Container */}
                {/* <Card className="flex flex-col h-130 lg:h-full overflow-hidden p-2 lg:bg-(--secondary-bg) shrink-0"> */}
                {/* <Card className="flex flex-col h-full overflow-hidden p-2 lg:bg-(--secondary-bg) shrink-0 justify-between"> */}
                {/* <Card className="flex flex-col h-full min-h-0 overflow-hidden p-2 lg:bg-(--secondary-bg) "> */}
                <div className="flex flex-col h-full min-h-0 overflow-hidden p-2 lg:bg-(--secondary-bg) ">
                    <div className="shrink-0">
                    <TaskListHeader
                        // timeframe={timeframe as TimeframeMode}
                        // onTimeframeChange={(tf) => setTimeframe(tf)}
                        onCreateTask={() => setNewTask(true)}
                    />

                    <TaskListFilters
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        statusFilter={statusFilter}
                        onStatusFilterChange={setStatusFilter}
                    />
                                            
                    </div>


                    {/* <div className="flex-1 h-full overflow-y-auto min-h-0 px-2 my-2 scrollbar-none space-y-1"> */}
                    <div className="min-h-0 flex-1 overflow-y-auto px-2 my-2 scrollbar-none space-y-1">
                        {isLoading ? (
                            <div className="py-8 text-center text-xs text-(--secondary-text) animate-pulse">
                                Loading occurrences...
                            </div>
                        ) : taskData.length === 0 ? (
                            <div className="py-12 text-center text-xs text-(--secondary-text)">
                                No occurrences found for selected timeframe.
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {taskData.map((item) => (
                                    <React.Fragment key={item.id}>
                                        {/* Desktop Card View */}
                                        <div className="hidden sm:block">
                                            <TaskCard
                                                occurrence={item}
                                                isSelected={activeSelected?.id === item.id}
                                                onSelect={setSelectedOccurrence}
                                            />
                                        </div>
                                        {/* Mobile Specialized Card View */}
                                        <div className="block sm:hidden">
                                            <MobileTaskCard
                                                occurrence={item}
                                                isSelected={activeSelected?.id === item.id}
                                                onSelect={setSelectedOccurrence}
                                            />
                                        </div>
                                    </React.Fragment>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

                    {/* Fixed Pinned Bottom Pagination Footer */}
                    {/* <div className="absolute bottom-0 shrink-0 mt-auto bg-(--secondary-bg) z-10 border-t border-(--primary-border)"> */}
                    {/* <div className="shrink-0 mt-auto bg-(--secondary-bg) z-10 border-t border-(--primary-border)"> */}
                      <div className="shrink-0 border-t border-(--primary-border) bg-(--secondary-bg)">
                        <TaskListPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            // pageSize={pageSize}
                            onPageChange={setCurrentPage}
                            // onPageSizeChange={setPageSize}
                        />
                    </div>
                </div>

                {/* Right Column Card Container */}
                <Card className="hidden lg:flex min-h-112.5 lg:min-h-0 h-full overflow-hidden p-2 lg:bg-(--secondary-bg)">
                    <TaskOccurrenceDetails
                        occurrence={activeSelected}
                        onStatusChange={handleStatusChange}
                        onEdit={() => alert(`Edit task #${activeSelected?.id}`)}
                        onDelete={() => alert(`Delete task #${activeSelected?.id}`)}
                        onInviteCollaborator={() => alert("Invite collaborator modal triggered")}
                        onBack={() => {
                            if (activeSelected) {
                                navigate(`/occurrence/${activeSelected.id}`);
                            }
                        }}
                    />
                </Card>
            </div>

            <NewTask
                isOpen={newTask}
                onClose={() => setNewTask(false)}
            />
        </div>
    );
};

export default TasksListSection;
