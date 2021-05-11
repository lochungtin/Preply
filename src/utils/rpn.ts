interface PrecMapType {
    [index: string]: number
}

const precMap: PrecMapType = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
}

export const isOp = (op: string): boolean => ['+', '-', '*', '/'].indexOf(op) !== -1;
const isPa = (op: string): boolean => op === '(' || op === ')';

const convert = (splt: Array<string>): Array<string> => {
    let outStack: Array<string> = [];
    let opStack: Array<string> = [];

    while (splt.length > 0) {
        let head: string = splt.splice(0, 1)[0];
        switch (true) {
            case isPa(head):
                if (head === '(')
                    opStack.push(head);
                else {
                    while (opStack[opStack.length - 1] !== '(')
                        outStack.push(opStack.pop() || "");
                    opStack.pop();
                }
                break;
            case isOp(head):
                while (opStack.length > 0 && precMap[opStack[opStack.length - 1]] > precMap[head])
                    outStack.push(opStack.pop() || "");
                opStack.push(head);
                break;
            default:
                outStack.push(head);
        }
    }

    while (opStack.length > 0)
        outStack.push(opStack.pop() || "");

    return outStack;
}

const evaluate = (rpn: Array<string>, stack: Array<number> = []): number => {
    if (rpn.length === 0)
        return stack[0];
    else {
        let head: string = rpn.splice(0, 1)[0];
        if (isOp(head)) {
            let num1: number = stack.splice(stack.length - 1, 1)[0];
            let num2: number = stack.splice(stack.length - 1, 1)[0];
            switch (head) {
                case '+':
                    return evaluate(rpn, [...stack, num2 + num1]);
                case '-':
                    return evaluate(rpn, [...stack, num2 - num1]);
                case '*':
                    return evaluate(rpn, [...stack, num2 * num1]);
                case '/':
                    return evaluate(rpn, [...stack, num2 / num1]);
            }
        }
        return evaluate(rpn, [...stack, parseFloat(head)]);
    }
}

export const compute = (equation: Array<string>): number => evaluate(convert(equation));

export const validate = (splt: Array<string>): boolean => {
    let stack: Array<string> = [];
    
    splt.forEach(token => {
        if (token === '(')
            stack.push('(');
        if (token === ')') {
            if (stack.length === 0)
                return 0;
            
            stack.pop();
        }
    });

    return stack.length === 0;
}
