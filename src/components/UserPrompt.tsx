import { useEffect, useRef, useState } from 'react';

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
  const [isUserInputDisabled, setIsUserInputDisabled] = useState<boolean>(false);
  const [promptText, setPromptText] = useState<string>('');
  const [textAreaHeight, setTextAreaHeight] = useState<number>(1);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
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

  useEffect(() => {
    if (!isUserInputDisabled && textareaRef.current) textareaRef.current.focus();
  }, [isUserInputDisabled]);

  function keyDownHandler({ key }: KeyboardEvent): void {
    if (key === keyShift) setIsShiftPressed(true);
  }

  function keyUpHandler({ key }: KeyboardEvent): void {
    if (key === keyShift) setIsShiftPressed(false);
  }

  async function onSubmit(): Promise<void> {
    console.log(promptText);
    props.onUpdatePrompt(promptText);
    const response = await doPrompt(promptText);
    props.onUpdateResult(response);
  }

  async function doPrompt(promptText: string): Promise<string> {
    props.onUpdateIsAwaitingResult(true);
    setIsUserInputDisabled(true);
    const session = await window.ai.createTextSession();
    try {
      const result: string = await session.prompt(promptText);
      onResult(result);
      return result;
    } catch (error) {
      console.error('Error occurred during prompt:', error);
      throw error;
    }
  }

  function onResult(result: string): void {
    props.onUpdateIsAwaitingResult(false);
    setIsUserInputDisabled(false);
    setPromptText('');
    console.log('Prompt result:', result, textareaRef.current);
  }

  function checkUserInputKey(key: string): void {
    const textarea = textareaRef.current;
    if (textarea) {
      modifyTextAreaHeight(key, textarea);
      if (textarea.value.length < 2) textarea.style.height = '1rem';
      if (key === keyEnter && !isShiftPressed) {
        textarea.style.height = '1rem';
        textarea.value = '';
        onSubmit();
      }
    }
  }

  function modifyTextAreaHeight(key: string, textarea: HTMLTextAreaElement): void {
    if (key === keyEnter && isShiftPressed) {
      textarea.style.height = `${textAreaHeight + 1}rem`;
    } else {
      const scrollHeightToRem: number = Math.floor(textarea.scrollHeight / 16);
      textarea.style.height = `${scrollHeightToRem}rem`;
      setTextAreaHeight(scrollHeightToRem);
    }
  }

  return (
    <div className="user-prompt">
      <form className="user-input-form">
        <div className="user-input-textarea-container">
          {!isUserInputDisabled ?
            <textarea
              ref={textareaRef}
              className="user-input-textarea"
              placeholder="Enter a prompt here"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => checkUserInputKey(e.key)}
            /> :
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          }
        </div>
        <div className="submit-button-container">
          <button
            disabled={!promptText || isUserInputDisabled}
            type="button"
            className="submit-button"
            onClick={onSubmit}
          >
            <span className={`${!promptText ? 'disabled' : ''} submit-button-icon`}>
              &#9650;
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserPrompt;
