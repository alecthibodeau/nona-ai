import { Dispatch, SetStateAction } from 'react';

interface UserPromptProps {
  onUpdatePrompt: Dispatch<SetStateAction<string>>;
  onUpdateResult: Dispatch<SetStateAction<string>>;
}

export default UserPromptProps;
