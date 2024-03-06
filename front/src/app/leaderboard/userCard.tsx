import { Medal, Meh, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { TableCell } from "~/components/ui/table";
import { type UserData } from "~/server/api/routers/user";

export default function UserCard({
  user,
  index,
}: {
  user: UserData;
  index: number;
}) {
  return (
    <>
      <TableCell className="text-center font-medium">{index}</TableCell>
      <TableCell className="font-medium">
        <Link
          className="flex items-center gap-2  text-blue-500"
          href={`https://profile.intra.42.fr/users/${user.login}`}
        >
          <Avatar>
            <AvatarImage alt="@username1" src={user.avatar} />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          {user.login}
        </Link>
      </TableCell>
      <TableCell className="text-center">{user.highestWpm ?? 0}</TableCell>
      <TableCell className="flex items-center justify-center">
        {index === 1 && <Medal size={24} className="text-yellow-600" />}
        {index === 2 && <Zap size={24} className="text-green-500" />}
        {index === 3 && <Meh size={24} className="text-blue-700" />}
      </TableCell>
    </>
  );
}
