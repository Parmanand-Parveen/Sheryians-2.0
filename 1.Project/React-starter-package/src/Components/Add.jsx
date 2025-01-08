import { nanoid } from "nanoid";
import React, { useState } from "react";
import { addWord } from "../Store/Slice/WordSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Add() {
  const dispatch = useDispatch();

  const intitialState = {
    id: nanoid(),
    word: "",
    translation: "",
    meaning: "",
    isLearnt: false,
  };

  const [form, setForm] = useState(intitialState);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addWord(form));
    setForm(intitialState);
    toast.success("Word added successfully" ,{
      draggable:true,
      autoClose:3000

    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Add a Word</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Word:</label>
            <input
              type="text"
              value={form.word}
              onChange={(e) =>
                setForm({ ...form, word: e.target.value })
              }
              placeholder="Word"
              className="w-full text-black p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Translation:</label>
            <input
              type="text"
              value={form.translation}
              onChange={(e) =>
                setForm({ ...form, translation: e.target.value })
              }
              placeholder="Translation"
              className="w-full text-black p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Meaning:</label>
            <input
              type="text"
              value={form.meaning}
              onChange={(e) =>
                setForm({ ...form, meaning: e.target.value })
              }
              placeholder="Meaning"
              className="w-full text-black p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            disabled={!form.word || !form.translation}
            className="w-full py-2 px-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Add Word
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
