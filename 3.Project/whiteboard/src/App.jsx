import React, { useRef, useEffect, useState } from 'react';
import { Pencil, Square, Circle, Undo, Redo, Download, Trash } from 'lucide-react';

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(1);
  const [startPoint, setStartPoint] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = window.innerWidth-100;
    canvas.height = window.innerHeight-100;
    context.strokeStyle = color;
    context.lineWidth = lineWidth; 
   

    const initialState = context.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialState]);
    setHistoryIndex(0);

    const resizeCanvas = () => {
      const prevState = context.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = window.innerWidth - 100;
      canvas.height = window.innerHeight - 100;
      context.putImageData(prevState, 0, 0);
    };

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setStartPoint({ x, y });
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !startPoint) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    if (tool === 'pencil') {
      context.lineTo(x, y);
      context.stroke();
    } else {
      const prevState = history[historyIndex];
      if (prevState) context.putImageData(prevState, 0, 0);

      context.beginPath();
      if (tool === 'rectangle') {
        context.rect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y);
      } else if (tool === 'circle') {
        const radius = Math.sqrt(
          Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
        );
        context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
      }
      context.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setIsDrawing(false);
    setStartPoint(null);

    const newState = context.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newState]);
    setHistoryIndex(historyIndex + 1);
  };

  const undo = () => {
    if (historyIndex <= 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const newIndex = historyIndex - 1;
    context.putImageData(history[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const newIndex = historyIndex + 1;
    context.putImageData(history[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const newState = context.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newState]);
    setHistoryIndex(historyIndex + 1);
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = image;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-10">
        <div className="flex flex-wrap items-center gap-4">
          <button onClick={() => setTool('pencil')} className={`p-2 rounded ${tool === 'pencil' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
            <Pencil className="w-6 h-6" />
          </button>
          <button onClick={() => setTool('rectangle')} className={`p-2 rounded ${tool === 'rectangle' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
            <Square className="w-6 h-6" />
          </button>
          <button onClick={() => setTool('circle')} className={`p-2 rounded ${tool === 'circle' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
            <Circle className="w-6 h-6" />
          </button>
          <button onClick={undo} disabled={historyIndex <= 0} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50">
            <Undo className="w-6 h-6" />
          </button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50">
            <Redo className="w-6 h-6" />
          </button>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
          <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(parseInt(e.target.value))} className="w-24" />
          <button onClick={clearCanvas} className="p-2 rounded hover:bg-gray-100">
            <Trash className="w-6 h-6" />
          </button>
          <button onClick={exportCanvas} className="p-2 rounded hover:bg-gray-100">
            <Download className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="pt-20 p-4">
        <canvas 
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="bg-white rounded-lg shadow-lg cursor-crosshair w-full h-auto"
        />
      </div>
    </div>
  );
}

export default App;
