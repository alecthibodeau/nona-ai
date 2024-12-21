const errorText: string = 'An error occurred during prompt';
const localStorageKeyHistory: string = 'nonaAiHistory';

const cardVariantNames: { [key: string]: string } = {
  variantNamePrompt: 'prompt',
  variantNameResult: 'result'
};

const colorThemeOptions: string[] = ['hue', 'light', 'dark'];

const keyboardKeys: { [key: string]: string } = {
  keyArrowUp: 'ArrowUp',
  keyBackspace: 'Backspace',
  keyDelete: 'Delete',
  keyEnter: 'Enter',
  keyShift: 'Shift'
};

const messagingForUser: { [key: string]: string } = {
  messageTextAlertError: `${errorText}. Please try again.`,
  messageTextConsoleError: `${errorText}: `,
  messageTextPromptPlaceholder: 'Enter a prompt here (avoid digits)',
  messageTextCardTryAgain: 'It looks like there was a problem finding an answer for you. Please try again.',
  messageTextHeaderDefault: 'So that Nona AI can get results back from Gemini Nano please configure your Chrome browser by following the steps in the project\'s ',
  messageTextHeaderUnavailable: 'Nona AI\'s prompt interface is currently unavailable. Hopefully this will be sorted out soon. Meanwhile, see the project\'s ',
  messageTextHeaderCreditProject: 'Nona AI by ',
  messageTextHeaderCreditAuthor: 'Alec Thibodeau',
  messageTextHeaderCreditDescription: ' is a custom user interface for sending natural language prompts to Google\'s Gemini Nano LLM. For configuring your browser see the project\'s '
};

const readmeLink: string = 'https://github.com/alecthibodeau/nona-ai/blob/main/README.md#nona-ai';

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
  colorThemeOptions,
  keyboardKeys,
  localStorageKeyHistory,
  messagingForUser,
  readmeLink,
  userPromptButtonActions,
  mockData
};

export default stringValues;
