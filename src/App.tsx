import { useState } from 'react';

/* Components */
import UserPrompt from './components/UserPrompt';

/* Styles */
import './App.css';

function App() {
  const [result, setResult] = useState<string>('');
  const [isAwaitingResult, setIsAwaitingResult] = useState<boolean>(false);
  const pleaseTryAgain: string = 'It looks like there was a problem finding an answer for you. Please try again.';

  return (
    <>
      <main>
        {result ? <p>{result === '' ? pleaseTryAgain : result}</p> : null}
        {isAwaitingResult ? <div></div> : null}
      </main>
      <UserPrompt
        onUpdateIsAwaitingResult={setIsAwaitingResult}
        onUpdateResult={setResult}
      />
    </>
  );
}

export default App;
