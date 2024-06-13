"use client";

import { round } from "@/lib/utils";
import { arrayOfText } from "@/text";
import { useRef, useState } from "react";

export default function TrainingPage() {
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
      <button
        className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-offset-2"
        role="switch"
        type="button"
      >
        <span
          aria-hidden="true"
          className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        ></span>
      </button>
      <div className="p-2 border rounded-2xl ">
        <p>
          s/m: {symbolsPerMin} accuracy:{" "}
          {round(100 - accuracy) < 0 ? 0 : round(100 - accuracy)}%
        </p>
      </div>
      <div className="p-2 w-content border rounded-2xl">
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
        className="w-content border-2 border-zinc-600 rounded-2xl p-2 outline-none focus:border-black"
        type="text"
        placeholder="Start typing ;)"
        id="input"
        maxLength={textToPrint.slice().length}
        autoFocus
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
            round(
              (currentMistake.current >= event.target.value.length
                ? (currentMistake.current = event.target.value.length)
                : currentMistake.current / event.target.value.length) * 100
            )
          );
        }}
        onKeyUp={(event) => {
          const input = getInputElement();
          if (
            input.value.length === 0 ||
            (event.key === "Enter" && input.value !== "")
          ) {
            setTextToPrint(
              arrayOfText[Math.floor(Math.random() * arrayOfText.length)]
            );
            setStartTime(0);
            setSymbolString("");
            setSymbolsCount(0);
            if (input !== null) {
              input.value = "";
            }
            currentMistake.current = 0;
          }
        }}
      />
    </div>
  );
}
