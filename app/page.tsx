"use client";
import React, { useState } from "react";

export default function Home() {
  //taking input from user and storing in state
  const [input, setInput] = useState("");
  //loading state to show loading spinner
  const [loading, setLoading] = useState(false);
  //error state to show error message
  const [error, setError] = useState("");
  //result state to show result
  const [result, setResult] = useState("");
  //handle submit function to reverse the string
  const handleSubmit = async (e) => {
    //prevent default form submission
    e.preventDefault();
    //check if input is empty
    if (!input.trim()) {
      setError("Please Enter Text");
      setResult("");
      return;
    }
    //reset error and result state
    setLoading(true);
    setError("");
    //simulate API call with timeout
    try {
      await new Promise((res) => setTimeout(res, 500));
      //reverse the string
      const reverse = input.split("").reverse().join("");
      setResult(reverse);
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
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {loading ? "Loading..." : "Click Me"}
            </button>
            <p className="mt-4 text-green-600 font-medium">
              Reverse String {result}
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
