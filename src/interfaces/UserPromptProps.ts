import { Dispatch, SetStateAction } from 'react';

interface UserPromptProps {
  isTypewriterRunningFromCard: boolean;
  onIsAwaitingResponse: Dispatch<SetStateAction<boolean>>;
  onIsTypewriterCanceled: Dispatch<SetStateAction<boolean>>;
  onUpdatePrompt: Dispatch<SetStateAction<string>>;
  onUpdateResult: Dispatch<SetStateAction<string>>;
}

export default UserPromptProps;
