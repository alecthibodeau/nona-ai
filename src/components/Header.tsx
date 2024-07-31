/* Interfaces */
import HeaderProps from '../interfaces/HeaderProps';

/* Constants */
import stringValues from '../constants/string-values';

function Header(props: HeaderProps): JSX.Element {
  const { unicodeCharacters: { characterVectorOrCrossProduct } } = stringValues;

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
              If you haven't already, please <a href="https://github.com/alecthibodeau/nona-ai/blob/main/README.md">configure</a> your <span className="chrome-dev">Chrome Dev</span> browser.
            </span>
            <button className="button-close" onClick={closeMessage}>
              <span className="close-character">
                {characterVectorOrCrossProduct}
              </span>
            </button>
          </div>
        </div> :
        null
      }
    </header>
  );
}

export default Header;
