/* Interfaces */
import Card from '../interfaces/CardProps';

const miscPrompts: Card[] = [
  { text: 'What\'s 2 + 2?', variant: 'prompt' },
  { text: '4', variant: 'result' },
  { text: 'What\'s red plus yellow?', variant: 'prompt' },
  { text: 'Red plus yellow is orange', variant: 'result' },
  { text: 'What are the states in New England?', variant: 'prompt' },
  { text: 'Connecticut - Maine - Massachusetts - New Hampshire - Rhode Island', variant: 'result' },
  { text: 'Who are the members of the Beatles?', variant: 'prompt' },
  { text: 'The Beatles are a legendary rock band that was formed in Liverpool, England, in 1960. The group\'s original members were: * **John Lennon** (1940-1980) - vocals, rhythm guitar * **Paul McCartney** (1942-present) - vocals, bass guitar * **George Harrison** (1943-2001) - vocals, guitar * **Ringo Starr** (1940-present) - vocals, drums Over the course of their career, the Beatles released 12 studio albums, which sold over 600 million copies worldwide and made them one of the best-selling music acts of all time. Their music and cultural impact have had a profound influence on popular music and popular culture.', variant: 'result' },
  { text: 'Write a paragraph about the sport of running.', variant: 'prompt' },
  { text: 'Running is one of the most popular and accessible sports in the world. It is a low-cost activity that anyone can do, and it can be enjoyed at any age. Running has many health benefits, including improved cardiovascular health, weight loss, and reduced stress. It can also be a great way to improve your mood and energy levels. There are many different types of running, from sprinting to leisurely walking, and it is important to find an activity that you enjoy and that you can maintain regularly. Whether you are looking for a way to get in shape or to improve your overall health, running is a great option.', variant: 'result' }
];

const mockData = {
  miscPrompts
};

export default mockData;
