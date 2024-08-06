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
        <div className={`message-background${window.ai ? ' connected' : ''}`}>
          <div className="message-container">
            {
              window.ai ?
              <span className="message-text">
                You are connected to Gemini Nano. See <a href={`${readmeLink}#using-nona-ai`}>using Nona AI</a>.
              </span> :
              <span className="message-text">
                Please use a <span className="chrome-dev">Chrome Dev</span> browser
                to get results from Nona AI. <a href={`${readmeLink}#nona-ai`}>How to configure</a>.
              </span>
            }
            {
              window.ai ?
              <button className="button-close" onClick={closeMessage}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 420 420"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points={svgPaths.closingX} />
                </svg>
              </button> :
              null
            }
          </div>
        </div> :
        null
      }
    </header>
  );
}

export default Header;
