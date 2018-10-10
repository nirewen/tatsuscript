class AbstractFunction {
    constructor(name, code, Interpreter) {
        this.name = name;
        this.code = code;
        this.interpreter = Interpreter;
    }

    run(msg, ...args) {
        let func = this.code.bind(this.interpreter);
        return func(msg, ...args);
    }
}

module.exports = AbstractFunction;