import { useState, useEffect } from 'react';

/* Interfaces */
import TypewriterProps from '../interfaces/TypewriterProps';

function Typewriter(props: TypewriterProps): JSX.Element {
  const [currentText, setCurrentText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCharacterTypewritten, setIsCharacterTypewritten] = useState<boolean>(false);
  const delay: number = 25;
  const delayDynamic: number = 50 - currentIndex > 0 ? 50 - currentIndex : 0;
  const isTypewriterDelayDynamic: boolean = true;

  useEffect(() => {
    if (currentIndex < props.text.length) {
      const timeout: number = setTimeout(() => {
        setCurrentText(previousText => previousText + props.text[currentIndex]);
        setCurrentIndex(previousIndex => previousIndex + 1);
        setIsCharacterTypewritten(!isCharacterTypewritten);
        props.onIsCharacterTypewritten(isCharacterTypewritten);
        props.onIsTypewriterRunning(currentIndex !== props.text.length - 1);
      }, isTypewriterDelayDynamic ? delayDynamic : delay);
      if (props.isStoppedByUser) {
        clearTimeout(timeout);
        props.onTextAtCancel(currentText);
        props.onIsTypewriterRunning(false);
      }
      return () => clearTimeout(timeout);
    }},
    [
      props,
      isCharacterTypewritten,
      currentIndex,
      currentText,
      isTypewriterDelayDynamic,
      delayDynamic
    ]
  );

  return (
    <>
      {currentText}
    </>
  );
}

export default Typewriter;
