"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function Home() {


  const { isLoaded, isSignedIn, user} = useUser();
  const router = useRouter();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded && isSignedIn) {
    router.push("/resources");
  }




  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="my-8">
        <h1 className="text-6xl font-bold text-center pb-6">
          Welcome to <span className="text-blue-600">Child Support</span>
        </h1>
        <p className="text-xl text-center">
          <span className="text-blue-600">(AKA: Hs-Copilot)</span> Saving your education
        </p>
      </div>
    </main>
  );
}
