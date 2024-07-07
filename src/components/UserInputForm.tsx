import { useEffect, useState } from 'react';

function UserInputForm() {
  const [keyPressed, setKeyPressed] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    const keydown = 'keydown';
    window.addEventListener(keydown, keyDownHandler);
    return function cleanupEventListener() {
      window.removeEventListener(keydown, keyDownHandler);
    };
  }, []);

  async function doPrompt(prompt: string) {
    const session = await window.ai.createTextSession();
    const result: string = await session.prompt(prompt);
    return result;
  }

  async function evaluateKeyForSpaceOrEnter(): Promise<void> {
    if (keyPressed === 'Enter') {
      const response = await doPrompt(prompt);
      setResult(response);
    }
  }

  function keyDownHandler({ key }: KeyboardEvent): void {
    setKeyPressed(key);
  }

  return (
    <div>
      {result ? <p>{result}</p> : null}
      <form className="user-input-form">
        <textarea
          placeholder="Enter a prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyUp={evaluateKeyForSpaceOrEnter}
        />
        {/* <button
          onClick={async () => {
            const response = await doPrompt(prompt);
            setResult(response);
          }}
        >
          Prompt
        </button> */}
      </form>
    </div>
  );
}

export default UserInputForm;
