import { useCallback, useEffect, useRef, useState } from 'react';

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

function App(): JSX.Element {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [colorTheme, setColorTheme] = useState<string>(stringValues.colorThemeOptions[0]);
  const [mostRecentPromptSaved, setMostRecentPromptSaved] = useState<string>('');
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const [isCharacterTypewritten, setIsCharacterTypewritten] = useState<boolean>(false);
  const [isMessageDisplayed, setIsMessageDisplayed] = useState<boolean>(true);
  const [isTypewriterCanceled, setIsTypewriterCanceled] = useState<boolean>(false);
  const [isTypewriterRunning, setIsTypewriterRunning] = useState<boolean>(false);
  const [isUserScrollEvent, setIsUserScrollEvent] = useState<boolean>(false);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    cardVariantNames: { variantNamePrompt, variantNameResult },
    localStorageKeyHistory,
    messagingForUser: { messageTextCardTryAgain },
    mockData
  } = stringValues;
  const { allButLettersAndNumbers } = regularExpressions;
  const isMockDataUsed: boolean = false;
  const isDropdownMenuActive: boolean = false;
  const isPromptEnabled: boolean = true;

  const makeMockCards = useCallback(() => {
    return mockData.map((cardText, index) => {
      return {
        textContent: cardText,
        variantName: index % 2 ? variantNameResult : variantNamePrompt,
        isAwaitingResponse: false,
        isLastCard: false,
        isTypewriterCanceledFromUserPrompt: false,
        onIsCharacterTypewritten: () => {},
        onIsTypewriterRunning: () => {},
        onUpdateTextContent: () => {}
      };
    });
  }, [mockData, variantNamePrompt, variantNameResult]);

  useEffect(() => {
    const storedHistory = localStorage.getItem(localStorageKeyHistory);
    if (storedHistory) {
      const userHistory: UserHistoryProps = JSON.parse(storedHistory);
      setCards(userHistory.cards);
      setIsMessageDisplayed(userHistory.isMessageDisplayed);
      setMostRecentPromptSaved(userHistory.mostRecentPrompt);
      localStorage.removeItem(localStorageKeyHistory);
      const container = cardsContainerRef.current;
      if (container) setTimeout(() => {
        container.scrollTop = container.scrollHeight
      }, 50);
    }
    if (isMockDataUsed) setCards(makeMockCards);
  }, [localStorageKeyHistory, isMockDataUsed, makeMockCards]);

  useEffect(() => {
    const lastCard = cards[cards.length - 1];
    if (
      !isAwaitingResponse &&
      lastCard &&
      lastCard.variantName === variantNameResult &&
      lastCard.textContent === ''
    ) {
      setCards(previousCards => previousCards.slice(0, -1));
    }
  }, [cards, isAwaitingResponse, variantNameResult]);

  useEffect(() => {
    if (isAwaitingResponse || (isTypewriterRunning && !isUserScrollEvent)) {
      const container = cardsContainerRef.current;
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
      if (!cardText) cardText = messageTextCardTryAgain;
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
      onIsTypewriterRunning: setIsTypewriterRunning,
      onUpdateTextContent: () => {}
    };
  }

  function generateKey(text: string, index: number): string {
    const sequence: string = text.replace(allButLettersAndNumbers, '');
    return `key${index}${text.length > 9 ? sequence.slice(0, 9) : sequence}`;
  }

  function updateCardText(cardText: string, cardIndex: number): void {
    const updatedCards = [...cards];
    updatedCards[cardIndex].textContent = cardText;
    setCards(updatedCards);
  }

  function renderCard(card: CardProps, index: number): JSX.Element {
    return (
      <Card
        key={generateKey(card.textContent, index)}
        textContent={card.textContent}
        variantName={card.variantName}
        isAwaitingResponse={isAwaitingResponse}
        isLastCard={isMockDataUsed ? true : index === cards.length - 1}
        isTypewriterCanceledFromUserPrompt={isTypewriterCanceled}
        onIsCharacterTypewritten={(isTypewritten) => setIsCharacterTypewritten(isTypewritten)}
        onIsTypewriterRunning={(isRunning) => setIsTypewriterRunning(isRunning)}
        onUpdateTextContent={(text) => updateCardText(text.toString(), index)}
      />
    );
  }

  return (
    <div className="app">
      <Header
        isMessageDisplayed={isMessageDisplayed}
        isPromptEnabled={isPromptEnabled}
        onUpdateMessageDisplayed={(isDisplayed) => setIsMessageDisplayed(isDisplayed)}
        onUpdateColorTheme={(theme) => setColorTheme(theme)}
      />
      <main className="main">
        <div
          ref={cardsContainerRef}
          className="cards-container"
          onWheel={handleMouseWheel}
        >
          {cards.map(renderCard)}
        </div>
        {isDropdownMenuActive ? <div>{colorTheme}</div> : null}
        {isPromptEnabled ?
          <UserPrompt
            cardsSaved={cards}
            mostRecentPromptSaved={mostRecentPromptSaved}
            isMessageDisplayed={isMessageDisplayed}
            isTypewriterRunningFromCard={isTypewriterRunning}
            onUpdatePrompt={(text) => updateCards(text.toString(), variantNamePrompt)}
            onUpdateResult={(text) => updateCards(text.toString(), variantNameResult)}
            onIsAwaitingResponse={(isAwaiting) => setIsAwaitingResponse(isAwaiting)}
            onIsTypewriterCanceled={(isCanceled) => {
              setIsTypewriterCanceled(isCanceled);
              setIsTypewriterRunning(isCanceled);
            }}
          /> :
        null}
      </main>
    </div>
  );
}

export default App;
