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
  const pleaseTryAgain: string = 'It looks like there was a problem finding an answer for you. Please try again.';

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

  function evaluateKeyForEnter(): void {
    if (keyPressed === 'Enter') onSubmit();
  }

  async function onSubmit(): Promise<void> {
    console.log(promptText);
    const response = await doPrompt(promptText);
    setResult(response);
  }

  return (
    <div className="user-prompt">
      {result ? <p>{result === '' ? pleaseTryAgain : result}</p> : null}
      {isAwaitingResult ? <div className="loader"></div> : null}
      <form className="user-input-form">
        <textarea
          placeholder="Enter a prompt here"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onKeyUp={evaluateKeyForEnter}
        />
        <button
          type="button"
          className="submit-button"
          onClick={onSubmit}
        >
          <span className="button-icon">&#9650;</span>
        </button>
      </form>
    </div>
  );
}

export default UserPrompt;
