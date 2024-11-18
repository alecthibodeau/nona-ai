/* Components */
import DropdownMenu from './DropdownMenu';

/* Interfaces */
import HeaderProps from '../interfaces/HeaderProps';

/* Constants */
import stringValues from '../constants/string-values';
import svgPaths from '../constants/svg-paths';

function Header(props: HeaderProps): JSX.Element {
  const { readmeLink } = stringValues;
  const isDropdownMenuActive: boolean = false;

  function toggleMessage(): void {
    props.onUpdateMessageDisplayed(!props.isMessageDisplayed);
  }

  function buttonClose(): JSX.Element {
    return (
      <button className="button-close" onClick={toggleMessage}>
        <svg
          width="10"
          height="10"
          viewBox="0 0 420 420"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points={svgPaths.closingX} />
        </svg>
      </button>
    );
  }

  return (
    <header className="header">
      <div className="header-content">
        <button className="name" onClick={toggleMessage}>Nona AI</button>
        {isDropdownMenuActive ?
          <DropdownMenu
            options={stringValues.colorThemeOptions}
            onUpdateOption={(option) => props.onUpdateColorTheme(option)}
          /> :
        null}
        <button className="icon-outer" onClick={toggleMessage}>
          <div className="icon-inner"></div>
        </button>
      </div>
      {props.isMessageDisplayed ?
        <div className="message-container">
          {props.isPromptEnabled ? buttonClose() : null}
          {props.isPromptEnabled ?
            <span>
              Please review this project's <a href={readmeLink}>README
              </a>, including the section on how to configure
              your <span className="chrome-dev">Chrome</span> browser
              so that Nona AI can get results from Gemini Nano.
            </span> :
            <span>
              Nona AI's prompt interface is currently unavailable. Hopefully
              this will be sorted out soon. Meanwhile, see the
              project's <a href={readmeLink}>README</a>.
            </span>
          }
        </div> :
      null}
    </header>
  );
}

export default Header;
