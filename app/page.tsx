"use client";
import React, { useState } from "react";
import MultiSelect from "./components/dropdown";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please Enter Text");
      setResult("");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/reverse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not reverse string");
      }
      setResult(data.result);
      setInput("");
    } catch (err) {
      setError("Could not reverse string");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Please Enter Text"
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full placeholder:text-red-500 text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {loading ? "Loading..." : "Click Me"}
            </button>
            <p className="mt-4 text-green-600 font-medium">
              Reverse String {result}
            </p>
            {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
          </form>
          <MultiSelect
            // for error message on multiSelect
            // error="Error Message Here"
            placeholder="Choose an Option"
            label="Label"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
              { label: "Option 4", value: "option4" },
            ]}
          />
        </div>
      </main>
    </div>
  );
}
