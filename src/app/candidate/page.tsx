// src/app/candidate/page.tsx

import { getAllJobs } from "../api/jobs/jobController"; // Import the server-side function
import CandidateJob from "../components/CandidateJob";

const Page = async () => {
  try {
    const jobs = await getAllJobs(); // Fetch jobs on the server
    console.log("jobs", jobs);
    return (
      <CandidateJob jobs={jobs}/>
    );
  } catch (error) {
    return (
      <div>
        Error fetching jobs:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
};

export default Page;
