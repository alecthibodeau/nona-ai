import { useEffect, useRef, useState } from 'react';

/* Interfaces */
import CreateTextSessionProps from '../interfaces/CreateTextSessionProps';
import UserPromptProps from '../interfaces/UserPromptProps';

/* Constants */
import regularExpressions from '../constants/regular-expressions';
import stringValues from '../constants/string-values';

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { onlyNewLinesAndSpaces } = regularExpressions;
  const {
    keyboardKeys: { keyArrowUp, keyBackspace, keyDelete, keyEnter, keyShift },
    unicodeCharacters
  } = stringValues;
  const isOnlyNewLinesAndSpaces: boolean = onlyNewLinesAndSpaces.test(promptText);
  const textArea: HTMLTextAreaElement | null = textareaRef.current;

  useEffect(() => {
    if (!isAwaitingResponse && textArea) textArea.focus();
  }, [isAwaitingResponse, textArea]);

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
      modifyTextAreaHeight(textArea, 1);
      textArea.value = '';
      if (promptText && !isOnlyNewLinesAndSpaces) {
        onSubmit(promptText.trim());
      } else {
        textArea.focus();
        setPromptText('');
      }
    }
  }

  function handleKeyDown(key: string): void {
    if (textArea) {
      const scrollHeightToRem: number = Math.floor(textArea.scrollHeight / 16);
      if (key === keyShift) {
        setIsShiftPressed(true);
      } else if (key === keyEnter) {
        handleEnterKey(textArea, scrollHeightToRem);
      } else if (key === keyArrowUp && mostRecentPrompt && !promptText) {
        loadMostRecentPrompt(textArea);
      } else if ((key === keyBackspace || key === keyDelete) && textArea.value.length <= 1) {
        modifyTextAreaHeight(textArea, 1);
      } else {
        modifyTextAreaHeight(textArea, scrollHeightToRem);
      }
    }
  }

  function handleEnterKey(textarea: HTMLTextAreaElement, scrollHeightToRem: number): void {
    if (!isShiftPressed && !isOnlyNewLinesAndSpaces) {
      validatePrompt();
    } else {
      modifyTextAreaHeight(textarea, scrollHeightToRem + 1);
    }
  }

  function modifyTextAreaHeight(textarea: HTMLTextAreaElement, height: number): void {
    textarea.style.height = `${height}rem`;
  }

  function loadMostRecentPrompt(textarea: HTMLTextAreaElement): void {
    setPromptText(mostRecentPrompt);
    textarea.value = mostRecentPrompt;
    moveCursorToEndOfText(textarea);
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
          onKeyDown={(event) => handleKeyDown(event.key)}
          onKeyUp={(event) => {if (event.key === keyShift) setIsShiftPressed(false)}}
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
