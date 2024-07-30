import { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
  isMessageDisplayed: boolean;
  onUpdateMessageDisplayed: Dispatch<SetStateAction<boolean>>;
}

export default HeaderProps;
