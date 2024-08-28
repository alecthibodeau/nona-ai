import { useState } from 'react';

/* Interfaces */
import DropdownMenuProps from '../interfaces/DropdownMenuProps';

function DropdownMenu(props: DropdownMenuProps): JSX.Element {
  const [dropdownValue, setDropdownValue] = useState<string>(props.options[0]);

  function handleSelectChange(value: string): void {
    setDropdownValue(value);
    props.onUpdateOption(value);
  }

  function renderOption(option: string): JSX.Element {
    return (
      <option key={`${option}Option`}>
        {option}
      </option>
    );
  }

  return (
    <div className="dropdown-container">
      <label>
        Mode
        <select
          value={dropdownValue}
          onChange={(event) => handleSelectChange(event.target.value)}
        >
          {props.options.map(renderOption)}
        </select>
      </label>
    </div>
  );
}

export default DropdownMenu;
