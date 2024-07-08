import { Dispatch, SetStateAction } from 'react';

interface UserPromptProps {
  onUpdateIsAwaitingResult: Dispatch<SetStateAction<boolean>>;
  onUpdateResult: Dispatch<SetStateAction<string>>;
}

export default UserPromptProps;
