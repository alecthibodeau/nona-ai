import { useEffect, useRef, useState } from 'react';

/* Interfaces */
import CreateTextSessionProps from '../interfaces/CreateTextSessionProps';
import UserHistoryProps from '../interfaces/UserHistoryProps';
import UserPromptProps from '../interfaces/UserPromptProps';

/* Constants */
import regularExpressions from '../constants/regular-expressions';
import stringValues from '../constants/string-values';

declare global {
  interface Window {
    ai: { createTextSession: () => Promise<CreateTextSessionProps>; };
  }
}

function UserPrompt(props: UserPromptProps): JSX.Element {
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const [isFormHighlighted, setIsFormHighlighted] = useState<boolean>(false);
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [mostRecentPrompt, setMostRecentPrompt] = useState<string>('');
  const [promptText, setPromptText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { onlyNewLinesAndSpaces } = regularExpressions;
  const {
    keyboardKeys: { keyArrowUp, keyBackspace, keyDelete, keyEnter, keyShift },
    userPromptButtonActions: { textStart, textStop },
    localStorageKeyHistory,
    messagingForUser: { messageTextError, messageTextPlaceholder }
  } = stringValues;
  const isOnlyNewLinesAndSpaces: boolean = onlyNewLinesAndSpaces.test(promptText);
  const isSubmitEnabled: boolean = !props.isTypewriterRunningFromCard && !isAwaitingResponse;
  const textArea: HTMLTextAreaElement | null = textareaRef.current;
  const textAreaBaseHeight: number = 1;
  const textAreaVerticalPadding: number = .875;

  useEffect(() => {
    if (!isAwaitingResponse && !!textareaRef.current) textareaRef.current.focus();
  }, [isAwaitingResponse]);

  useEffect(() => {
    if (props.mostRecentPromptSaved && !mostRecentPrompt) {
      setMostRecentPrompt(props.mostRecentPromptSaved);
    }
  }, [props.mostRecentPromptSaved, mostRecentPrompt]);

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
      console.error(messageTextError, error);
      throw error;
    }
  }

  function validatePrompt(): void {
    if (textArea) {
      modifyTextAreaHeight(textArea, textAreaBaseHeight);
      textArea.value = '';
      if (promptText && !isOnlyNewLinesAndSpaces) {
        props.onIsTypewriterCanceled(false);
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
      const subtracted: number = textAreaBaseHeight - textAreaVerticalPadding;
      if (key === keyShift) {
        setIsShiftPressed(true);
      } else if (key === keyEnter) {
        handleEnterKey(textArea, scrollHeightToRem);
      } else if (key === keyArrowUp && mostRecentPrompt && !promptText) {
        loadMostRecentPrompt(textArea);
      } else if (key === keyBackspace || key === keyDelete) {
        modifyTextAreaHeight(textArea, scrollHeightToRem - subtracted);
      } else {
        modifyTextAreaHeight(textArea, scrollHeightToRem);
      }
    }
  }

  function handleKeyUp(key: string): void {
    if (key === keyShift) setIsShiftPressed(false);
  }

  function handleEnterKey(textarea: HTMLTextAreaElement, scrollHeight: number): void {
    if (!isShiftPressed && !isOnlyNewLinesAndSpaces) {
      validatePrompt();
    } else {
      modifyTextAreaHeight(textarea, scrollHeight + textAreaBaseHeight);
    }
  }

  function modifyTextAreaHeight(textarea: HTMLTextAreaElement, height: number): void {
    const textAreaTotalVerticalPadding: number = textAreaVerticalPadding * 2;
    const heightMinusPadding: number = height - textAreaTotalVerticalPadding;
    const newHeight = heightMinusPadding > textAreaBaseHeight ? heightMinusPadding : textAreaBaseHeight;
    textarea.style.height = `${newHeight}rem`;
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

  function onClickStopButton(): void {
    props.isTypewriterRunningFromCard ? cancelTypewriter() : cancelPrompt();
  }

  function cancelTypewriter(): void {
    props.onIsTypewriterCanceled(true);
    if (textArea) textArea.focus();
  }

  function cancelPrompt(): void {
    const userHistory: UserHistoryProps = {
      cards: props.cardsSaved,
      isMessageDisplayed: props.isMessageDisplayed,
      mostRecentPrompt: mostRecentPrompt
    }
    localStorage.setItem(localStorageKeyHistory, JSON.stringify(userHistory));
    window.location.reload();
  }

  function makeButtonClass(): string {
    return isSubmitEnabled ? textStart : textStop;
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
            placeholder={isAwaitingResponse ? '' : messageTextPlaceholder}
            value={promptText}
            onFocus={() => setIsFormHighlighted(true)}
            onBlur={() => setIsFormHighlighted(false)}
            onChange={(event) => setPromptText(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event.key)}
            onKeyUp={(event) => handleKeyUp(event.key)}
          />
        </div>
        <div className="button-container-user-input">
          <button
            type="button"
            onFocus={() => setIsFormHighlighted(true)}
            onBlur={() => setIsFormHighlighted(false)}
            className={`button-user-input ${makeButtonClass()}`}
            onClick={isSubmitEnabled ? validatePrompt : onClickStopButton}
          >
            <div className={`button-icon-user-input ${makeButtonClass()}`}></div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserPrompt;
