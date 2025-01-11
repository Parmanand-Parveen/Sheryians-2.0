import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-red-500 text-center">Browser doesn't support speech recognition.</div>;
  }

  // Use useEffect to handle transcript changes
  useEffect(() => {
    const lowerTranscript = transcript.toLowerCase();

    if (lowerTranscript.includes('hello')) {
      setResponse('Hello, I am your voice assistant');
    } else if (lowerTranscript.includes('how are you')) {
      setResponse('I am fine, what about you?');
    } else if (lowerTranscript.includes('time')) {
      setResponse(new Date().toLocaleTimeString());
    } else if (lowerTranscript.trim() !== '') {
      setResponse('I do not understand');
    }
  }, [transcript]); // Depend on `transcript`

  return (
    <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl lg:text-3xl font-bold text-blue-600 text-center mb-6">
        Voice Assistant
      </h1>
      <p className="text-lg md:text-xl mb-4">
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
        <strong>Response:</strong> {response}
      </p>
    </div>
  );
}

export default App;
