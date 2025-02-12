// src/app/api/jobs/jobController.ts
"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createJob(data: {
  title: string;
  description: string;
  category?: string;
}) {
  const { title, description, category } = data;

  // Ensure all required fields are provided
  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  try {
    // Create a new job post using Prisma
    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
      },
    });
    console.log("job", job);

    return job;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to create job post: " + error.message);
    } else {
      throw new Error("Failed to create job post");
    }
  }
}

export async function getJobById(jobId: number) {
  try {
    // Fetch job details along with the applicants (applications)
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        applications: {
          select: {
            name: true, // Only fetch the names of applicants
          },
        },
      },
    });

    if (!job) {
      throw new Error("Job not found");
    }

    return {
      ...job,
      applicants: job.applications.map((application) => application.name), // Map to only return names
    };
  } catch (error) {
    throw new Error(
      "Failed to fetch job: " + (error instanceof Error ? error.message : "")
    );
  }
}


export async function getAllJobs() {
  try {
    const jobs = await prisma.job.findMany();
    console.log('getAllJobs',jobs)
    return jobs;
  } catch (error) {
    throw new Error(
      "Failed to fetch jobs: " + (error instanceof Error ? error.message : "")
    );
  }
}

export async function deleteJob(id: number) {
  // Ensure that the job ID is provided
  if (!id) {
    throw new Error("Job ID is required");
  }

  try {
    // Delete the job post using Prisma
    const deletedJob = await prisma.job.delete({
      where: { id },
    });
    console.log("Deleted job:", deletedJob);

    return deletedJob;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to delete job post: " + error.message);
    } else {
      throw new Error("Failed to delete job post");
    }
  }
}

export async function editJob(id: number, data: {
  title?: string;
  description?: string;
  category?: string;
}) {
  const { title, description, category } = data;

  // Ensure that the job ID is provided
  if (!id) {
    throw new Error("Job ID is required");
  }

  try {
    // Update the job post using Prisma
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title,
        description,
        category,
      },
    });
    console.log("Updated job:", updatedJob);

    return updatedJob;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to edit job post: " + error.message);
    } else {
      throw new Error("Failed to edit job post");
    }
  }
}


