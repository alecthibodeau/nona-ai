import { useEffect, useRef, useState } from 'react';

/* Components */
import Header from './components/Header';
import UserPrompt from './components/UserPrompt';

/* Constants */
import text from './constants/text';
import mockData from './constants/mock-data';

/* Interfaces */
import Card from './interfaces/Card';

/* Styles */
import './App.css';

function App() {
  const [cards, setCards] = useState<Card[]>(mockData.variantsCardsLoremIpsum);
  const cardsScrollRef = useRef<HTMLDivElement | null>(null);
  const { pleaseTryAgain, prompt, result } = text;

  useEffect(() => {
    const container = cardsScrollRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [cards]);

  function updateCards(cardText: string, textVariant: string): void {
    if (textVariant === result && !cardText) cardText = pleaseTryAgain;
    const card: Card = { text: cardText, variant: textVariant };
    setCards(previousCards => [...previousCards, card]);
  }

  function generateCardRowKey(cardText: string, cardRowIndex: number) {
    let cardSequence: string;
    if (cardText.length > 9) {
      cardSequence = cardText.replace(/ /g, '').slice(0, 9);
    } else {
      cardSequence = cardText;
    }
    return `cardRow${cardRowIndex}${cardSequence}`;
  }

  function renderCard(card: Card, index: number): JSX.Element {
    return (
      <div
        key={generateCardRowKey(card.text, index)}
        className={`card-row ${card.variant}`}
      >
        <div className="card">
          {card.variant === result ? <div>ICON</div> : null}
          <div
            className={`card-text ${card.variant}`}
          >
            <p>{card.text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main>
        <div className="cards-container">
          <div ref={cardsScrollRef} className="cards-scroll">
            {cards.map(renderCard)}
          </div>
        </div>
        <UserPrompt
          onUpdatePrompt={(promptText) => updateCards(promptText.toString(), prompt)}
          onUpdateResult={(resultText) => updateCards(resultText.toString(), result)}
        />
      </main>
    </div>
  );
}

export default App;
