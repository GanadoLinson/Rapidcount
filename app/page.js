"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(null);
  const [excludePunctuation, setExcludePunctuation] = useState(false);
  const [excludeCommas, setExcludeCommas] = useState(false);
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [excludeNumbers, setExcludeNumbers] = useState(false);

  const handleCount = () => {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const charCount = text.length;

    // If the checkbox is unchecked, set value to 0
    const charCountNoSpaces = excludeSpaces
      ? text.replace(/\s/g, "").length
      : 0;
    const charCountNoCommas = excludeCommas
      ? text.replace(/,/g, "").length
      : 0;
    const charCountNoPunctuation = excludePunctuation
      ? text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").length
      : 0;
    const charCountNoNumbers = excludeNumbers
      ? text.replace(/[0-9]/g, "").length
      : 0;

    setCount({
      word_count: wordCount,
      char_count: charCount,
      char_count_no_spaces: excludeSpaces ? charCountNoSpaces : 0,
      char_count_no_commas: excludeCommas ? charCountNoCommas : 0,
      char_count_no_punctuation: excludePunctuation ? charCountNoPunctuation : 0,
      char_count_no_numbers: excludeNumbers ? charCountNoNumbers : 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          RapidCount: Word & Character Counter
        </h1>
        
        <textarea
          className="w-full h-40 border-2 border-blue-300 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
        />

        {/* Exclusion Checkboxes */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={excludePunctuation}
              onChange={(e) => setExcludePunctuation(e.target.checked)}
              className="accent-blue-500"
            />
            <span className="text-gray-700">Exclude Punctuation</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={excludeCommas}
              onChange={(e) => setExcludeCommas(e.target.checked)}
              className="accent-blue-500"
            />
            <span className="text-gray-700">Exclude Commas</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={excludeSpaces}
              onChange={(e) => setExcludeSpaces(e.target.checked)}
              className="accent-blue-500"
            />
            <span className="text-gray-700">Exclude Spaces</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={excludeNumbers}
              onChange={(e) => setExcludeNumbers(e.target.checked)}
              className="accent-blue-500"
            />
            <span className="text-gray-700">Exclude Numbers</span>
          </label>
        </div>

        {/* Count Button */}
        <button
          onClick={handleCount}
          className="w-full bg-blue-500 text-white py-3 mt-6 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:-translate-y-0.5"
        >
          Count Words & Characters
        </button>

        {/* Display Results */}
        {count && (
          <div className="mt-6 bg-gray-100 p-6 rounded-xl shadow-inner">
            <p className="text-gray-800">
              <strong>Word Count:</strong> {count.word_count}
            </p>
            <p className="text-gray-800">
              <strong>Character Count:</strong> {count.char_count}
            </p>
            <p className="text-gray-800">
              <strong>Characters (No Spaces):</strong> {count.char_count_no_spaces}
            </p>
            <p className="text-gray-800">
              <strong>Characters (No Commas):</strong> {count.char_count_no_commas}
            </p>
            <p className="text-gray-800">
              <strong>Characters (No Punctuation):</strong> {count.char_count_no_punctuation}
            </p>
            <p className="text-gray-800">
              <strong>Characters (No Numbers):</strong> {count.char_count_no_numbers}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
