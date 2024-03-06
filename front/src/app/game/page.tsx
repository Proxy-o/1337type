"use client";
import React, { useEffect, useRef, useState } from "react";
import { type Socket, io } from "socket.io-client";
import TextGame from "./components/textGame";
import { api } from "~/trpc/react";
import Cookies from "js-cookie";
import { Wpm } from "./components/wpm";
import Error from "../_components/error";
import { env } from "~/env";

export default function Page() {
  const [text, setText] = useState<string>("");
  const [wpm, setWpm] = useState<string>("");
  // get the token from cookie
  const tokenRef = useRef<string>();
  const ioClientRef = useRef<Socket>();
  const { isError } = api.user.getCurrentUser.useQuery();

  useEffect(() => {
    tokenRef.current = Cookies.get("access_token");
    ioClientRef.current = io(env.NEXT_PUBLIC_BACKEND_URL, {
      autoConnect: false,
      transports: ["websocket", "polling"],
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${tokenRef.current}`,
          },
        },
      },
    });
    ioClientRef.current.connect();
    ioClientRef.current.on("text", (data: string) => {
      setText(data);
    });
    ioClientRef.current.on("stop", (data: string) => {
      setWpm(data.slice(0, 4));
    });
  }, []);
  if (isError) {
    return <Error />;
  }

  return (
    <div className="relative h-full p-2">
      {wpm !== "" && <Wpm wpm={wpm} />}
      <TextGame correctText={text} socket={ioClientRef.current} />
    </div>
  );
}
