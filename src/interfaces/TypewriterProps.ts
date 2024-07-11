import { Dispatch, SetStateAction } from 'react';

interface TypewriterProps {
  text: string;
  delay: number;
  isStoppedByUser: boolean;
  onIsCharacterTypewritten: Dispatch<SetStateAction<boolean>>;
  onIsTypewriterRunning: Dispatch<SetStateAction<boolean>>;
}

export default TypewriterProps;
