import { useState } from 'react';
import { Link, Route, Routes } from 'react-router';
import Nav from './Components/Nav';
import Contact from './Pages/Contact';
import HomePage from './Pages/HomePage';
import Edit from './Pages/Edit';
import Read from './Pages/Read';
import Progress from './Pages/Progress';
import WordQuiz from './Pages/WordQuiz';
import LearnedWord from './Pages/LearnedWord';



function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='min-h-screen min-w-screen bg-gray-100 dark:bg-gray-900  gap-5 p-5' >
        <Nav/>  
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/read" element={<Read />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/edit/:id" element={< Edit />} />
        <Route path="/quiz" element={< WordQuiz />} />
        <Route path="/learnedword" element={< LearnedWord />} />
        

       </Routes>

    </div>
  );
}

export default App;
