// src/app/api/jobs/route.ts
// "use server"

import { NextRequest, NextResponse } from "next/server";
import { createJob, getAllJobs, getJobById } from "./jobController"; // Import the controller function

export async function POST(req: NextRequest) {
  const { title, description, category } = await req.json();

  // Call the controller to create a job
  try {
    const job = await createJob({ title, description, category });
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error creating job post", error: errorMessage },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const jobs = await getAllJobs();
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching jobs",
        error: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}
