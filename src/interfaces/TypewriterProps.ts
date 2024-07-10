import { Dispatch, SetStateAction } from 'react';

interface TypewriterProps {
  text: string;
  delay: number;
  isStopped: boolean;
  onResultIsLoaded: Dispatch<SetStateAction<boolean>>;
}

export default TypewriterProps;
