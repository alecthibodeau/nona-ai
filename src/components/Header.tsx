/* Interfaces */
import HeaderProps from '../interfaces/HeaderProps';

/* Constants */
import stringValues from '../constants/string-values';

function Header(props: HeaderProps) {
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
        <div className="message-container">
          <div className="message-text">
            Please use <a href="https://github.com/alecthibodeau/nona-ai/blob/main/README.md">these
            steps</a> to configure your <span className="chrome-dev">Chrome Dev</span> browser.
          </div>
          <button className="button-close" onClick={closeMessage}>
            <span className="close-character">
              {characterVectorOrCrossProduct}
            </span>
          </button>
        </div> :
        null
      }
    </header>
  );
}

export default Header;
