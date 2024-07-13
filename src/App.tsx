import { useEffect, useRef, useState } from 'react';

/* Components */
import Card from './components/Card';
import Header from './components/Header';
import UserPrompt from './components/UserPrompt';

/* Interfaces */
import CardProps from './interfaces/CardProps';

/* Constants */
import text from './constants/text';
import mockData from './constants/mock-data';

function App() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const [isCharacterTypewritten, setIsCharacterTypewritten] = useState<boolean>(false);
  const [isTypewriterRunning, setIsTypewriterRunning] = useState<boolean>(false);
  const [isUserEventHappening, setIsUserEventHappening] = useState<boolean>(false);
  const cardsScrollRef = useRef<HTMLDivElement | null>(null);
  const { pleaseTryAgain, prompt, result } = text;
  const allButLettersAndNumbers: RegExp = /[^a-zA-Z0-9]/g;
  const isMockDataUsed: boolean = false;

  useEffect(() => {
    if (isMockDataUsed) {
      const mockCards = mockData.map((data, index) => {
        return {
          text: data,
          variant: index % 2 ? result : prompt,
          onIsCharacterTypewritten: setIsCharacterTypewritten,
          onIsTypewriterRunning: setIsTypewriterRunning
        };
      });
      setCards(mockCards);
    }
  }, [isAwaitingResponse, isMockDataUsed, prompt, result]);

  useEffect(() => {
    if (isAwaitingResponse || (isTypewriterRunning && !isUserEventHappening)) {
      const container = cardsScrollRef.current;
      if (container) container.scrollTop = container.scrollHeight;
    }
  }, [isAwaitingResponse, isCharacterTypewritten, isTypewriterRunning, isUserEventHappening]);

  useEffect(() => {
    if (isTypewriterRunning) {
      const userEvents: string[] = ['mousemove', 'mousedown', 'keydown'];
      userEvents.forEach(event => {
        window.addEventListener(event, handleUserEvent);
      });
      return () => {
        userEvents.forEach(event => {
          window.removeEventListener(event, handleUserEvent);
        });
        setIsUserEventHappening(false);
      }
    }
  }, [isTypewriterRunning]);

  function handleUserEvent(): void {
    setIsUserEventHappening(true);
  }

  function updateCards(cardText: string, cardVariant: string): void {
    if (cardVariant === result && !cardText) cardText = pleaseTryAgain;
    const card: CardProps = {
      text: cardText,
      variant: cardVariant,
      onIsCharacterTypewritten: setIsCharacterTypewritten,
      onIsTypewriterRunning: setIsTypewriterRunning
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
        onIsCharacterTypewritten={(isTypewritten) => setIsCharacterTypewritten(isTypewritten)}
        onIsTypewriterRunning={(isRunning) => setIsTypewriterRunning(isRunning)}
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
          onIsAwaitingResponse={(isAwaiting) => setIsAwaitingResponse(isAwaiting)}
        />
      </main>
    </div>
  );
}

export default App;
