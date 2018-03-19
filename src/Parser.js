const Token  = require('./Token');
class Parser {
    static parse(tokens, stopToken = 'NONE', initialIndex = 0, argIndex = 0) {
        let end = [];
        for (let i = initialIndex; i < tokens.length; i++) {
            let token = tokens[i];
            if ((Array.isArray(stopToken) && stopToken.includes(token.type)) || stopToken === token.type) 
                return {value: end, lastToken: i, lastTokenType: token.type};

            switch(token.type) {
                case 'LBRACKET':
                    let bracketGroup = this.parse(tokens, ['RBRACKET', 'EOF'], i + 1);

                    if (bracketGroup.lastTokenType === 'EOF') {
                        end.push(new Token('WORD', token.value));
                        break;
                    }

                    end.push(new Token('BRACKETGROUP', Array.isArray(bracketGroup) ? bracketGroup : bracketGroup.value)[0]);
                    i = bracketGroup.lastToken;
                    break;
                case 'SEMI':
                    let argsGroup = this.parse(tokens, ['SEMI', 'RBRACKET', 'EOF'], i + 1);
                    end.push(argsGroup.value);
                    i = argsGroup.lastToken - 1;
                    break;
                default:
                    end.push(token);
            }
        }
        return end;
    }
};

module.exports = Parser;