const cardVariantValues: { [key: string]: string } = {
  prompt: 'prompt',
  result: 'result'
};

const keyboardKeys: { [key: string]: string } = {
  keyArrowUp: 'ArrowUp',
  keyEnter: 'Enter'
};

const textForUser: { [key: string]: string } = {
  pleaseTryAgain: 'It looks like there was a problem finding an answer for you. Please try again.'
};

const unicodeCharacters: { [key: string]: string } = {
  characterBlackMediumRightPointingTriangle: '\u23f5',
  characterVectorOrCrossProduct: '\u2A2F'
};

const strings = {
  cardVariantValues,
  keyboardKeys,
  textForUser,
  unicodeCharacters
};

export default strings;
