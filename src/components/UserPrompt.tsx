import { useEffect, useState } from 'react';

/* Interfaces */
import CreateTextSessionProps from '../interfaces/CreateTextSessionProps';
import UserPromptProps from '../interfaces/UserPromptProps';

declare global {
  interface Window {
    ai: { createTextSession: () => Promise<CreateTextSessionProps>; };
  }
}

function UserPrompt(props: UserPromptProps) {
  const [keyPressed, setKeyPressed] = useState<string>('');
  const [promptText, setPromptText] = useState<string>('');

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
    props.onUpdateIsAwaitingResult(true);
    const session = await window.ai.createTextSession();
    try {
      const result: string = await session.prompt(promptText);
      props.onUpdateIsAwaitingResult(false);
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
    props.onUpdateResult(response);
  }

  return (
    <div className="user-prompt">
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
