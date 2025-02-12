"use client"
import React, { useState } from "react";
import { createJob } from "../api/jobs/jobController";
interface CreateJobModalProps {
  closeModal: () => void;
  setUpdateJobs: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateJobModal = ({closeModal,setUpdateJobs}: CreateJobModalProps) => {
  const [Submitting, SetSubmitting] = useState<boolean>(false);
  const [applicationSubmit, SetApplicationSubmit] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); 
     try {
          await createJob(formData).then((res:any) => {
            console.log("res", res);
            SetSubmitting(false);
            SetApplicationSubmit(true);
            setTimeout(() => {
              SetApplicationSubmit(false);
              setUpdateJobs(true)
              closeModal();
            }, 1500);
          });
        } catch (error) {
          SetSubmitting(false);
        }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Create A Job</h3>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          />

          {/* Email Field */}
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Job Category"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          ></input>
          {applicationSubmit && (
            <p className="mb-2 bg-green-300 p-3 rounded-lg font-semibold">
              Your job  is created successfully.
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {Submitting === true ? "Creating..." : "Create Job"}
            </button>
            <button
              onClick={closeModal}
              className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-200 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
