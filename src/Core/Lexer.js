import Token from './Token';

const getContent = script => (
  script
    .split(/(\{|\}|;)/)
    .map((t, i, self) => t == '' && (self[i + 1] == '{' || self[i - 1] == '}') ? undefined : t).filter(c => c !== undefined)
);

const getTokenType = (token) => {
  switch (token) {
    case '{':
      return 'LBRACKET';
    case '}':
      return 'RBRACKET';
    case ';':
      return 'SEMI';
  };

  return 'WORD';
};

export default (script) => {
  const content = getContent(script);

  const tokens = content.map(token => new Token(getTokenType(token), token)[0]);

  tokens.push(new Token('EOF', '')[0]);

  return tokens;
};
