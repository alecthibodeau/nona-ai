/* Interfaces */
import CardProps from '../interfaces/CardProps';

/* Constants */
import text from '../constants/text';

function Card(props: CardProps) {
  const allButLettersAndNumbers: RegExp = /[^a-zA-Z0-9]/g;

  function generateCardRowKey(cardText: string) {
    let cardSequence: string;
    if (cardText.length > 9) {
      cardSequence = cardText.replace(allButLettersAndNumbers, '').slice(0, 9);
    } else {
      cardSequence = cardText;
    }
    return `cardRow${cardSequence}`;
  }

  return (
    <div
      key={generateCardRowKey(props.text)}
      className={`card-row ${props.variant}`}
    >
      <div className="card">
        {props.variant === text.result ? <div>ICON</div> : null}
        <div
          className={`card-text ${props.variant}`}
        >
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
