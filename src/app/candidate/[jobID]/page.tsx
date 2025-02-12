"use client";
import { getJobById } from '@/app/api/jobs/jobController'; // Ensure the function exists and works correctly
import ApplyModal from '@/app/components/modal';
import { useParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const { jobID } = useParams(); // Access dynamic route parameter from the path
    console.log("jobID", jobID);
console.log("hello",jobID)
    interface Job {
        id: number;
        title: string;
        description: string;
        category: string | null;
        createdAt: Date;
    }
    
    const [job, setJob] = useState<Job | null>(null); // To store the fetched job data
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState<string | null>(null); // To store any errors
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    useEffect(() => {
        if (!jobID) return; // Don't run the fetch if jobID is not available yet
        
        const fetchJob = async () => {
            try {
                console.log('in')
                const jobData = await getJobById(Number(jobID)); // Fetch job details by ID
                console.log('in',jobData)

                setJob(jobData); // Store the fetched job in state
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobID]); // The effect runs whenever jobID changes

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error fetching job: {error}</div>; // Show error state
    }

    if (!job) {
        return <div>No job found</div>; // Handle case where no job is found
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Job Details</h1>
          <h2 className="text-2xl text-blue-600 font-semibold mb-2">{job.title}</h2>
          <p className="text-lg text-gray-700 mb-4">{job.description}</p>
          <p className="text-md text-gray-600 mb-4">Category: <span className="font-semibold">{job.category}</span></p>
          <p className="text-md text-gray-600 mb-6">Posted on: {new Date(job.createdAt).toDateString()}</p>
    
          {/* Apply Button */}
         
          <button
            onClick={openModal}
            className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition duration-300"
          >
            Apply Now
          </button>
    
          {/* Modal */}
          {isModalOpen && (
        <ApplyModal job={job} closeModal={closeModal}/>
          )}
        </div>
      );
};

export default Page;
