import React from "react";
import { useSelector } from "react-redux";
import FlashCard from "../Components/FlashCard";


function LearnedWord() {
  const { word } = useSelector((state) => state.words);
  
   const filteredWord = word.filter((item) => item.isLearnt);
   console.log(filteredWord)
   
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        Word List
      </h1>

      {/* Display a message when the list is empty */}
      {word.length === 0 ? (
        <p className="text-center text-lg font-medium bg-gray-200 dark:bg-gray-800 rounded-lg py-4 px-6">
          No words found. Add some to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWord.map((item) => (
            <div key={item.id} className="transition-transform hover:scale-105">
              <FlashCard
                frontWord={item.word}
                backWord={item.translation}
                id={item.id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LearnedWord;
