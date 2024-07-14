import { useState } from 'react';

/* Components */
import Typewriter from './Typewriter';

/* Interfaces */
import CardProps from '../interfaces/CardProps';

/* Constants */
import strings from '../constants/strings';

function Card(props: CardProps) {
  const [isTypewriterRunning, setIsTypewriterRunning] = useState<boolean>(false);
  const [isTypewriterCanceled, setIsTypewriterCanceled] = useState<boolean>(false);
  const { unicodeCharacters, cardVariantValues } = strings;

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
                text={props.text}
                delay={40}
                isStoppedByUser={isTypewriterCanceled}
                onIsCharacterTypewritten={(isTypewritten) => {
                  props.onIsCharacterTypewritten(isTypewritten);
                }}
                onIsTypewriterRunning={(isRunning) => {
                  setIsTypewriterRunning(isRunning);
                  props.onIsTypewriterRunning(isRunning);
                }}
              /> :
              props.text
            }
          </div>
          {
            props.variant === cardVariantValues.result && isTypewriterRunning ?
            <div className="cancel-button-container">
              <button
                className="cancel-button"
                onClick={() => {
                  setIsTypewriterCanceled(true);
                  setIsTypewriterRunning(false);
                }}>
                <span className="cancel-button-icon">
                  {unicodeCharacters.characterVectorOrCrossProduct}
                </span>
              </button>
            </div> :
            null
          }
        </div>
      </div>
    </div>
  );
}

export default Card;
