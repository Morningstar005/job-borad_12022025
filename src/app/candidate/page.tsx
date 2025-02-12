// src/app/candidate/page.tsx

import Link from "next/link";
import { getAllJobs } from "../api/jobs/jobController"; // Import the server-side function

const Page = async () => {
  try {
    const jobs = await getAllJobs(); // Fetch jobs on the server
    console.log("jobs", jobs);
    return (
      <div className="flex flex-col items-center justify-center m-auto h-screen w-full px-4">
        <h1 className="font-bold text-2xl text-gray-700 mt-20 mb-10 md:text-3xl lg:text-4xl">
          Job Listings
        </h1>
        <ul className="w-full h-[500px] overflow-y-auto bg-white p-4 rounded-lg no-scrollbar">
        {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between w-full sm:w-[30rem] m-auto bg-slate-200 p-4 rounded-lg shadow-md hover:bg-slate-100 transition-colors duration-300 mb-4"
            >
              <h1 className="text-lg font-semibold">{job.title}</h1>
              <Link href={`/candidate/${job.id}`}>
                <button className="text-slate-900 bg-slate-300 hover:text-slate-200 font-semibold px-4 py-2 rounded-md transition-colors duration-300">
                  View
                </button>
              </Link>
            </div>
          ))}
        </ul>
      </div>
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
