import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';
import '../App.css';

// Code stubs for supported languages
const stubs = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    int num1, num2;
    cin >> num1 >> num2;
    cout << "The sum is: " << (num1 + num2) << endl;
    return 0;
}`,
  python: `# Take input
num1 = int(input())
num2 = int(input())

# Print the sum
print("The sum is:", num1 + num2)`,
};

function Compiler() {
  const [language, setLanguage] = useState('cpp'); // Current language (C++ or Python)
  const [code, setCode] = useState(stubs[language]); // Editor content
  const [input, setInput] = useState(''); // Input for the program
  const [output, setOutput] = useState(''); // Output from the program

  // Update the editor content when the language changes
  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  // Handle submission to backend
  const handleSubmit = async () => {
    const payload = {
      language, // Use the state value directly ("cpp" or "python")
      code: code || "print('No code provided')", // Default code
      input: input || '', // Default input
    };

    console.log('Payload being sent:', payload);

    try {
      setOutput('');
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/run',
        payload
      );
      setOutput(data.output);
    } catch (error) {
      console.error('Error from backend:', error.response?.data || error.message);
      setOutput(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col lg:flex-row items-stretch">
      {/* Left side: Coding area */}
      <div className="lg:w-1/2 border-r-2 border-gray-300 pr-4">
        <h1 className="text-3xl font-bold mb-4">Pyronix Online Code Compiler</h1>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Select Language:</label>
          <select
            value={language}
            onChange={(e) => {
              const shouldSwitch = window.confirm(
                'Are you sure you want to change the language? Your current code will be lost.'
              );
              if (shouldSwitch) setLanguage(e.target.value);
            }}
            className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-indigo-500 bg-gray-50"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>
        </div>

        <div
          className="bg-gray-900 text-white shadow-md w-full rounded mb-4"
          style={{ height: '400px', overflowY: 'auto' }}
        >
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              highlight(code, language === 'cpp' ? languages.clike : languages.python)
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              outline: 'none',
              border: 'none',
              backgroundColor: '#2d2d2d',
              color: '#ffffff',
              height: '100%',
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="btn-primary bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Run
        </button>
      </div>

      {/* Right side: Input and Output */}
      <div className="lg:w-1/2 lg:pl-4 pt-4">
        {/* Input section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Input</h2>
          <textarea
            rows="5"
            cols="15"
            value={input}
            placeholder="Enter your program input here..."
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 rounded py-2 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize w-full"
            style={{ minHeight: '120px' }}
          ></textarea>
        </div>

        {/* Output section */}
        <div
          className="bg-gray-800 text-white rounded shadow-md p-4"
          style={{
            height: '300px',
            overflowY: 'auto',
          }}
        >
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <div
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              whiteSpace: 'pre-wrap',
            }}
          >
            {output || 'Output will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compiler;