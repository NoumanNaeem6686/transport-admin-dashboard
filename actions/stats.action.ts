import axiosInstance from "@/config/axios";



export async function fetchTaskSummary() {
    try {
        const response = await axiosInstance.get("/api/stats/summary");
        console.log(response.data);
        return { taskSummaryData: response.data };
    } catch (error: any) {
        console.log("🚀 ~ fetchTaskSummary ~ error:", error);
        const errorMessage = error.response?.data?.error || "Failed to fetch task summary";
        return { error: errorMessage };
    }
}
export async function fetchTeamPerformance() {
    try {
        const response = await axiosInstance.get("/api/stats/performance");
        console.log(response.data);
        return { teamPerformanceData: response.data };
    } catch (error: any) {
        console.log("🚀 ~ fetchTeamPerformance ~ error:", error);

        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Failed to fetch team performance data";
        return { error: errorMessage };
    }
}
export async function fetchTaskStatistics(view: any) {
    try {
        const response = await axiosInstance.get(`/api/stats/task-statistics?view=${view}`);
        console.log(response.data);
        return { taskStatisticsData: response.data };
    } catch (error: any) {
        console.log("🚀 ~ fetchTaskStatistics ~ error:", error);
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Failed to fetch task statistics";
        return { error: errorMessage };
    }
}
export async function fetchUpcomingTasks() {
    try {
        const response = await axiosInstance.get("/api/stats/up-comming-task");
        return { upcomingTasksData: response.data };
    } catch (error: any) {
        console.log("🚀 ~ fetchUpcomingTasks ~ error:", error);
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Failed to fetch upcoming tasks";
        return { error: errorMessage };
    }
}