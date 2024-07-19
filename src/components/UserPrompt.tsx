import { useEffect, useRef, useState } from 'react';

/* Interfaces */
import CreateTextSessionProps from '../interfaces/CreateTextSessionProps';
import UserPromptProps from '../interfaces/UserPromptProps';

/* Constants */
import regularExpressions from '../constants/regular-expressions';
import strings from '../constants/strings';

declare global {
  interface Window {
    ai: { createTextSession: () => Promise<CreateTextSessionProps>; };
  }
}

function UserPrompt(props: UserPromptProps) {
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const [isFormHighlighted, setIsFormHighlighted] = useState<boolean>(false);
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [mostRecentPrompt, setMostRecentPrompt] = useState<string>('');
  const [promptText, setPromptText] = useState<string>('');
  const [textAreaHeight, setTextAreaHeight] = useState<number>(1);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { onlyNewLinesAndSpaces } = regularExpressions;
  const { unicodeCharacters, keyboardKeys } = strings;
  const keydown: keyof WindowEventMap = 'keydown';
  const keyup: keyof WindowEventMap = 'keyup';
  const isOnlyNewLinesAndSpaces: boolean = onlyNewLinesAndSpaces.test(promptText);
  const textArea: HTMLTextAreaElement | null = textareaRef.current;

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

  async function onSubmit(validatedText: string): Promise<void> {
    props.onUpdatePrompt(validatedText);
    setMostRecentPrompt(validatedText);
    const result = await doPrompt(validatedText);
    props.onUpdateResult(result.trim());
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

  function validatePrompt(): void {
    if (textArea) {
      collapseTextArea(textArea);
      if (promptText && !isOnlyNewLinesAndSpaces) {
        onSubmit(promptText.trim());
      } else {
        textArea.focus();
        setPromptText('');
      }
    }
  }

  function collapseTextArea(textAreaToCollapse: HTMLTextAreaElement): void {
    textAreaToCollapse.style.height = '1rem';
    textAreaToCollapse.value = '';
  }

  function checkUserInputKey(key: string): void {
    if (textArea) {
      modifyHeightFromKeyPress(key, textArea);
      if (textArea.value.length < 3 || isOnlyNewLinesAndSpaces) {
        textArea.style.height = '1rem';
      }
    }
  }

  function modifyHeightFromKeyPress(key: string, textarea: HTMLTextAreaElement): void {
    if (key === keyboardKeys.keyEnter) {
      if (isShiftPressed) {
        textarea.style.height = `${textAreaHeight + 1}rem`;
      } else if (!isOnlyNewLinesAndSpaces) {
        validatePrompt();
      }
    } else if (key === keyboardKeys.keyArrowUp && !promptText && mostRecentPrompt) {
      setPromptText(mostRecentPrompt);
      textarea.value = mostRecentPrompt;
      moveCursorToEndOfText(textarea);
    } else {
      const scrollHeightToRem: number = Math.floor(textarea.scrollHeight / 16);
      textarea.style.height = `${scrollHeightToRem}rem`;
      setTextAreaHeight(scrollHeightToRem);
    }
  }

  function moveCursorToEndOfText(textarea: HTMLTextAreaElement): void {
    const length: number = textarea.value.length;
    setTimeout(() => textarea.setSelectionRange(length, length), 50);
  }

  function stopTypewriter(): void {
    props.onIsTypewriterCanceled(true);
    if (textArea) textArea.focus();
  }

  function makeButtonClass(): string {
    return props.isTypewriterRunningFromCard ? 'stop' : 'start';
  }

  return (
    <div className="user-prompt">
      <form
        className={
          `user-input-form ${isFormHighlighted ? 'text-area-focused' : ''}`
        }>
        <div className="user-input-textarea-container">
        <textarea
          disabled={isAwaitingResponse}
          ref={textareaRef}
          className="user-input-textarea"
          placeholder={isAwaitingResponse ? '' : 'Enter a prompt here'}
          value={promptText}
          onFocus={() => setIsFormHighlighted(true)}
          onBlur={() => setIsFormHighlighted(false)}
          onChange={(event) => setPromptText(event.target.value)}
          onKeyDown={(event) => checkUserInputKey(event.key)}
        />
        </div>
        <div className="submit-button-container">
          <button
            type="button"
            onFocus={() => setIsFormHighlighted(true)}
            onBlur={() => setIsFormHighlighted(false)}
            disabled={isAwaitingResponse}
            className={`submit-button ${makeButtonClass()}`}
            onClick={props.isTypewriterRunningFromCard ? stopTypewriter : validatePrompt}
          >
            <span className={`submit-button-icon ${makeButtonClass()}`}>
              {
                props.isTypewriterRunningFromCard ?
                unicodeCharacters.characterBlackSquareForStop :
                unicodeCharacters.characterBlackMediumRightPointingTriangle
              }
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserPrompt;
