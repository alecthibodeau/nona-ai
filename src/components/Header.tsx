/* Interfaces */
import HeaderProps from '../interfaces/HeaderProps';

/* Constants */
import stringValues from '../constants/string-values';
import svgPaths from '../constants/svg-paths';

function Header(props: HeaderProps): JSX.Element {
  const { readmeLink } = stringValues;

  function closeMessage(): void {
    props.onUpdateMessageDisplayed(false);
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="name">Nona AI</div>
        <div className="icon-outer">
          <div className="icon-inner"></div>
        </div>
      </div>
      {
        props.isMessageDisplayed ?
        <div className="message-background">
          <div className="message-container">
            <span className="message-text">
              If you haven't already, please <a href={readmeLink}>configure
              </a> your <span className="chrome-dev">Chrome Dev</span> browser.
            </span>
            <button className="button-close" onClick={closeMessage}>
              <svg
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points={svgPaths.closingX} />
              </svg>
            </button>
          </div>
        </div> :
        null
      }
    </header>
  );
}

export default Header;
