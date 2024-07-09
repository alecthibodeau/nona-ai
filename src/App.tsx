import { useEffect, useRef, useState } from 'react';

/* Components */
import UserPrompt from './components/UserPrompt';

/* Styles */
import './App.css';

function App() {
  const [result, setResult] = useState<string>('');
  const [isAwaitingResult, setIsAwaitingResult] = useState<boolean>(false);
  // const pleaseTryAgain: string = 'It looks like there was a problem finding an answer for you. Please try again.';
  const [cards, setCards] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (result) setCards(cards.concat(result));
    setResult('');
  }, [result]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [cards]);

  function renderCard(text: string, index: number): JSX.Element {
    return (
      <div
        key={`card${index}${text.length > 9 ? text.substring(0, 11) : text}`}
        className="card"
      >
        <p>{text}</p>
      </div>
    );
  }

  return (
    <div className="app" >
      <header>HEADER</header>
      <main>
        {isAwaitingResult ? <div></div> : null}
        <div className="cards-container" ref={containerRef}>
          {cards.map(renderCard)}
        </div>
        <UserPrompt
          onUpdateIsAwaitingResult={setIsAwaitingResult}
          onUpdatePrompt={(prompt) => {setCards(cards.concat(prompt.toString()))}}
          onUpdateResult={setResult}
        />
      </main>
    </div>
  );
}

export default App;
