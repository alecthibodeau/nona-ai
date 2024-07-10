import { useEffect, useRef, useState } from 'react';

/* Components */
import Header from './components/Header';
import UserPrompt from './components/UserPrompt';

/* Constants */
import text from './constants/text';
// import mockData from './constants/mock-data';

/* Interfaces */
import CardProps from './interfaces/CardProps';

/* Styles */
import './App.css';
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const cardsScrollRef = useRef<HTMLDivElement | null>(null);
  const { pleaseTryAgain, prompt, result } = text;
  const allButLettersAndNumbers: RegExp = /[^a-zA-Z0-9]/g;

  useEffect(() => {
    const container = cardsScrollRef.current;
    if (container) container.scrollTop = container.scrollHeight + 100;
  }, [cards]);

  function updateCards(cardText: string, cardVariant: string): void {
    if (cardVariant === result && !cardText) cardText = pleaseTryAgain;
    const card: CardProps = {
      text: cardText,
      variant: cardVariant
    };
    setCards(previousCards => [...previousCards, card]);
  }

  function generateCardKey(cardText: string, cardIndex: number): string {
    let cardSequence: string;
    if (cardText.length > 9) {
      cardSequence = cardText.replace(allButLettersAndNumbers, '').slice(0, 9);
    } else {
      cardSequence = cardText;
    }
    return `card${cardIndex}${cardSequence}`;
  }

  function renderCard(card: CardProps, index: number): JSX.Element {
    return (
      <Card
        key={generateCardKey(card.text, index)}
        text={card.text}
        variant={card.variant}
      />
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
