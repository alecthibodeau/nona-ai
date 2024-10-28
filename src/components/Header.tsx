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

  function closeMessage(): void {
    props.onUpdateMessageDisplayed(false);
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="name">Nona AI</div>
        {isDropdownMenuActive ?
          <DropdownMenu
            options={stringValues.colorThemeOptions}
            onUpdateOption={(option) => props.onUpdateColorTheme(option)}
          /> : null}
        <div className="icon-outer">
          <div className="icon-inner"></div>
        </div>
      </div>
      {
        props.isMessageDisplayed ?
        <div className="message-background">
          {
            props.isPromptEnabled ?
            <div className="message-container">
              <button className="button-close" onClick={closeMessage}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 420 420"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points={svgPaths.closingX} />
                </svg>
              </button>
              <span className="message-text">
                Please review this project's <a href={readmeLink}>README
                </a>, including the section on how to configure
                your <span className="chrome-dev">Chrome</span> browser
                so that Nona AI can get results from Gemini Nano.
              </span>
            </div> :
            <div className="unavailable-message">
              Due to an unexpected API change Nona AI's prompt interface is currently
              unavailable. Hopefully this will be sorted out soon. Meanwhile,
              see the project <a href={readmeLink}>README</a>.
            </div>
          }
        </div> :
        null
      }
    </header>
  );
}

export default Header;
