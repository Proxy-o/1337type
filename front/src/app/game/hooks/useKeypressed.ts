import { useState, useEffect } from "react";

//1
const useKeyPress = (callback: (key: string) => void) => {
  //2
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  //3
  useEffect(() => {
    //4

    const downHandler = ({ key }: { key: string }) => {
      if (
        (keyPressed !== key && key.length === 1) ||
        key === "Backspace" ||
        key === "Delete"
      ) {
        setKeyPressed(key);
        callback(key);
      }
    };
    //5
    const upHandler = () => {
      setKeyPressed(null);
    };

    //6
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      //7
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });
  //8
  return keyPressed;
};

export default useKeyPress;
