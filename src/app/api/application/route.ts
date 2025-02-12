import { NextRequest, NextResponse } from "next/server";
import { createAppilcation } from "../jobs/jobController";

export async function POST(req:NextRequest){
try {
    const {name, email, coverLetter, jobId} = await req.json();

    const parsedJobId = parseInt(jobId, 10);
    if (isNaN(parsedJobId)) {
        return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
      }
      const application = await createAppilcation({ name, email, coverLetter, jobId: parsedJobId });
      return NextResponse.json(application, { status: 201 });
} catch (error) {
    return NextResponse.json(
        { message: "Error submitting job application", error: error instanceof Error ? error.message : "" },
        { status: 500 }
      );
}
}