import { useState } from 'react';

/* Components */
import Typewriter from './Typewriter';

/* Interfaces */
import CardProps from '../interfaces/CardProps';

/* Constants */
import strings from '../constants/strings';

function Card(props: CardProps) {
  const [cardText, setCardText] = useState<string>(props.text);
  const {cardVariantValues } = strings;

  return (
    <div className={`card-row ${props.variant}`}>
      <div className="card">
        {
          props.variant === cardVariantValues.result ?
          <div className="icon-container">
            <div className="icon-flow">
              {Array(9).fill('icon-circle').map((dot, index) => {
                return (<div key={`${dot}${index}`} className={dot}></div>);
              })}
            </div>
          </div> :
          null
        }
        <div className={`card-text ${props.variant}`}>
          <div>
            {
              props.variant === cardVariantValues.result ?
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
              /> :
              cardText
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
