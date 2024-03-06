"use client";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import type { UserData } from "~/server/api/routers/user";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "~/components/ui/table";
import UserCard from "./userCard";
import { cn } from "~/lib/utils";

export default function Page() {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<UserData[]>([]);
  const { data, isSuccess, isLoading, refetch } = api.user.getUsers.useQuery({
    page,
  });

  // Update the users state with the new data fetched
  React.useEffect(() => {
    if (isSuccess) {
      setUsers((prevUsers) => [...prevUsers, ...data]); // Append new users to the existing ones
    }
  }, [isSuccess, data]);

  return (
    <div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px] text-center">#</TableHead>
            <TableHead className="w-[200px]">Login</TableHead>
            <TableHead className="w-[100px] text-center">WPM</TableHead>
            <TableHead className="w-[150px] text-center">Rank</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              className={cn(index < 3 && "bg-secondary/30 ")}
            >
              <UserCard user={user} index={index + 1} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-2 flex w-full justify-center">
        <Button
          onClick={async () => {
            setPage((prevPage) => prevPage + 1);
            await refetch();
          }}
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      </div>
    </div>
  );
}
