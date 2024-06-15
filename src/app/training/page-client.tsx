"use client";

import { round } from "@/lib/utils";
import { arrayOfText } from "@/text";
import { useRef, useState } from "react";

export default function TrainingPage() {
  const [symbolsCount, setSymbolsCount] = useState(0);
  const [wordsCount, setWordsCount] = useState(0);
  const [symbolString, setSymbolString] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [symbolsPerMin, setSymbolsPerMin] = useState(0);
  const [wordsPerMin, setWordsPerMin] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [textToPrint, setTextToPrint] = useState(arrayOfText[0]);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentMistake = useRef(0);
  const getInputElement = () => inputRef.current!;
  let wordLength = 0;

  return (
    <div className="flex h-screen w-content flex-col items-center justify-center gap-4">
      <div className="rounded-2xl border p-2">
        <p>
          CPM: {symbolsPerMin} WPM: {wordsPerMin} accuracy:{" "}
          {round(100 - accuracy) < 0 ? 0 : round(100 - accuracy)}%
        </p>
      </div>
      <div className="w-content rounded-2xl border p-2">
        {textToPrint.split(" ").map((word, index) => {
          word += " ";
          let w = word.split("").map((letter, index) => {
            const input = getInputElement();
            let color;
            index += wordLength;
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
          });
          wordLength += word.length;
          return <span key={word + index}>{w}</span>;
        })}
      </div>
      <input
        ref={inputRef}
        className="w-content rounded-2xl border-2 border-zinc-600 p-2 outline-none focus:border-black"
        type="text"
        placeholder="Start typing ;)"
        // hidden
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
              event.target.value.length,
            )
          ) {
            currentMistake.current++;
          }
          //end if
        }}
        onKeyUp={(event) => {
          const input = getInputElement();

          if (event.key === " ") {
            setWordsCount((prev) => prev + 1);
          }
          if (
            input.value.length === 0 ||
            (event.key === "Enter" && input.value.length === textToPrint.length)
          ) {
            //set table score
            setSymbolsPerMin(
              Math.round(
                symbolsCount / ((performance.now() - startTime) / 1000 / 60),
              ),
            );
            setWordsPerMin(
              Math.round(
                wordsCount / ((performance.now() - startTime) / 1000 / 60),
              ),
            );
            setAccuracy(
              round(
                (currentMistake.current >= input.value.length
                  ? (currentMistake.current = input.value.length)
                  : currentMistake.current / input.value.length) * 100,
              ),
            );
            //end set table score
            setTextToPrint(
              arrayOfText[Math.floor(Math.random() * arrayOfText.length)],
            );
            //erase data
            setStartTime(0);
            setSymbolString("");
            setSymbolsCount(0);
            if (input !== null) {
              input.value = "";
            }
            currentMistake.current = 0;
            //end erase data
          }
        }}
      />
      <div className="rounded-2xl border p-2">
        <label htmlFor="charsInText">Chars in text</label>
        <select name="charsInText">
          <option>20</option>
          <option>40</option>
          <option>60</option>
        </select>
        <button type="button" name="textType" id="punctuation">
          Punctuation
        </button>
      </div>
    </div>
  );
}
