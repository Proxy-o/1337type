import React, { useEffect, useState } from "react";
import useKeyPress from "../hooks/useKeypressed";
import { cn } from "~/lib/utils";
import { type Socket } from "socket.io-client";
import Timer from "./timer";
import GameOptions from "./gameOptions";
const TextGame = ({
  correctText,
  socket,
}: {
  correctText: string;
  socket: Socket | undefined;
}) => {
  const [userInput, setUserInput] = useState<
    { letter: string; index: number; style: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [ms_time, setMs_time] = useState(30000);
  const [gameType, setGameType] = useState("normal");

  useEffect(() => {
    socket?.on("stop", () => {
      setIsGameStarted(false);
      setIsGameEnded(true);
    });
  }, [socket]);

  useKeyPress((key) => {
    if (!isGameStarted && currentIndex != 0) {
      return;
    }
    if (currentIndex === 0 && !isGameStarted) {
      socket?.emit("start", ms_time, gameType);
      setIsGameStarted(true);
    }

    socket?.emit("key", key);
    if (key === "Backspace") {
      if (currentIndex === 0) {
        return;
      }
      setUserInput((prev) => prev.slice(0, -1));
      setCurrentIndex((prev) => prev - 1);
      return;
    }
    if (key === correctText[currentIndex]) {
      setUserInput((prev) => [
        ...prev,
        {
          letter: key,
          index: currentIndex,
          style: "correct",
        },
      ]);
    } else if (currentIndex < correctText.length - 1) {
      setUserInput((prev) => [
        ...prev,
        {
          letter: key,
          index: currentIndex,
          style: "wrong",
        },
      ]);
    }
    if (currentIndex >= correctText.length - 1) {
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  });

  return (
    <>
      {!isGameStarted && (
        <GameOptions setMs_time={setMs_time} setGameType={setGameType} />
      )}
      <div className="  flex  w-full flex-col items-center justify-center ">
        {!isGameEnded && (
          <Timer ms_time={ms_time} isGameStarted={isGameStarted} />
        )}
        <p className="p-6 text-4xl font-normal">
          {correctText.split("").map((letter, index) => {
            // Only show the first  6 characters
            if (index < currentIndex + 30) {
              return (
                <span
                  key={index}
                  className={cn(
                    "",
                    index < userInput.length
                      ? userInput[index]?.style === "correct"
                        ? "text-green-500"
                        : "text-red-500"
                      : "text-primary",
                    index === currentIndex &&
                      "border-b-2 border-primary font-light",

                    index > currentIndex && "text-secondary/95",
                  )}
                >
                  {letter}
                </span>
              );
            }
            return null;
          })}
        </p>
      </div>
    </>
  );
};

export default TextGame;
