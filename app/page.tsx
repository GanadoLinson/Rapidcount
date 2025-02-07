"use client";
import { useState } from "react";

type Count = {
  word_count: number;
  char_count: number;
  char_count_no_spaces: number;
};

export default function Home() {
  const [text, setText] = useState("");
  const [count, setCount] = useState<Count | null>(null);  // Specify the type for count
  
  const handleCount = async () => {
    const response = await fetch("/api/count", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    
    if (response.ok) {
      const data: Count = await response.json(); // Explicitly type the response
      setCount(data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">RapidCount: Word and Character Counter</h1>
      
      <textarea
        className="w-full max-w-4xl text-black h-48 p-4 border-2 border-blue-500 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
        rows={8}  // Use a numeric value here
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing your text here..."
      />
      
      <button 
        className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-md shadow-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-colors duration-300"
        onClick={handleCount}
      >
        Count Words and Characters
      </button>
      
      {count && (
        <div className="mt-6 p-6 border-2 border-gray-300 rounded-lg bg-white shadow-md">
          <p className="text-lg font-semibold text-gray-700"><strong>Word Count:</strong> {count.word_count}</p>
          <p className="text-lg font-semibold text-gray-700"><strong>Character Count:</strong> {count.char_count}</p>
          <p className="text-lg font-semibold text-gray-700"><strong>Characters (No Spaces):</strong> {count.char_count_no_spaces}</p>
        </div>
      )}
    </div>
  );
}
