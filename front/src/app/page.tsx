"use client";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { WavyBackground } from "~/components/ui/wavy-background";
import { api } from "~/trpc/react";

export default function Home() {
  noStore();
  const { data: user, isError } = api.user.getCurrentUser.useQuery();
  return (
    <WavyBackground className="mt-96 ">
      <p className="inter-var  inline-block bg-white bg-clip-text text-center text-2xl font-bold text-transparent text-white md:text-4xl lg:text-7xl">
        A Developer ? A Fast Typist
      </p>
      <p className="inter-var mt-4 text-center text-base font-normal  md:text-lg">
        Type as fast as you can and compete against your peers.{" "}
      </p>
      <div className="mt-8 flex justify-center">
        <Link
          href={
            isError ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/42` : "/game"
          }
          className="relative mt-24 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {isError ? "Login" : "Play"}
          </span>
        </Link>
      </div>
    </WavyBackground>
  );
}
