/* Interfaces */
import Card from '../interfaces/Card';

const cardsLoremIpsum: string[] = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.',
  'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
];

const variantsCardsLoremIpsum: Card[] = [
  { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', variant: 'prompt' },
  { text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', variant: 'result' },
  { text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.', variant: 'prompt' },
  { text: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.', variant: 'result' },
  { text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.', variant: 'prompt' },
  { text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', variant: 'result' },
  { text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', variant: 'prompt' },
  { text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.', variant: 'result' },
  { text: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', variant: 'prompt' },
  { text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', variant: 'result' }
];

const mockData = {
  cardsLoremIpsum,
  variantsCardsLoremIpsum
};

export default mockData;
