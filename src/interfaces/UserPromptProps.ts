import { Dispatch, SetStateAction } from 'react';

interface UserPromptProps {
  onUpdateIsAwaitingResult: Dispatch<SetStateAction<boolean>>;
  onUpdatePrompt: Dispatch<SetStateAction<string>>;
  onUpdateResult: Dispatch<SetStateAction<string>>;
}

export default UserPromptProps;
