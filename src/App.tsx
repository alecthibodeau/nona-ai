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

  useEffect(() => {
    const container = cardsScrollRef.current;
    if (container) container.scrollTop = container.scrollHeight + 100;
    console.log('cards:', cards)
  }, [cards]);

  function updateCards(cardText: string, cardVariant: string): void {
    if (cardVariant === result && !cardText) cardText = pleaseTryAgain;
    const card: CardProps = {
      text: cardText,
      variant: cardVariant
    };
    setCards(previousCards => [...previousCards, card]);
  }

  function renderCard(card: CardProps): JSX.Element {
    return (
      <Card text={card.text} variant={card.variant} />
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
