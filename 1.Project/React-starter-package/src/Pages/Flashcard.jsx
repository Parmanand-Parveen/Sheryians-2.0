import React, { useState } from "react";
import "../Components/Style.css"; 
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { deleteWord, isLearnt } from "../Store/Slice/WordSlice";

function Flashcard({ frontWord = "hello", backWord = "world", id }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="relative flex justify-center items-center w-full p-4">
      <div
        className={`flashcard ${isFlipped ? "flipped" : ""} `}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side */}
        <div className="front bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="flex flex-col items-center dark:text-gray-100 ">
          <h1 className="text-lg font-semibold mb-2 dark:text-gray-800" onClick={(e)=> { e.stopPropagation(); dispatch(isLearnt(id))}}>Mark as learned</h1>
            <h2 className="text-lg font-semibold mb-2 dark:text-gray-800">Word :</h2>
            <span className="text-xl font-bold dark:text-gray-800">{frontWord}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent flipping when clicking the button
                dispatch(deleteWord(id));
              }}
              className="mt-4  text-red-600 "
            >
              Delete
            </button>
          </div>
        </div>

        {/* Back Side */}
        <div className="back bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-900">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Translation</h2>
            <span className="text-xl font-bold">{backWord}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent flipping when clicking the button
                navigate(`/edit/${id}`);
              }}
              className="mt-4 text-yellow-500"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
