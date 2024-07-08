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
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [promptText, setPromptText] = useState<string>('');
  const keydown: keyof WindowEventMap = 'keydown';
  const keyup: keyof WindowEventMap = 'keyup';
  const keyEnter: string = 'Enter';
  const keyShift: string = 'Shift';

  useEffect(() => {
    window.addEventListener(keydown, keyDownHandler);
    window.addEventListener(keyup, keyUpHandler);
    return function cleanupEventListeners() {
      window.removeEventListener(keydown, keyDownHandler);
      window.removeEventListener(keyup, keyUpHandler);
    };
  }, []);

  function keyDownHandler({ key }: KeyboardEvent): void {
    if (key === keyShift) setIsShiftPressed(true);
  }

  function keyUpHandler({ key }: KeyboardEvent): void {
    if (key === keyShift) setIsShiftPressed(false);
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

  function evaluateKeyForEnter(key: string): void {
    if (key === keyEnter && !isShiftPressed) onSubmit();
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
          onKeyDown={(e) => evaluateKeyForEnter(e.key)}
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
