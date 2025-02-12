"user server"
import { NextRequest, NextResponse } from "next/server";
import { getJobById } from "../jobController";

export async function GET(req: NextRequest, { params }: { params: { jobID: string } }) {
    try {
        console.log("params",params)

      const jobId = Number(params.jobID);
  console.log("jobID",jobId)
      if (isNaN(jobId)) {
        return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
      }
  
      const job = await getJobById(jobId);
      return NextResponse.json(job, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching job", error: error instanceof Error ? error.message : "" },
        { status: 404 }
      );
    }
  }