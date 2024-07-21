import { useState } from 'react';

/* Components */
import Loader from './Loader';
import NonaIcon from './NonaIcon';
import Typewriter from './Typewriter';

/* Interfaces */
import CardProps from '../interfaces/CardProps';

/* Constants */
import strings from '../constants/strings';

function Card(props: CardProps) {
  const [cardText, setCardText] = useState<string>(props.text);
  const { cardVariantValues: { vartiantNameResult } } = strings;

  return (
    <div className={`card-row ${props.variant}`}>
      <div className="card">
        {props.variant === vartiantNameResult ? <NonaIcon color="yellow" /> : null}
        <div className={`card-text ${props.variant}`}>
          <div>
            {
              props.variant === vartiantNameResult && props.isLastCard ?
              <>
                {
                  props.isAwaitingResponse ?
                  <Loader /> :
                  <Typewriter
                    text={cardText}
                    delay={25}
                    isStoppedByUser={props.isTypewriterCanceledFromUserPrompt}
                    onIsCharacterTypewritten={(isTypewritten) => {
                      props.onIsCharacterTypewritten(isTypewritten);
                    }}
                    onIsTypewriterRunning={(isRunning) => {
                      props.onIsTypewriterRunning(isRunning);
                    }}
                    onTextAtCancel={(text) => setCardText(text.toString())}
                  />
                }
              </> :
              cardText
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
