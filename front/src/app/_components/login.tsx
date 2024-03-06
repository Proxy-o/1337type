import Link from "next/link";
import React from "react";
import { env } from "~/env";

export default function Login() {
  return (
    <div>
      <Link href={`${env.NEXT_PUBLIC_BACKEND_URL}/auth/42`}>Login</Link>
    </div>
  );
}
