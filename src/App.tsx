import { useEffect, useRef, useState } from 'react';

/* Components */
import Card from './components/Card';
import Header from './components/Header';
import UserPrompt from './components/UserPrompt';

/* Interfaces */
import CardProps from './interfaces/CardProps';

/* Constants */
import regularExpressions from './constants/regular-expressions';
import strings from './constants/strings';

function App() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const [isCharacterTypewritten, setIsCharacterTypewritten] = useState<boolean>(false);
  const [isTypewriterRunning, setIsTypewriterRunning] = useState<boolean>(false);
  const [isUserScrollEvent, setIsUserScrollEvent] = useState<boolean>(false);
  const cardsScrollRef = useRef<HTMLDivElement | null>(null);
  const { cardVariantValues, mockData, textForUser } = strings;
  const { allButLettersAndNumbers } = regularExpressions;
  const isMockDataUsed: boolean = false;

  useEffect(() => {
    if (isMockDataUsed) {
      const mockCards = mockData.map((data, index) => {
        return {
          text: data,
          variant: index % 2 ? cardVariantValues.result : cardVariantValues.prompt,
          onIsCharacterTypewritten: setIsCharacterTypewritten,
          onIsTypewriterRunning: setIsTypewriterRunning
        };
      });
      setCards(mockCards);
    }
  }, [isMockDataUsed, mockData, cardVariantValues.result, cardVariantValues.prompt]);

  useEffect(() => {
    if (isAwaitingResponse || (isTypewriterRunning && !isUserScrollEvent)) {
      const container = cardsScrollRef.current;
      if (container) container.scrollTop = container.scrollHeight;
    }
  }, [isAwaitingResponse, isCharacterTypewritten, isTypewriterRunning, isUserScrollEvent]);

  useEffect(() => {
    if (isTypewriterRunning) {
      const keydown: keyof WindowEventMap = 'keydown';
      window.addEventListener(keydown, handleKeyDown);
      return () => {
        window.removeEventListener(keydown, handleKeyDown);
        setIsUserScrollEvent(false);
      }
    }
  }, [isTypewriterRunning]);

  function handleKeyDown(event: KeyboardEvent): void {
    const scrollKeys: string[] = ['ArrowUp', 'ArrowDown', 'End', 'Home', 'PageUp', 'PageDown'];
    if (scrollKeys.includes(event.key)) setIsUserScrollEvent(true);
  }

  function handleMouseWheel(event: React.WheelEvent<HTMLDivElement>): void {
    if (event.deltaY && isTypewriterRunning) setIsUserScrollEvent(true);
  }

  function updateCards(cardText: string, cardVariant: string): void {
    if (cardVariant === cardVariantValues.result && !cardText) cardText = textForUser.pleaseTryAgain;
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
          <div ref={cardsScrollRef} className="cards-scroll" onWheel={handleMouseWheel}>
            {cards.map(renderCard)}
          </div>
        </div>
        <UserPrompt
          onUpdatePrompt={(promptText) => {
            updateCards(promptText.toString(), cardVariantValues.prompt);
          }}
          onUpdateResult={(resultText) => {
            updateCards(resultText.toString(), cardVariantValues.result);
          }}
          onIsAwaitingResponse={(isAwaiting) => {
            setIsAwaitingResponse(isAwaiting);
          }}
        />
      </main>
    </div>
  );
}

export default App;
