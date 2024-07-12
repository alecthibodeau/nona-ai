import { useEffect, useRef, useState } from 'react';

/* Components */
import Card from './components/Card';
import Header from './components/Header';
import UserPrompt from './components/UserPrompt';

/* Constants */
import text from './constants/text';
import mockData from './constants/mock-data';

/* Interfaces */
import CardProps from './interfaces/CardProps';

/* Styles */
import './App.css';

function App() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [isCharacterTypewritten, setIsCharacterTypewritten] = useState<boolean>(false);
  const [isTypewriterRunning, setIsTypewriterRunning] = useState<boolean>(false);
  const [isUserEventHappeningDuringTypewriter, setIsUserEventHappeningDuringTypewriter] = useState<boolean>(false);
  const cardsScrollRef = useRef<HTMLDivElement | null>(null);
  const { pleaseTryAgain, prompt, result } = text;
  const allButLettersAndNumbers: RegExp = /[^a-zA-Z0-9]/g;
  const isMockDataUsed: boolean = false;

  useEffect(() => {
    if (isMockDataUsed) {
      const mockCards = mockData.miscPromptsAndResults.map((data) => {
        return {
          text: data.text,
          variant: data.variant,
          onIsCharacterTypewritten: setIsCharacterTypewritten,
          onIsTypewriterRunning: setIsTypewriterRunning
        };
      });
      setCards(mockCards);
    }
  }, [isMockDataUsed]);

  useEffect(() => {
    const container = cardsScrollRef.current;
    if (container && !isUserEventHappeningDuringTypewriter) container.scrollTop = container.scrollHeight;
  }, [cards, isCharacterTypewritten, isUserEventHappeningDuringTypewriter]);

  useEffect(() => {
    const userEvents: string[] = ['mousemove', 'mousedown', 'keydown'];
    if (isTypewriterRunning) {
      userEvents.forEach(event => {
        window.addEventListener(event, () => setIsUserEventHappeningDuringTypewriter(true));
      });
      return () => {
        userEvents.forEach(event => {
          window.removeEventListener(event, () => setIsUserEventHappeningDuringTypewriter(true));
        });
        setIsUserEventHappeningDuringTypewriter(false);
      }
    }
  }, [isTypewriterRunning]);

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
        />
      </main>
    </div>
  );
}

export default App;
