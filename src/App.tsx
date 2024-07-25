import { useEffect, useRef, useState } from 'react';

/* Components */
import Card from './components/Card';
import Header from './components/Header';
import UserPrompt from './components/UserPrompt';

/* Interfaces */
import CardProps from './interfaces/CardProps';
import UserHistoryProps from './interfaces/UserHistoryProps';

/* Constants */
import regularExpressions from './constants/regular-expressions';
import stringValues from './constants/string-values';

function App() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [mostRecentPromptSaved, setMostRecentPromptSaved] = useState<string>('');
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const [isCharacterTypewritten, setIsCharacterTypewritten] = useState<boolean>(false);
  const [isTypewriterCanceled, setIsTypewriterCanceled] = useState<boolean>(false);
  const [isTypewriterRunning, setIsTypewriterRunning] = useState<boolean>(false);
  const [isUserScrollEvent, setIsUserScrollEvent] = useState<boolean>(false);
  const cardsScrollRef = useRef<HTMLDivElement | null>(null);
  const {
    cardVariantNames: { variantNamePrompt, variantNameResult },
    localStorageKeyHistory,
    messagingForUser: { messageTextTryAgain },
    mockData
  } = stringValues;
  const { allButLettersAndNumbers } = regularExpressions;
  const isMockDataUsed: boolean = false;

  useEffect(() => {
    const storedHistory = localStorage.getItem(localStorageKeyHistory);
    if (storedHistory) {
      const userHistory: UserHistoryProps = JSON.parse(storedHistory);
      setCards(userHistory.cards);
      setMostRecentPromptSaved(userHistory.mostRecentPrompt);
      localStorage.removeItem(localStorageKeyHistory);
    }
  }, [localStorageKeyHistory]);

  useEffect(() => {
    if (isMockDataUsed) {
      const mockCards = mockData.map((data, index) => {
        return {
          textContent: data,
          variantName: index % 2 ? variantNameResult : variantNamePrompt,
          isAwaitingResponse: isAwaitingResponse,
          isLastCard: true,
          isTypewriterCanceledFromUserPrompt: isTypewriterCanceled,
          onIsCharacterTypewritten: setIsCharacterTypewritten,
          onIsTypewriterRunning: setIsTypewriterRunning
        };
      });
      setCards(mockCards);
    }
  }, [isMockDataUsed, isAwaitingResponse, isTypewriterCanceled, mockData, variantNameResult, variantNamePrompt]);

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
    if (cardVariant === variantNamePrompt) {
      setCards(previousCards => [...previousCards, prepCard(cardText, cardVariant)]);
      setCards(previousCards => [...previousCards, prepCard('', variantNameResult)]);
    } else if (cardVariant === variantNameResult) {
      if (!cardText) cardText = messageTextTryAgain;
      setCards(previousCards => {
        const updatedCards = [...previousCards];
        updatedCards[updatedCards.length - 1].textContent = cardText;
        return updatedCards;
      });
    }
  }

  function prepCard(cardText: string, cardVariant: string): CardProps {
    return {
      textContent: cardText,
      variantName: cardVariant,
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
        key={generateCardKey(card.textContent, index)}
        textContent={card.textContent}
        variantName={card.variantName}
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
        <div
          ref={cardsScrollRef}
          className="cards-container"
          onWheel={handleMouseWheel}
        >
          {cards.map(renderCard)}
        </div>
        <UserPrompt
            cardsSaved={cards}
            mostRecentPromptSaved={mostRecentPromptSaved}
            isTypewriterRunningFromCard={isTypewriterRunning}
            onUpdatePrompt={(text) => updateCards(text.toString(), variantNamePrompt)}
            onUpdateResult={(text) => updateCards(text.toString(), variantNameResult)}
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
