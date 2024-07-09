import { useEffect, useRef, useState } from 'react';

/* Components */
import Header from './components/Header';
import UserPrompt from './components/UserPrompt';

/* Constants */
import text from './constants/text';
// import mockData from './constants/mock-data';

/* Styles */
import './App.css';

function App() {
  const [cards, setCards] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { pleaseTryAgain, prompt, result } = text;

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [cards]);

  function updateCards(cardText: string, textType: string): void {
    if (textType === result && !cardText) cardText = pleaseTryAgain;
    setCards(previousCards => [...previousCards, cardText]);
  }

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
      <Header />
      <main>
        <div className="cards-container" ref={containerRef}>
          {cards.map(renderCard)}
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
