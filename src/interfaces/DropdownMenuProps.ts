import { Dispatch, SetStateAction } from 'react';

interface DropdownMenuProps
{
  options: string[];
  onUpdateOption: Dispatch<SetStateAction<string>>;
}

export default DropdownMenuProps;
