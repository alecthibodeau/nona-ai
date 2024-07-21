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
  const [cardText, setCardText] = useState<string>(props.textContent);
  const { cardVariantValues: { vartiantNameResult } } = strings;

  return (
    <div className={`card-row ${props.variantName}`}>
      <div className="card">
        {props.variantName === vartiantNameResult ? <NonaIcon color="yellow" /> : null}
        <div className={`card-text ${props.variantName}`}>
          <div>
            {
              props.variantName === vartiantNameResult && props.isLastCard ?
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
