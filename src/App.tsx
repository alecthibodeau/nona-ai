import { useEffect, useRef, useState } from 'react';

/* Components */
import Header from './components/Header';
import UserPrompt from './components/UserPrompt';

/* Constants */
import text from './constants/text';
import mockData from './constants/mock-data';

/* Styles */
import './App.css';

function App() {
  const [cards, setCards] = useState<string[]>(mockData.cardsLoremIpsum);
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
        key={`cardRow${index}${text.length > 9 ? text.replace(/ /g, '').slice(0, 9) : text}`}
        className="card-row"
      >
        <div className="card">
          <div>ICON</div>
          <div
            className="card-text"
          >
            <p>{text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app" >
      <Header />
      <main>
        <div ref={containerRef} className="cards-container">
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
