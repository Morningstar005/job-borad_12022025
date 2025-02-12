"use client";
import React, { useState } from "react";
import { createAppilcation } from "../api/jobs/jobController";

interface ApplyModalProps {
  job: {
    id: number; // Assuming job has an id field
    title: string;
  };
  closeModal: () => void; // Define the type for closeModal prop
}

const ApplyModal = ({ job, closeModal }: ApplyModalProps) => {
  const [Submitting, SetSubmitting] = useState<boolean>(false);
  const [applicationSubmit, SetApplicationSubmit] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // resume: null as File | null,
    coverLetter: "",
    jobId: job.id,
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

    SetSubmitting(true);
    // Handle form submission logic here (e.g., send data to API)
    console.log(formData);
    try {
      await createAppilcation(formData).then((res) => {
        console.log("res", res);
        SetSubmitting(false);
        SetApplicationSubmit(true);
        setTimeout(() => {
          SetApplicationSubmit(false);
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
        <h3 className="text-xl font-semibold mb-4">Apply for {job.title}</h3>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          />

          {/* Email Field */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          />

          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            placeholder="Cover Letter"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            rows={4}
          ></textarea>
          {applicationSubmit && (
            <p className="mb-2 bg-green-300 p-3 rounded-lg font-semibold">Your application is being submitted.</p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {Submitting === true ? "submitting..." : "Submit Application"}
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

export default ApplyModal;
