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
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new Error("Job not found");
    }

    return job;
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

export async function createAppilcation(data: {
  name: string;
  email: string;
  coverLetter?: string;
  jobId: number;
}) {
  const { name, email, coverLetter, jobId } = data;

  if (!name || !email || !jobId) {
    throw new Error("Name,email,resume and jobId are required");
  }
  try {
    const jobExists = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!jobExists) throw new Error("Job not Found");

    const application = await prisma.application.create({
      data: {
        name,
        email,
        coverLetter,
        jobId,
      },
    });

    return application;
  } catch (error) {
    throw new Error(
      "Failed to submit application: " +
        (error instanceof Error ? error.message : "")
    );
  }
}
