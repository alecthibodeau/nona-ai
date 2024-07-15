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
  const [isTypewriterCanceled, setIsTypewriterCanceled] = useState<boolean>(false);
  const [isTypewriterRunning, setIsTypewriterRunning] = useState<boolean>(false);
  const [isUserScrollEvent, setIsUserScrollEvent] = useState<boolean>(false);
  const cardsScrollRef = useRef<HTMLDivElement | null>(null);
  const { cardVariantValues: { textPrompt, textResult }, mockData, textForUser } = strings;
  const { allButLettersAndNumbers } = regularExpressions;
  const isMockDataUsed: boolean = true;

  useEffect(() => {
    if (isMockDataUsed) {
      const mockCards = mockData.map((data, index) => {
        return {
          text: data,
          variant: index % 2 ? textResult : textPrompt,
          isTypewriterCanceledFromUserPrompt: isTypewriterCanceled,
          onIsCharacterTypewritten: setIsCharacterTypewritten,
          onIsTypewriterRunning: setIsTypewriterRunning
        };
      });
      setCards(mockCards);
    }
  }, [isMockDataUsed, isTypewriterCanceled, mockData, textResult, textPrompt]);

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
    if (cardVariant === textResult && !cardText) {
      cardText = textForUser.pleaseTryAgain;
    }
    const card: CardProps = {
      text: cardText,
      variant: cardVariant,
      isTypewriterCanceledFromUserPrompt: isTypewriterCanceled,
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
        isTypewriterCanceledFromUserPrompt={isTypewriterCanceled}
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
          isTypewriterRunningFromCard={isTypewriterRunning}
          onUpdatePrompt={(textPrompt) => {
            updateCards(textPrompt.toString(), textPrompt.toString());
          }}
          onUpdateResult={(textResult) => {
            updateCards(textResult.toString(), textResult.toString());
          }}
          onIsAwaitingResponse={(isAwaiting) => {
            setIsAwaitingResponse(isAwaiting);
          }}
          onIsTypewriterCanceled={(isCanceled) => {
            setIsTypewriterCanceled(isCanceled);
            setIsTypewriterRunning(isCanceled);
          }}
        />
      </main>
    </div>
  );
}

export default App;
