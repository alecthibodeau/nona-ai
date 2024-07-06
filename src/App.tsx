import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string>('');

  async function doPrompt(prompt: string) {
    const session = await window.ai.createTextSession();
    const result =  await session.prompt(prompt);
    return result;
  }

  return (
    <>
      <div className="user-input-area">
        <input
          type="text"
          placeholder="What is 2 + 2?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={async () => {
            const response = await doPrompt(prompt);
            setResult(response);
          }}
        >
          Prompt
        </button>
      </div>
      {result ? <p>{result}</p> : null}
    </>
  );
}

export default App;
