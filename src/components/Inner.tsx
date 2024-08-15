import React from "react";
import { UserNav } from "./user-nav";

function Inner({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-1 flex-col space-y-8 p-8 ">
      <div className="flex items-center justify-between space-y-2 md:w-8/12 mx-auto">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your recent payments!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      {children}
    </div>
  );
}

export default Inner;
