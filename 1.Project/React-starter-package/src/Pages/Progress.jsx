import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Progress() {
  const { word } = useSelector((state) => state.words);
  const totalWords = word.length;
  const learnedWords = word.filter((item) => item.isLearnt).length;
  const progressPercentage = totalWords > 0 ? (learnedWords / totalWords) * 100 : 0;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex flex-col justify-center items-center relative">
      {/* Learned Word Button */}
      <button
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md"
        onClick={() => navigate("/learnedword")}
      >
        Learned Word
      </button>

      {/* Progress Tracker */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          Progress Tracker
        </h1>
        <div className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Total Words:</strong> {totalWords}
          </p>
          <p>
            <strong>Words Learned:</strong> {learnedWords}
          </p>
        </div>
        <div className="mt-4">
          <div className="relative w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4">
            <div
              className={`bg-green-500 h-4 rounded-full transition-all`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
            {progressPercentage.toFixed(1)}% learned
          </p>
        </div>
      </div>
    </div>
  );
}

export default Progress;
