import { Dispatch, SetStateAction } from 'react';

interface UserPromptProps {
  onUpdatePrompt: Dispatch<SetStateAction<string>>;
  onUpdateResult: Dispatch<SetStateAction<string>>;
  onIsAwaitingResponse: Dispatch<SetStateAction<boolean>>;
}

export default UserPromptProps;
