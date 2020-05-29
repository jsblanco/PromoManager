import React from "react";

export default function TimeInput({ setInputHours, setInputMinutes, outline }) {
  return (
    <>
      <label className="pr-3">Time spent:</label>
      <div className={`border border-${outline}`}>
        <input
          onChange={(e) => setInputHours(e.target.value)}
          type="number"
          min="0"
          max="99"
          name="inputHours"
          className="pt-1 pb-2  text-right border-0"
          required
        />
        :
        <input
          onChange={(e) => setInputMinutes(e.target.value)}
          type="number"
          min="0"
          max="59"
          name="inputMinutes"
          className="pt-1 pb-2  text-center border-0"
          required
        />
      </div>
    </>
  );
}
