import { useState } from 'react';

/* Components */
import DropdownMenu from './DropdownMenu';

/* Interfaces */
import HeaderProps from '../interfaces/HeaderProps';

/* Constants */
import stringValues from '../constants/string-values';
import svgPaths from '../constants/svg-paths';

function Header(props: HeaderProps): JSX.Element {
  const [isCreditTextLoaded, setIsCreditTextLoaded] = useState<boolean>(false);
  const {
    messageTextHeaderDefault,
    messageTextHeaderUnavailable,
    messageTextHeaderCreditProject,
    messageTextHeaderCreditAuthor,
    messageTextHeaderCreditDescription
  } = stringValues.messagingForUser;
  const { readmeLink } = stringValues;
  const messageForUser: string = (
    props.isPromptEnabled ? messageTextHeaderDefault : messageTextHeaderUnavailable
  );
  const isDropdownMenuActive: boolean = false;

  function toggleMessage(): void {
    props.onUpdateMessageDisplayed(!props.isMessageDisplayed);
  }

  function onClickName(): void {
    if (!props.isMessageDisplayed || (props.isMessageDisplayed && isCreditTextLoaded)) {
      toggleMessage();
    }
    if (!isCreditTextLoaded) setIsCreditTextLoaded(true);
  }

  function onClickIcon(): void {
    if (!props.isMessageDisplayed || (props.isMessageDisplayed && !isCreditTextLoaded)) {
      toggleMessage();
    }
    if (isCreditTextLoaded) setIsCreditTextLoaded(false);
  }

  function creditMessage(): JSX.Element {
    return (
      <span>
        <span>{messageTextHeaderCreditProject}</span>
        <a href="https://alect.me">{messageTextHeaderCreditAuthor}</a>
        <span>{messageTextHeaderCreditDescription}</span>
      </span>
    );
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
        <button
          className="project-name"
          disabled={!props.isPromptEnabled}
          onClick={onClickName}>
            Nona AI
        </button>
        {isDropdownMenuActive ?
          <DropdownMenu
            options={stringValues.colorThemeOptions}
            onUpdateOption={(option) => props.onUpdateColorTheme(option)}
          /> :
        null}
        <button
          className="icon-outer"
          disabled={!props.isPromptEnabled}
          onClick={onClickIcon}
        >
          <div className="icon-inner"></div>
        </button>
      </div>
      {props.isMessageDisplayed ?
        <div className={
          `message-container${isCreditTextLoaded ? ' credit-background' : ''}`
        }>
          {props.isPromptEnabled ? buttonClose() : null}
          {isCreditTextLoaded ? creditMessage() : messageForUser}
          <a href={readmeLink}>README</a>
          <span>.</span>
        </div> :
      null}
    </header>
  );
}

export default Header;
