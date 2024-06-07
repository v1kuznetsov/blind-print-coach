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
  const currentMistake = useRef(0);
  const getInputElement = () => inputRef.current!;

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen w-content">
      <div className="p-2 border rounded-full ">
        <p>
          s/m: {symbolsPerMin} accuracy:{" "}
          {100 - accuracy < 0 ? 0 : 100 - accuracy}%
        </p>
      </div>
      <div className="p-2 w-content border rounded-full">
        {textToPrint.split("").map((letter, index) => {
          const input = getInputElement();
          let color;
          if (index < symbolString.length) {
            if (letter === input.value[index]) {
              color = "text-green-800";
            } else {
              color = "text-red-800";
            }
          } else {
            color = "";
          }
          return (
            <span className={color} key={letter + index}>
              {letter}
            </span>
          );
        })}
      </div>
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
          //start if Text mistake calculation
          if (
            event.target.value.slice(-1) !==
            textToPrint.slice(
              event.target.value.length - 1,
              event.target.value.length
            )
          ) {
            currentMistake.current++;
          }
          //end if
          setSymbolsPerMin(
            Math.round(
              symbolsCount / ((performance.now() - startTime) / 1000 / 60)
            )
          );
          setAccuracy(
            Math.floor(
              (currentMistake.current / event.target.value.length) * 100 * 100
            ) / 100
          );
          console.log(currentMistake.current, event.target.value.length);
        }}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            inputRef.current !== null &&
            inputRef.current.value !== ""
          ) {
            setTextToPrint(
              arrayOfText[Math.floor(Math.random() * arrayOfText.length)]
            );
            setStartTime(0);
            setSymbolString("");
            setSymbolsCount(0);
            if (inputRef.current !== null) {
              inputRef.current.value = "";
            }
            currentMistake.current = 0;
          } else if (event.key === "Backspace") {
          }
        }}
      />
    </div>
  );
}
