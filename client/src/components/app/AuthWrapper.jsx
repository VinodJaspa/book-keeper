import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AuthWrapper = ({ children, mode }) => {


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="relative flex justify-center items-center w-full h-16 md:w-1/2 md:h-auto bg-muted p-4 lg:p-10 text-white lg:items-start lg:justify-start bg-black">
  
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
            Eminence Technology Test Vinod Jaspa
        </div>
        <div className="absolute inset-0 bg-zinc-900 opacity-50 lg:opacity-100" />
      </div>
      <div className="flex-1 p-4 md:p-8 flex flex-col justify-center">
        <div className="mx-auto w-full sm:w-[350px] flex flex-col space-y-6">
        
          {children}
        </div>
      </div>
    </div>
  );
};

export { AuthWrapper };
