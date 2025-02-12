"use server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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