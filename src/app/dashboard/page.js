"use client";

import {signOut, useSession} from "next-auth/react";
import React from "react";

export default function DashboardPage() {
  const session = useSession();
  return (
    <div>
      <h1 className="text-xl">Dashboard</h1>
      <p>{JSON.stringify(session)}</p>
      <button onClick={()=> signOut({callbackUrl: '/'})} className="btn btn-info">LogOut</button>
    </div>
  );
}
