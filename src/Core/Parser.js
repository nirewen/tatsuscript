import Token from './Token';

const parse = (tokens, stop = 'none', index = 0, arg = 0) => {
  const end = [];

  for (index; index < tokens.length; index++) {
    const token = tokens[index];

    if ((Array.isArray(stop) && stop.includes(token.type)) || stop === token.type) {
      return {
        value: end,
        lastToken: index,
        lastTokenType: token.type,
      };
    }

    switch (token.type) {
      case 'LBRACKET':
        const brackets = parse(tokens, [
          'RBRACKET', 'EOF',
        ], index + 1);

        if (brackets.lastTokenType === 'EOF') {
          end.push(new Token('WORD', token.value));
          break;
        }

        end.push(new Token('BRACKETGROUP', Array.isArray(brackets) ? brackets : brackets.value)[0]);
        index = brackets.lastToken;
        break;
      case 'SEMI':
        const args = parse(tokens, [
          'SEMI', 'RBRACKET', 'EOF',
        ], index + 1);

        end.push(args.value);

        index = args.lastToken - 1;
        break;
      default:
        end.push(token);
    };

  }

  return end;
};

export default parse;
