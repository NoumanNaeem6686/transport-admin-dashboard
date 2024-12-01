import { fetchTaskStatistics, fetchTaskSummary, fetchTeamPerformance, fetchUpcomingTasks } from "@/actions/stats.action";
import TaskSummaryCard from "@/components/charts/Dashboard-Card";
import MixedChart from "@/components/charts/MixedChart";
import ProjectCard from "@/components/charts/Progress-Card";
import TaskChart from "@/components/charts/TaskChart";
import PerformanceCard from "@/components/charts/TeamPerformance";

const Home = async (
  {
    searchParams,
  }: {
    searchParams: { view?: string; };
  }
) => {
  const { taskSummaryData, error } = await fetchTaskSummary()
  const { upcomingTasksData } = await fetchUpcomingTasks()
  const { teamPerformanceData } = await fetchTeamPerformance()
  return <div className="flex-col  p-5 mt-7">

    <TaskSummaryCard taskSummaryData={taskSummaryData} />
    <div className="flex flex-col md:flex-row items-start my-4 sm:space-x-4">

      <PerformanceCard teamPerformanceData={teamPerformanceData} />
      <TaskChart />
    </div>

    <div className="flex flex-col md:flex-row items-start my-4 sm:space-x-4">

      {/* <ProjectCard upcomingTasksData={upcomingTasksData} /> */}
      {/* <MixedChart /> */}
    </div>
  </div>
};

export default Home;
