import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Flashcard from "./Flashcard";

function Read() {
  const { word } = useSelector((state) => state.words);
  const filteredWord = word.filter((item) => !item.isLearnt);

  const [search, setsearch] = useState("");

  const [serchedwords, setSerchedwords] = useState([]);
  console.log(serchedwords);

  const searchWord = (letters) => {
    const filter = filteredWord.filter((item) =>
      item.word.toLowerCase().includes(letters.toLowerCase())
    );
    setSerchedwords(filter);
  };

  useEffect(() => {
    if (search === "") {
    } else {
      searchWord(search);
    }
  }, [search]);

  return (
    <div className="min-h-screen  bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <input
        type="text"
        placeholder="Search"
        className="p-2  text-black rounded-lg"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />

      <h1 className="text-4xl font-bold mb-8 text-center">Word List</h1>

      {serchedwords.length === 0 ? (
        <p className="text-center text-lg font-medium bg-gray-200 dark:bg-gray-800 rounded-lg py-4 px-6">
          No words found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {search === ""
            ? filteredWord.map((item) => (
                <div
                  key={item.id}
                  className="transition-transform hover:scale-105"
                >
                  <Flashcard
                    frontWord={item.word}
                    backWord={item.translation}
                    id={item.id}
                    text={"Mark as Learned"}
                  />
                </div>
              ))
            : serchedwords.map((item) => (
                <div
                  key={item.id}
                  className="transition-transform hover:scale-105"
                >
                  <Flashcard
                    frontWord={item.word}
                    backWord={item.translation}
                    id={item.id}
                    text={"Mark as Learned"}
                  />
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

export default Read;
