import { useEffect, useState } from 'react';

/* Interfaces */
import UserPromptProps from '../interfaces/UserPrompProps';

declare global {
  interface Window {
    ai: { createTextSession: () => Promise<UserPromptProps>; };
  }
}

function UserPrompt() {
  const [keyPressed, setKeyPressed] = useState<string>('');
  const [promptText, setPromptText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isAwaitingResult, setIsAwaitingResult] = useState<boolean>(false);

  useEffect(() => {
    const keydown = 'keydown';
    window.addEventListener(keydown, keyDownHandler);
    return function cleanupEventListener() {
      window.removeEventListener(keydown, keyDownHandler);
    };
  }, []);

  function keyDownHandler({ key }: KeyboardEvent): void {
    setKeyPressed(key);
  }

  async function doPrompt(promptText: string) {
    setIsAwaitingResult(true);
    const session = await window.ai.createTextSession();
    try {
      const result: string = await session.prompt(promptText);
      setIsAwaitingResult(false);
      console.log('Prompt result:', result);
      return result;
    } catch (error) {
      console.error('Error occurred during prompt:', error);
      throw error;
    }
  }

  async function evaluateKeyForSpaceOrEnter(): Promise<void> {
    if (keyPressed === 'Enter') {
      const response = await doPrompt(promptText);
      setResult(response);
    }
  }

  return (
    <div className="user-prompt">
      {result ? <p>{result}</p> : null}
      {isAwaitingResult ? <div className="loader"></div> : null}
      <form className="user-input-form">
        <textarea
          placeholder="Enter a prompt here"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
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

export default UserPrompt;
