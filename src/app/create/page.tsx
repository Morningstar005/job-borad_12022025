"use client"; // ✅ Marks the file as a client component

import Link from "next/link";
import { useEffect, useState } from "react";
import CreateJobModal from "../components/createJobModal";
import { deleteJob, getAllJobs } from "../api/jobs/jobController"; // This won't work directly

const Page = () => {
  const [jobs, setJobs] = useState<{ id: number; title: string; description: string; category: string | null; createdAt: Date; }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [update,setUpdateJobs] = useState(false)
  const fetchJobs = async () => {
    try {
      const data = await getAllJobs(); // ⛔️ This may cause issues since it's a server function
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  
  useEffect(() => {
    if(update===true){
      fetchJobs();
      setUpdateJobs(false)
    }
  }, [update]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const deleteJobs = async (id: any) => {
    await deleteJob(id).then((res) => {
        if (res) {
          // Handle success, maybe update state or notify the user
          console.log('Job deleted successfully');
          setUpdateJobs(true)
        } else {
          // Handle failure, maybe show an error message
          console.log('Failed to delete job');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };
  
  return (
    <div className="flex flex-col items-center justify-center m-auto h-screen w-full px-4">
      <div className="flex justify-between items-center mt-20 mb-10 w-full sm:w-[30rem]">
        <h1 className="font-bold text-gray-700 text-2xl md:text-3xl lg:text-4xl">
          Job Listings
        </h1>
        <button
          className="text-blue-900 font-medium cursor-pointer bg-slate-300 p-3 rounded-lg"
          onClick={openModal}
        >
          Create Job
        </button>
      </div>

      <ul className="w-full h-[500px] overflow-y-auto bg-white p-4 rounded-lg no-scrollbar">
      {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between w-full sm:w-[30rem] m-auto bg-slate-200 p-4 rounded-lg shadow-md hover:bg-slate-100 transition-colors duration-300 mb-4"
          >
            <h1 className="text-lg font-semibold">{job.title}</h1>
            <div className="gap-2 flex ">

            <Link href={`/candidate/${job.id}`}>
              <button className="text-slate-900 bg-slate-300 hover:text-slate-200 font-semibold px-4 py-2 rounded-md transition-colors duration-300">
                View
              </button>
            </Link>
            <button className="text-slate-900 bg-slate-300 hover:text-slate-200 font-semibold px-4 py-2 rounded-md transition-colors duration-300">
             Edit
            </button>
            <button className="text-slate-900 bg-slate-300 hover:text-slate-200 font-semibold px-4 py-2 rounded-md transition-colors duration-300"onClick={()=>{
              deleteJobs(job.id)
            }}>
             Delete
            </button>
            </div>
          </div>
        ))}
      </ul>

      {isModalOpen && <CreateJobModal closeModal={closeModal} setUpdateJobs={setUpdateJobs}/>}
    </div>
  );
};

export default Page;
