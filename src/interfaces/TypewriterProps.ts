import { Dispatch, SetStateAction } from 'react';

interface TypewriterProps {
  text: string;
  delay: number;
  isStoppedByUser: boolean;
  onTextAtCancel: Dispatch<SetStateAction<string>>;
  onIsCharacterTypewritten: Dispatch<SetStateAction<boolean>>;
  onIsTypewriterRunning: Dispatch<SetStateAction<boolean>>;
}

export default TypewriterProps;
