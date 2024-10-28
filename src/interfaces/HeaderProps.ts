import { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
  isMessageDisplayed: boolean;
  isPromptEnabled: boolean;
  onUpdateMessageDisplayed: Dispatch<SetStateAction<boolean>>;
  onUpdateColorTheme: Dispatch<SetStateAction<string>>;
}

export default HeaderProps;
