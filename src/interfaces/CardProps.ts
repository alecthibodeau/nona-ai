import { Dispatch, SetStateAction } from 'react';

interface CardProps {
  text: string;
  variant: string;
  isAwaitingResponse: boolean;
  isLastCard: boolean;
  isTypewriterCanceledFromUserPrompt: boolean;
  onIsCharacterTypewritten: Dispatch<SetStateAction<boolean>>;
  onIsTypewriterRunning: Dispatch<SetStateAction<boolean>>;
}

export default CardProps;
