import React from "react";

export default function TimeInput({ inputHours, setInputHours, inputMinutes, setInputMinutes, outline }) {
  return (
    <>
      <label className="pr-3 mb-0">Time spent:</label>
      <div className={`border border-${outline}`}>
        <input
          onChange={(e) => setInputHours(e.target.value)}
          type="number"
          min="0"
          max="99"
          name="inputHours"
          value={inputHours}
          className="pt-1 pb-2  text-right border-0"
          required
        />
        :
        <input
          onChange={(e) => setInputMinutes(e.target.value)}
          type="number"
          min="0"
          max="55"
          step="5"
          value={inputMinutes}
          name="inputMinutes"
          className="pt-1 pb-2  text-center border-0"
          required
        />
      </div>
    </>
  );
}
