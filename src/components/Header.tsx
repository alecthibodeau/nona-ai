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
                Nona AI is connected to Gemini Nano. <a href={`${readmeLink}#using-nona-ai`}>Read more</a> about using Nona AI.
              </span> :
              <span className="message-text">
                To get results from Nona AI please use a <span className="chrome-dev">Chrome Dev</span> browser that's configured with necessary experimental flags. <a href={`${readmeLink}#nona-ai`}>How to configure</a>.
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
