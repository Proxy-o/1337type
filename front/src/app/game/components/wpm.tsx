"use client";
import React from "react";

export function Wpm({ wpm }: { wpm: string }) {
  return (
    <div className="relative flex w-full justify-center">
      <div className="relative inline-flex h-36 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

        <span className="inline-flex h-full w-full  items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-2xl  font-medium text-white backdrop-blur-3xl">
          WPM : {wpm}
        </span>
      </div>
    </div>
  );
}
