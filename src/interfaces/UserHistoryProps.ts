/* Interfaces */
import CardProps from './CardProps';

interface UserHistoryProps {
  cards: CardProps[];
  isMessageDisplayed: boolean;
  mostRecentPrompt: string;
}

export default UserHistoryProps;
