const cardVariantNames: { [key: string]: string } = {
  variantNamePrompt: 'prompt',
  variantNameResult: 'result'
};

const consoleMessage: { [key: string]: string } = {
  text: '%cPlease note: Nona AI is an experimental site that currently requires using the Chrome Dev browser for connecting with Gemini Nano. Any "preloaded / not used" warnings you see here in the console are probably only appearing in Chrome Dev. These warnings are likely caused by how Google Fonts and Vite interact in this particular browser. Despite these warning Nona AI\'s fonts may be loading as expected. Future updates to Chrome Dev, Google Fonts, Vite or Nona AI might eliminate these warnings (as might Gemini Nano being made available in Google Chrome).',
  properties: 'font-size: 12px; background: #00f; color: #fff'
}

const keyboardKeys: { [key: string]: string } = {
  keyArrowUp: 'ArrowUp',
  keyBackspace: 'Backspace',
  keyDelete: 'Delete',
  keyEnter: 'Enter',
  keyShift: 'Shift'
};

const localStorageKeyHistory: string = 'nonaAiHistory';

const messagingForUser: { [key: string]: string } = {
  messageTextError: 'Error occurred during prompt: ',
  messageTextPlaceholder: 'Enter a prompt here',
  messageTextTryAgain: 'It looks like there was a problem finding an answer for you. Please try again.'
};

const readmeLink: string = 'https://github.com/alecthibodeau/nona-ai/blob/main/README.md';

const userPromptButtonActions: { [key: string]: string } = {
  textStart: 'start',
  textStop: 'stop'
};

const mockData: string[] = [
  'What\'s 2 + 2?',
  '4',
  'What\'s red plus yellow?',
  'Red plus yellow is orange.',
  'What are the states in New England?',
  'Connecticut, Maine, Massachusetts, New Hampshire and Rhode Island.',
  'Who were the members of the Beatles?',
  'The Beatles were a legendary rock band that was formed in Liverpool, England in 1960. The group\'s most well-known members were John Lennon, Paul McCartney, George Harrison and Ringo Starr. Over the course of their career the Beatles released 12 studio albums, which sold over 600 million copies worldwide and made them one of the best-selling music acts of all time. Their music and cultural impact have had a profound influence on popular music and popular culture.',
  'Write a paragraph about the sport of running.',
  'Running is one of the most popular and accessible sports in the world. It is a low-cost activity that anyone can do, and it can be enjoyed at any age. Running has many health benefits, including improved cardiovascular health, weight loss, and reduced stress. It can also be a great way to improve your mood and energy levels. There are many different types of running, from sprinting to leisurely walking, and it is important to find an activity that you enjoy and that you can maintain regularly. Whether you are looking for a way to get in shape or to improve your overall health, running is a great option.'
];

const stringValues = {
  cardVariantNames,
  consoleMessage,
  keyboardKeys,
  localStorageKeyHistory,
  messagingForUser,
  readmeLink,
  userPromptButtonActions,
  mockData
};

export default stringValues;
