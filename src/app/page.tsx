"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [action, setAction] = useState<string>();

  const handleApplyClick = () => {
    setAction("apply");
    setTimeout(()=>{
      router.push("/candidate");
    },3000)
  };

  const handleCreateJobClick = () => {
    setAction("create");
    setTimeout(()=>{
      router.push("/create");
    },3000)
  };
  const handleClick = () => {
    // Navigating to the /candidate page
    router.push("/candidate");
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center m-auto gap-6">
      <button onClick={handleApplyClick} className="font-semibold bg-slate-400 p-4 rounded-md hover:bg-slate-200 transition-all duration-300 w-[16rem]">Apply for and See Jobs</button>

      <button onClick={handleCreateJobClick} className="font-semibold bg-slate-400 p-4 rounded-md hover:bg-slate-200 transition-all duration-300 w-[16rem]">Create a Job</button>

      {action === "apply" && <div>Redirecting to apply and see jobs...</div>}
      {action === "create" && <div>Redirecting to create a job...</div>}
    </div>
  );
};

export default Page;
