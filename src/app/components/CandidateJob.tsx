"use client"
import Link from 'next/link'
import React, { useState } from 'react'
interface Job {
  id: number;
  title: string;
}
interface CandidateJobProps {
  jobs: Job[];
}

const CandidateJob = ({ jobs }: CandidateJobProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter jobs based on the search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex flex-col items-center justify-center m-auto h-screen w-full px-4">
    <h1 className="font-bold text-2xl text-gray-700 mt-20 mb-10 md:text-3xl lg:text-4xl">
      Job Listings
    </h1>
    <input
          type="text"
          placeholder="Search by Job Title"
          className="w-full max-w-sm p-2 mb-6 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
    <ul className="w-full h-[500px] overflow-y-auto bg-white p-4 rounded-lg no-scrollbar">
    {filteredJobs.map((job) => (
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
  )
}

export default CandidateJob