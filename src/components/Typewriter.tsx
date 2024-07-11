import { useState, useEffect } from 'react';

/* Interfaces */
import TypewriterProps from '../interfaces/TypewriterProps';

function Typewriter(props: TypewriterProps) {
  const [currentText, setCurrentText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCharacterTypewritten, setIsCharacterTypewritten] = useState<boolean>(false);

  useEffect(() => {
    if (currentIndex < props.text.length) {
      const timeout: number = setTimeout(() => {
        setCurrentText(previousText => previousText + props.text[currentIndex]);
        setCurrentIndex(previousIndex => previousIndex + 1);
        setIsCharacterTypewritten(!isCharacterTypewritten);
        props.onIsCharacterTypewritten(isCharacterTypewritten);
        props.onIsTypewriterRunning(currentIndex !== props.text.length - 1);
      }, props.delay);
      if (props.isStoppedByUser) clearTimeout(timeout);
      return () => clearTimeout(timeout);
    }
  }, [props, currentIndex, isCharacterTypewritten]);

  return (
    <>
      {currentText}
    </>
  );
}

export default Typewriter;
