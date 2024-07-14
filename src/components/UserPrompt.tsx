import { useEffect, useRef, useState } from 'react';

/* Components */
import Loader from './Loader';

/* Interfaces */
import CreateTextSessionProps from '../interfaces/CreateTextSessionProps';
import UserPromptProps from '../interfaces/UserPromptProps';

/* Constants */
import strings from '../constants/strings';

declare global {
  interface Window {
    ai: { createTextSession: () => Promise<CreateTextSessionProps>; };
  }
}

function UserPrompt(props: UserPromptProps) {
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [mostRecentPrompt, setMostRecentPrompt] = useState<string>('');
  const [promptText, setPromptText] = useState<string>('');
  const [textAreaHeight, setTextAreaHeight] = useState<number>(1);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { unicodeCharacters, keyboardKeys } = strings;
  const keydown: keyof WindowEventMap = 'keydown';
  const keyup: keyof WindowEventMap = 'keyup';
  const isOnlyNewLinesAndSpaces: boolean = /^\s*(\n\s*)*$/.test(promptText);

  useEffect(() => {
    const keyShift: string = 'Shift';
    function keyDownHandler({ key }: KeyboardEvent): void {
      if (key === keyShift) setIsShiftPressed(true);
    }
    function keyUpHandler({ key }: KeyboardEvent): void {
      if (key === keyShift) setIsShiftPressed(false);
    }
    window.addEventListener(keydown, keyDownHandler);
    window.addEventListener(keyup, keyUpHandler);
    return function cleanupEventListeners() {
      window.removeEventListener(keydown, keyDownHandler);
      window.removeEventListener(keyup, keyUpHandler);
    };
  }, []);

  useEffect(() => {
    if (!isAwaitingResponse && textareaRef.current) textareaRef.current.focus();
  }, [isAwaitingResponse]);

  async function onSubmit(): Promise<void> {
    props.onUpdatePrompt(promptText);
    setMostRecentPrompt(promptText);
    const result = await doPrompt(promptText);
    props.onUpdateResult(result);
  }

  async function doPrompt(request: string): Promise<string> {
    setIsAwaitingResponse(true);
    props.onIsAwaitingResponse(true);
    setPromptText('');
    const session = await window.ai.createTextSession();
    try {
      const response: string = await session.prompt(request);
      setIsAwaitingResponse(false);
      props.onIsAwaitingResponse(false);
      return response;
    } catch (error) {
      console.error('Error occurred during prompt:', error);
      throw error;
    }
  }

  function checkUserInputKey(key: string): void {
    const textarea = textareaRef.current;
    if (textarea) {
      modifyHeightFromKeyPressed(key, textarea);
      if (textarea.value.length < 3 || isOnlyNewLinesAndSpaces) {
        textarea.style.height = '1rem';
      }
    }
  }

  function modifyHeightFromKeyPressed(key: string, textarea: HTMLTextAreaElement): void {
    if (key === keyboardKeys.keyEnter) {
      if (isShiftPressed) {
        textarea.style.height = `${textAreaHeight + 1}rem`;
      } else if (!isOnlyNewLinesAndSpaces) {
        textarea.style.height = '1rem';
        textarea.value = '';
        onSubmit();
      }
    } else if (key === keyboardKeys.keyArrowUp && !promptText && mostRecentPrompt) {
      setPromptText(mostRecentPrompt);
      textarea.value = mostRecentPrompt;
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
          {
            isAwaitingResponse ?
            <Loader /> :
            <textarea
              disabled={isAwaitingResponse}
              ref={textareaRef}
              className="user-input-textarea"
              placeholder={isAwaitingResponse ? '' : 'Enter a prompt here'}
              value={promptText}
              onChange={(event) => setPromptText(event.target.value)}
              onKeyDown={(event) => checkUserInputKey(event.key)}
            />
          }
        </div>
        <div className="submit-button-container">
          <button
            disabled={!promptText || isAwaitingResponse}
            type="button"
            className="submit-button"
            onClick={onSubmit}
          >
            <span className={
              `submit-button-icon ${!promptText || isAwaitingResponse ? 'disabled' : ''}`
            }>
              {unicodeCharacters.characterBlackMediumRightPointingTriangle}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserPrompt;
