import { Dispatch, SetStateAction } from 'react';

/* Interfaces */
import CardProps from './CardProps';

interface UserPromptProps {
  cardsSaved: CardProps[];
  mostRecentPromptSaved: string;
  isMessageDisplayed: boolean;
  isTypewriterRunningFromCard: boolean;
  onIsAwaitingResponse: Dispatch<SetStateAction<boolean>>;
  onIsTypewriterCanceled: Dispatch<SetStateAction<boolean>>;
  onUpdatePrompt: Dispatch<SetStateAction<string>>;
  onUpdateResult: Dispatch<SetStateAction<string>>;
}

export default UserPromptProps;
