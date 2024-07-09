import { useEffect, useState } from 'react';

/* Components */
import UserPrompt from './components/UserPrompt';

/* Styles */
import './App.css';

function App() {
  const [result, setResult] = useState<string>('');
  const [isAwaitingResult, setIsAwaitingResult] = useState<boolean>(false);
  // const pleaseTryAgain: string = 'It looks like there was a problem finding an answer for you. Please try again.';
  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    if (result) setCards(cards.concat(result));
  }, [result]);

  function renderCard(text: string, index: number) {
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
    <>
      <main>
        {isAwaitingResult ? <div></div> : null}
        <div className="card-container">
          {cards.map(renderCard)}
        </div>
        <UserPrompt
          onUpdateIsAwaitingResult={setIsAwaitingResult}
          onUpdatePrompt={(prompt) => {setCards(cards.concat(prompt.toString()))}}
          onUpdateResult={setResult}
        />
      </main>
    </>
  );
}

export default App;
