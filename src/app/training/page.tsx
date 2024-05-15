"use client";

import { arrayOfText } from "@/text";
import { useRef, useState } from "react";

export default function Page() {
  const [symbolsCount, setSymbolsCount] = useState(0);
  const [symbolString, setSymbolString] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [symbolsPerMin, setSymbolsPerMin] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [textToPrint, setTextToPrint] = useState(arrayOfText[0]);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen w-content">
      <div className="p-2 border rounded-full ">
        <p>
          s/m: {symbolsPerMin} accuracy: {accuracy}
        </p>
      </div>
      <div className="p-2 w-content border rounded-full">{textToPrint}</div>
      <input
        ref={inputRef}
        className="w-content border-2 border-black rounded-full p-2 outline-none"
        type="text"
        placeholder="Start typing..."
        id="input"
        onChange={(event) => {
          if (symbolString === "") {
            setStartTime(performance.now());
          }
          setSymbolsCount((prev) => prev + 1);
          setSymbolString(event.target.value);
        }}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            inputRef.current !== null &&
            inputRef.current.value !== ""
          ) {
            let currentTime = (performance.now() - startTime) / 1000;
            setSymbolsPerMin(Math.round(symbolsCount / (currentTime / 60)));
            setTextToPrint(
              arrayOfText[Math.round(Math.random() * arrayOfText.length)]
            );
            setStartTime(0);
            setSymbolString("");
            setSymbolsCount(0);
            inputRef.current.value = "";
          }
        }}
      />
    </div>
  );
}
