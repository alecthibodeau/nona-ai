import { useState } from 'react';

/* Components */
import Loader from './Loader';
import NonaIcon from './NonaIcon';
import Typewriter from './Typewriter';

/* Interfaces */
import CardProps from '../interfaces/CardProps';

/* Constants */
import stringValues from '../constants/string-values';

function Card(props: CardProps) {
  const [cardText, setCardText] = useState<string>(props.textContent);
  const { cardVariantNames: { variantNameResult } } = stringValues;

  return (
    <div className={`card-row ${props.variantName}`}>
      <div className="card">
        {props.variantName === variantNameResult ? <NonaIcon color="yellow" /> : null}
        <div className={`card-text ${props.variantName}`}>
          <div>
            {
              props.variantName === variantNameResult && props.isLastCard ?
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
                    onTextAtCancel={(text) => {
                      setCardText(text.toString());
                      props.onUpdateTextContent(text.toString());
                    }}
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
