import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState, useEffect } from 'react';
import  {GoogleGenerativeAI} from "@google/generative-ai"
import {API_KEY} from "./env"



function App() {

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  

  const [response, setResponse] = useState('');
  const [loading , setLoading ] = useState(false)

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-red-500 text-center">Browser doesn't support speech recognition.</div>;
  }
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

const result = async () => {
  setLoading(true)
  const response = await model.generateContent(transcript);
  console.log(response.response.text());
  setResponse(response.response.text());
  setLoading(false)
};



  // Use useEffect to handle transcript changes
  useEffect(() => {
    const lowerTranscript = transcript.toLowerCase();
   
    if (lowerTranscript.trim() == "") {
      setResponse('');
    }else if (lowerTranscript.includes('hello') || lowerTranscript.includes('hi')) {
      setResponse('Hello! How can I help you?');
    } else if (lowerTranscript.includes('time') ) {
       setResponse('The current time is ' + new Date().toLocaleTimeString());
    } else if (lowerTranscript.includes('date') ) {
       setResponse('The current date is ' + new Date().toLocaleDateString());
    } else if (lowerTranscript.includes('open google') ) {
      window.open('https://google.com', '_blank');
    } else if (lowerTranscript.includes('open youtube') ) {
      window.open('https://youtube.com', '_blank'); 
    } else if (!lowerTranscript.includes("time") || !lowerTranscript.includes("date") || !lowerTranscript.includes("open google") || !lowerTranscript.includes("open youtube")) {
      result();
    }
  
    
   

  }, [transcript]); // Depend on `transcript`

  return (
    <div className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 text-center mb-6">
        Voice Assistant
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-4">
        Microphone: {listening ? '🎤 On' : '❌ Off'}
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full sm:w-auto"
          onClick={SpeechRecognition.startListening}
        >
          Start Listening
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition w-full sm:w-auto"
          onClick={SpeechRecognition.stopListening}
        >
          Stop Listening
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition w-full sm:w-auto"
          onClick={resetTranscript}
        >
          Reset
        </button>
      </div>
      <p className="p-4 bg-gray-200 rounded mb-4 italic text-gray-700">
        <strong>Transcript:</strong> {transcript}
      </p>
      <p className="p-4 bg-green-100 rounded text-green-700">
        <strong>Response:</strong> {loading ? "Generating..." : response}
      </p>
    </div>
  );
}

export default App;
