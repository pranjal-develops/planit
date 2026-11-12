// import { useCallback, useState } from "react";
// import { DateTime } from "luxon";
// import type { TaskOccurrence } from "../types";
// import { taskApi } from "../api/taskAPI";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";


//   const { user } = useSelector((state: RootState) => state.auth);
//   const preferredTimezone = user?.preferredTimezone || "UTC";
// const [from, setFrom] = useState("2026-09-03T01:30");
//   const [to, setTo] = useState("2026-09-05T01:30");
//   const [data, setData] = useState<TaskOccurrence[] | null>(null);

//   const toZonedDateTime = (localDateTime: string, timezone: string): string => {
//     return DateTime.fromISO(localDateTime, {
//       zone: timezone,
//     }).toISO({
//       includeOffset: true,
//       suppressMilliseconds: true,
//     })!;
//   };

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     const zonedFrom = toZonedDateTime(from, preferredTimezone);
//     const zonedTo = toZonedDateTime(to, preferredTimezone);

//     console.log(zonedFrom);
//     console.log(zonedTo);

//     const response = await taskApi.getCalendar(zonedFrom, zonedTo);

//     console.log(response.data);
//     setData(response.data);
//   };


// //   export const getTasksForDay = useCallback(async () =>{
//   export const getTasksForDay = async () =>{
//         const today = DateTime.now().setZone(preferredTimezone)
//         const startOfToday = today.startOf("day").toISO({
//             includeOffset: true,
//             suppressMilliseconds: true
//         })
//         const endOfToday = today.endOf("day").toISO({
//             includeOffset: true,
//             suppressMilliseconds: true
//         })


//     if (!startOfToday || !endOfToday) {
//       throw new Error("Unable to create today's date range");
//     }

//       try {
//         const response = await taskApi.getCalendar(startOfToday, endOfToday);
//         setData(response.data);
//         return response.data;
//       } catch (err) {
//         // setError(err);
//         console.log(err);
//         throw err;
//       }
//     }
//     //    finally {
//     //     setLoading(false);
//     //   }
//     //  } ,[preferredTimezone]
// //   )

import { useCallback, useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { taskApi } from "../api/taskAPI";
import type { RootState } from "../store/store";
import { setTask, setTimeFrame } from "../store/slice/taskSlice";

export type TimeframeMode = "TODAY" | "WEEK" | "MONTH" | "ALL";

// export const useTimeFilter = (initialPageSize = 5 ) => {
export const useTimeFilter = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {taskData,timeframe, pageSize} = useSelector((state: RootState)=> state.task);
  const dispatch = useDispatch();

  const preferredTimezone = user?.preferredTimezone ?? "UTC";

  // const [data, setData] = useState<TaskOccurrence[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Timeframe and Pagination State
  // const [timeframe, setTimeframe] = useState<TimeframeMode>("TODAY");
  const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [serverTotalPages, setServerTotalPages] = useState(1);
  const [serverTotalElements, setServerTotalElements] = useState(0);

  const getTasks = useCallback(async () => {

    //     const today = DateTime.now().setZone(preferredTimezone);

    // const start = today
    //   .startOf("day")
    //   .toISO({
    //     includeOffset: true,
    //     suppressMilliseconds: true,
    //   });

    // const end = today
    //   .endOf("day")
    //   .toISO({
    //     includeOffset: true,
    //     suppressMilliseconds: true,
    //   });

    // if (!start || !end) {
    //   throw new Error("Unable to create today's date range");

    const now = DateTime.now().setZone(preferredTimezone);
    let startIso: string | undefined;
    let endIso: string | undefined;

    if (timeframe === "TODAY") {
      startIso = now.startOf("day").toISO({ includeOffset: true, suppressMilliseconds: true }) ?? undefined;
      endIso = now.endOf("day").toISO({ includeOffset: true, suppressMilliseconds: true }) ?? undefined;
    } else if (timeframe === "WEEK") {
      startIso = now.startOf("week").toISO({ includeOffset: true, suppressMilliseconds: true }) ?? undefined;
      endIso = now.endOf("week").toISO({ includeOffset: true, suppressMilliseconds: true }) ?? undefined;
    } else if (timeframe === "MONTH") {
      startIso = now.startOf("month").toISO({ includeOffset: true, suppressMilliseconds: true }) ?? undefined;
      endIso = now.endOf("month").toISO({ includeOffset: true, suppressMilliseconds: true }) ?? undefined;
    }

    try {
      setLoading(true);
      setError(null);

      // const response = await taskApi.getCalendar(
      //   start,
      //   end
      // );

      // setData(response.data);

      // dispatch(setTask(response.data));
      // console.log(response.data)

      // return response.data;

      const from = startIso ?? now.minus({ months: 1 }).toISO({ includeOffset: true })!;
      const to = endIso ?? now.plus({ months: 6 }).toISO({ includeOffset: true })!;

      // Call backend paginated occurrences endpoint: GET /tasks/occurrences
      const response = await taskApi.getPaginatedOccurrences(
        from,
        to,
        currentPage - 1,
        pageSize
      );

      const items = response.data.content || [];
      // setData(items);
      setServerTotalPages(response.data.totalPages || 1);
      setServerTotalElements(response.data.totalElements || items.length);
      dispatch(setTask(items));
      return items;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to load tasks.";
      setError(message);
      // throw err;
    } finally {
      setLoading(false);
    }
  }, [currentPage, dispatch, pageSize, preferredTimezone, timeframe]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void getTasks();
  }, [getTasks]);

  // Reset pagination when filter changes
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [timeframe]);
  // }, [timeframe, searchQuery, statusFilter]);

  const handleTimeframeChange = (next: TimeframeMode) => {
  setCurrentPage(1);
  dispatch(setTimeFrame(next));
};


  // Filtered dataset from server page
  const filteredData = useMemo(() => {
    return taskData.filter((item) => {
      const matchesSearch =
        item.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus =
        statusFilter === "ALL" || item.status?.toUpperCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [taskData, searchQuery, statusFilter]);

  const taskCounts = useMemo(() => {
    return taskData.reduce(
      (counts, task) => {
        switch (task.status) {
          case "TO_DO":
            counts.toDo++;
            break;
          case "IN_PROGRESS":
            counts.inProgress++;
            break;
          case "COMPLETED":
            counts.completed++;
            break;
          case "CANCELLED":
            counts.cancelled++;
            break;
          case "OVERDUE":
            counts.overdue++;
            break;
        }
        return counts;
      },
      { toDo: 0, inProgress: 0, completed: 0, cancelled: 0, overdue: 0 }
    );
  }, [taskData]);

  const formatZonedDateTime = (isoString?: string, timeZone?: string) => {
    if (!isoString) return { dateStr: "N/A", timeStr: "N/A" };
    const dateTime = DateTime.fromISO(isoString, { setZone: true }).setZone(timeZone || "UTC");
    if (!dateTime.isValid) return { dateStr: isoString, timeStr: "" };
    return {
      dateStr: dateTime.toFormat("ccc, LLL dd, yyyy"),
      timeStr: dateTime.toFormat("hh:mm a"),
    };
  };

  const calculateDuration = (startIsoString?: string, endIsoString?: string) => {
    if (!startIsoString || !endIsoString) return "N/A";
    const start = DateTime.fromISO(startIsoString);
    const end = DateTime.fromISO(endIsoString);
    if (!start.isValid || !end.isValid) return "N/A";
    const duration = end.diff(start, ["hours", "minutes"]).shiftTo("hours", "minutes");
    const hours = Math.floor(duration.hours);
    const minutes = Math.round(duration.minutes);
    if (hours === 0) return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    if (minutes === 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`;
  };

  return {
    // data,
    // data: filteredData,
    filteredData,
    rawFilteredData: filteredData,
    // allData: data,
    loading,
    error,
    // timeframe,
    // setTimeframe,
    currentPage,
    setCurrentPage,
    totalPages: serverTotalPages,
    totalItems: serverTotalElements,
    // pageSize,
    // setPageSize,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    taskCounts,
    // getTasks,
    formatZonedDateTime,
    calculateDuration,
    handleTimeframeChange,
    // refetch: getTasks,
  };
};