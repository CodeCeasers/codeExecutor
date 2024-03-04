"use client"

import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

const Monaco = () => {
    const [value, setValue] = useState('');

    const handleCodeChange = async () => {
        console.log("Clicked")
        // Send the updated code to the backend
        try {
            await fetch('http://localhost:4000/api/code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: value }),
            });
        } catch (error) {
            console.error('Error updating code on the backend:', error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
            <h1 className="text-2xl md:text-4xl p-4 font-bold mb-8">🚀 Live Coding! ✨</h1>

            <div className="w-4/5 flex justify-between items-center mb-4">
                <div className="p-3 bg-black hover:bg-zinc-950 rounded-md font-bold">
                    <button onClick={handleCodeChange}>Run code</button>
                </div>
            </div>
            
            <div className="w-4/5 bg-opacity-70 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden">
                <Editor
                    height="80vh"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={value}
                    onChange={(e) => setValue(e)}
                    defaultValue="// Write your code here"
                    loading={<h3>Loading Code...</h3>}
                />
            </div>
        </div>
    );
};

export default Monaco;
