import { useState } from 'react';

/* Components */
import Typewriter from './Typewriter';

/* Interfaces */
import CardProps from '../interfaces/CardProps';

/* Constants */
import text from '../constants/text';

function Card(props: CardProps) {
  const [IsStopTypewriterButtonShown, setIsStopTypewriterButtonShown] = useState<boolean>(false);
  const [isTypewriterStoppedByUser, setIsTypewriterStoppedByUser] = useState<boolean>(false);
  const { characterVectorOrCrossProduct, result } = text;

  return (
    <div
      className={`card-row ${props.variant}`}
    >
      <div className="card">
        {
          props.variant === result ?
          <div className="card-icon-outer">
            <div className="card-icon-inner"></div>
          </div> :
          null
        }
        <div className={`card-text ${props.variant}`}>
          {
            props.variant === result ?
            <Typewriter
              text={props.text}
              delay={40}
              isStoppedByUser={isTypewriterStoppedByUser}
              onIsCharacterTypewritten={(isTypewritten) => props.onIsCharacterTypewritten(isTypewritten)}
              onIsTypewriterRunning={(isRunning) => setIsStopTypewriterButtonShown(isRunning)}
            /> :
            props.text
          }
          {
            props.variant === result && IsStopTypewriterButtonShown ?
            <div className="cancel-button-container">
              <button
                className="cancel-button"
                onClick={() => {
                  setIsTypewriterStoppedByUser(true);
                  setIsStopTypewriterButtonShown(false);
                }}>
                <span className="cancel-button-icon">
                  {characterVectorOrCrossProduct}
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
