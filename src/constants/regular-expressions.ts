const allButLettersAndNumbers: RegExp = /[^a-zA-Z0-9]/g;
const onlyNewLinesAndSpaces: RegExp = /^\s*(\n\s*)*$/;

const regularExpressions = {
  allButLettersAndNumbers,
  onlyNewLinesAndSpaces
};

export default regularExpressions;
