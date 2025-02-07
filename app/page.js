"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(null);
  
  const handleCount = async () => {
    const response = await fetch("/api/count", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    
    if (response.ok) {
      const data = await response.json();
      setCount(data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">RapidCount: Word & Character Counter</h1>
      <textarea
        className="border border-gray-300 p-2 w-full max-w-lg mt-4"
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={handleCount}
      >
        Count Words & Characters
      </button>
      {count && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <p><strong>Word Count:</strong> {count.word_count}</p>
          <p><strong>Character Count:</strong> {count.char_count}</p>
          <p><strong>Characters (No Spaces):</strong> {count.char_count_no_spaces}</p>
        </div>
      )}
    </div>
  );
}
