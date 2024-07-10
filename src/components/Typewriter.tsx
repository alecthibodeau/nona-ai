import { useState, useEffect } from 'react';

/* Interfaces */
import TypewriterProps from '../interfaces/TypewriterProps';

function Typewriter(props: TypewriterProps) {
  const [currentText, setCurrentText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < props.text.length) {
      const timeout: number = setTimeout(() => {
        setCurrentText(previousText => previousText + props.text[currentIndex]);
        setCurrentIndex(previousIndex => previousIndex + 1);
      }, props.delay);
      if (props.isStopped) clearTimeout(timeout);
      if (currentIndex === props.text.length - 1) props.onResultIsLoaded(true);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, props, props.delay, props.text, props.isStopped]);

  return (
    <span>{currentText}</span>
  );
}

export default Typewriter;
