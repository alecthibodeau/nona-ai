import { Dispatch, SetStateAction } from 'react';

interface CardProps {
  text: string;
  variant: string;
  onIsCharacterTypewritten: Dispatch<SetStateAction<boolean>>;
}

export default CardProps;
