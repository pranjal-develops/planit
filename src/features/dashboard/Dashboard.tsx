import React from "react";
import StatusSection from "./StatusSection";
import TaskWidget from "./TaskWidget";
import CalanderWidget from "./CalanderWidget";
import DashboardHeader from "./DashboardHeader";
import { useTimeFilter, type TimeframeMode } from "../../hooks/useTimeFilter";

const Dashboard: React.FC = () => {
  // const { timeframe, setTimeframe, taskCounts } = useTimeFilter();

  return (
    <div className="p-5 w-full h-full overflow-y-auto flex flex-col gap-4">
      <DashboardHeader
        // timeframe={timeframe as TimeframeMode}
        // onTimeframeChange={(tf) => setTimeframe(tf)}
      />
      {/* <StatusSection taskCounts={taskCounts} /> */}
      <StatusSection />
      <div className="relative grid gap-4 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr]">
        <TaskWidget />
        <CalanderWidget />
      </div>
    </div>
  );
};

export default Dashboard;
