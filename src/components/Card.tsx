import { useState } from 'react';

/* Interfaces */
import CardProps from '../interfaces/CardProps';

/* Constants */
import text from '../constants/text';
import Typewriter from './Typewriter';

function Card(props: CardProps) {
  const [isResultDisplayStopped, setIsResultDisplayStopped] = useState<boolean>(false);
  const [isCancelButtonShown, setIsCancelButtonShown] = useState<boolean>(true);

  return (
    <div
      className={`card-row ${props.variant}`}
    >
      <div className="card">
        {
          props.variant === text.result ?
          <div className="card-icon-outer">
            <div className="card-icon-inner"></div>
          </div> :
          null
        }
        <div className={`card-text ${props.variant}`}>
          {
            props.variant === text.result ?
            <Typewriter
              text={props.text}
              delay={40}
              isStopped={isResultDisplayStopped}
              onResultIsLoaded={() => setIsCancelButtonShown(false)}
            /> :
            props.text
          }
          {
            props.variant === text.result && isCancelButtonShown ?
            <div className="cancel-button-container">
              <button
                className="cancel-button"
                onClick={() => {
                  setIsResultDisplayStopped(true);
                  setIsCancelButtonShown(false);
                }}>
                <span className="cancel-button-icon">
                  &#10799;
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
