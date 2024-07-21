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
  const { cardVariantValues: { vartiantNamePrompt, vartiantNameResult }, mockData, textForUser } = strings;
  const { allButLettersAndNumbers } = regularExpressions;
  const isMockDataUsed: boolean = false;

  useEffect(() => {
    if (isMockDataUsed) {
      const mockCards = mockData.map((data, index) => {
        return {
          text: data,
          variant: index % 2 ? vartiantNameResult : vartiantNamePrompt,
          isAwaitingResponse: isAwaitingResponse,
          isLastCard: true,
          isTypewriterCanceledFromUserPrompt: isTypewriterCanceled,
          onIsCharacterTypewritten: setIsCharacterTypewritten,
          onIsTypewriterRunning: setIsTypewriterRunning
        };
      });
      setCards(mockCards);
    }
  }, [isMockDataUsed, isAwaitingResponse, isTypewriterCanceled, mockData, vartiantNameResult, vartiantNamePrompt]);

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
    if (cardVariant === vartiantNamePrompt) {
      setCards(previousCards => [...previousCards,prepCard(cardText, cardVariant)]);
      setCards(previousCards => [...previousCards,prepCard('', vartiantNameResult)]);
    } else if (cardVariant === vartiantNameResult) {
      if (!cardText) cardText = textForUser.pleaseTryAgain;
      setCards(previousCards => {
        const updatedCards = [...previousCards];
        updatedCards[updatedCards.length - 1].text = cardText;
        return updatedCards;
      });
    }
  }

  function prepCard(text: string, variantName: string): CardProps {
    return {
      text: text,
      variant: variantName,
      isAwaitingResponse: isAwaitingResponse,
      isLastCard: false,
      isTypewriterCanceledFromUserPrompt: isTypewriterCanceled,
      onIsCharacterTypewritten: setIsCharacterTypewritten,
      onIsTypewriterRunning: setIsTypewriterRunning
    };
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
        isAwaitingResponse={isAwaitingResponse}
        isLastCard={isMockDataUsed ? true : index === cards.length - 1}
        isTypewriterCanceledFromUserPrompt={isTypewriterCanceled}
        onIsCharacterTypewritten={(isTypewritten) => setIsCharacterTypewritten(isTypewritten)}
        onIsTypewriterRunning={(isRunning) => setIsTypewriterRunning(isRunning)}
      />
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="main-content">
          <div className="cards-container">
            <div
              ref={cardsScrollRef}
              className="cards-scroll"
              onWheel={handleMouseWheel}
            >
              {cards.map(renderCard)}
            </div>
          </div>
          <UserPrompt
            isTypewriterRunningFromCard={isTypewriterRunning}
            onUpdatePrompt={(text) => updateCards(text.toString(), vartiantNamePrompt)}
            onUpdateResult={(text) => updateCards(text.toString(), vartiantNameResult)}
            onIsAwaitingResponse={(isAwaiting) => {
              setIsAwaitingResponse(isAwaiting);
            }}
            onIsTypewriterCanceled={(isCanceled) => {
              setIsTypewriterCanceled(isCanceled);
              setIsTypewriterRunning(isCanceled);
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
