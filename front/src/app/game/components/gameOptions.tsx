import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function GameOptions({
  setMs_time,
}: {
  setMs_time: (ms_time: number) => void;
  setGameType: (gameType: string) => void;
}) {
  const [timePlaceholder, setTimePlaceholder] = useState("30s");
  return (
    <div className="absolute top-0 m-2 flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex rounded-sm border p-2">
          {timePlaceholder}
          <ChevronDown size={24} className="ml-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              onClick={() => {
                setMs_time(30000);
                setTimePlaceholder("30s");
              }}
              className="w-full"
            >
              30s
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              onClick={() => {
                setMs_time(60000);
                setTimePlaceholder("60s");
              }}
              className="w-full"
            >
              60s
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <DropdownMenu>
        <DropdownMenuTrigger className="flex rounded-sm border p-2">
          {typePlaceholder}
          <ChevronDown size={24} className="ml-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              onClick={() => {
                setGameType("normal");
                setTypePlaceholder("Normal");
              }}
              className="w-full"
            >
              Normal
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              onClick={() => {
                setGameType("coding");
                setTypePlaceholder("Coding");
              }}
              className="w-full"
            >
              Coding
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
}
