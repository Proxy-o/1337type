import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Timer({
  ms_time,
  isGameStarted,
}: {
  ms_time: number;
  isGameStarted: boolean;
}) {
  const time = ms_time / 1000;
  const [visible, setVisible] = useState(true);

  return (
    visible && (
      <div className="relative">
        <CountdownCircleTimer
          isPlaying={isGameStarted}
          duration={time}
          colors="url(#your-unique-id)"
          strokeWidth={1}
          onComplete={() => {
            setVisible(false);
          }}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
        <svg className="absolute">
          <defs>
            <linearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
              <stop offset="5%" stopColor="gold" />
              <stop offset="95%" stopColor="red" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  );
}
