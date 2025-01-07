import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editWord } from "../Store/Slice/WordSlice";
import { Edit2, Edit2Icon, Edit3 } from "lucide-react";

function Edit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const initialState = {
    id: "",
    word: "",
    translation: "",
    meaning: "",
  };

  const [editedWord, setEditedWord] = useState(initialState);
  const { word } = useSelector((state) => state.words);

  const filteredWord = word.find((item) => item.id == params.id);

  useEffect(() => {
    if (filteredWord) {
      setEditedWord(filteredWord);
    }
  }, [filteredWord]);

  const editHandler = (e) => {
    e.preventDefault();
    dispatch(editWord(editedWord));
    navigate("/read");
  };

  return (
 <div>
    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-5" onClick={() => navigate("/read")}>Back</button>
 <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
   <h1 className="text-2xl flex items-center font-bold mb-6 "> <Edit3/>  Edit Word</h1>
   <form onSubmit={editHandler} className="space-y-4">
     <div>
       <label className="block text-sm font-medium mb-1">Word:</label>
       <input
         type="text"
         value={editedWord.word}
         onChange={(e) =>
           setEditedWord({ ...editedWord, word: e.target.value })
         }
         placeholder="Word"
         className="w-full text-black p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
       />
     </div>
     <div>
       <label className="block text-sm font-medium mb-1">
         Translation:
       </label>
       <input
         type="text"
         value={editedWord.translation}
         onChange={(e) =>
           setEditedWord({ ...editedWord, translation: e.target.value })
         }
         placeholder="Translation"
         className="w-full text-black p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
       />
     </div>
     <div>
       <label className="block text-sm font-medium mb-1">Meaning:</label>
       <input
         type="text"
         value={editedWord.meaning}
         onChange={(e) =>
           setEditedWord({ ...editedWord, meaning: e.target.value })
         }
         placeholder="Meaning"
         className="w-full text-black p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
       />
     </div>
     <button
       className="w-full py-2 px-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
       disabled={!editedWord.word || !editedWord.translation}
       type="submit"
     >
       Save Changes
     </button>
   </form>
 </div>
</div>
 </div>
  );
}

export default Edit;
