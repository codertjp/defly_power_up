versions.DPUP_scripts = "1.0.1";

const DPUP = {
    vars: {},
    methods: {
        math: (expression = "") => {
            // Function to check and extract modifiers
            const extractModifier = (str, modifier) => {
                const match = str.match(new RegExp(`\\${modifier}(.+)\\${modifier}`, 'i'));
                return match ? [true, match[1]] : [false, str];
            };

            // Extract round and absolute modifiers
            let [round, expr] = extractModifier(expression, '?');
            let [absolute, finalExpr] = extractModifier(expr, '|');

            // Extract the mathematical operation
            const operationMatch = finalExpr.match(/([0-9.]+)\s*([\+\-\*\\/]+)\s*([0-9.]+)/i);
            if (!operationMatch) {
                return expression;
            }

            const [_, num1, operator, num2] = operationMatch;
            const operations = {
                "+": (a, b) => a + b,
                "-": (a, b) => a - b,
                "*": (a, b) => a * b,
                "**": (a, b) => a ** b,
                "/": (a, b) => a / b,
            };
            if (!(operator in operations)) {
                return 'NaN';
            }
            // Perform the calculation
            let result = operations[operator](parseFloat(num1), parseFloat(num2));

            // Apply rounding if required
            if (round) {
                result = Math.round(result);
            }

            // Apply absolute value if required
            if (absolute) {
                result = Math.abs(result);
            }

            return result;
        },
        console: (string = "") => {
            console.log(string);
            return string;
        },
        get: (string = "") => {
            return DPUP.vars[string];
        },
        to: (string = "", stacks = "") => {
            if (stacks && stacks.length > 0) {
                DPUP.vars[string] = stacks[stacks.length - 1].text;
            }
            return string;
        },
        def: (string = "") => {
            return string;
        },
        string: (string = "") => {
            return string;
        },
        float: (string = "") => {
            return parseFloat(string);
        },
        number: (string = "") => {
            return parseInt(string);
        },
        bool: (string = "") => {
            return string === "true";
        },
        window: (string = "") => {
            return str(getValueByPath(string, window));
        },
        if: (string = "") => {
            if (string === "true") return true;
            if (string === "false") return false;
            let regx = string.match(/([^=|>|<|!]+) ([=><!]+) (.+)/);
            if (!regx) return false;
            const p1 = regx[1];
            const type = regx[2];
            const p2 = regx[3];
            if (type === "==") {
                return p1 === p2;
            }
            return false;
        },
        query: (string = "") => {
            let config = string.split(",");
            getValueByPath(config[0], document.querySelectorAll(config[1]));
            return;
        },
        null: () => {
            return "";
        },
    },
    Execute: {
        Stacks: (line = "") => {
            if (line === "") return;
            let stacks = [];
            line = line.replace(/>>([-A-Z]+)\([^\)]{0,}\)[\s]{0,1}/g, (matchedText) => {
                const splitFunction = matchedText.match(/>>([-A-Z]+)\(([^\)]{0,})\)/);
                const method = splitFunction[1];
                let string = splitFunction[2].replace(/<\$\[([0-9]+)\]/g, (regx) => {
                    regx = regx.match(/<\$\[([0-9]+)\]/);
                    try {
                        return stacks[parseInt(regx[1]) - 1].text;
                    } catch {
                        return "STACK_NOT_FOUND";
                    }
                });
                string = string.replace(
                    /<\$/g,
                    stacks.length > 0 ? stacks[stacks.length - 1].text : "STACK_NOT_FOUND"
                );
                string = string.replace(/([^ ]+) \? ([^ ]+) : ([^ ]+)/g, (exp) => {
                    exp = exp.match(/([^ ]+) \? ([^ ]+) : ([^ ]+)/);
                    return DPUP.methods.if(exp[1]) ? exp[2] : exp[3];
                });
                let outputStack;
                const methodName = method.replace("-", "");
                const methodNull = method.match("-") !== null;
                if (methodName.toLowerCase() in DPUP.methods) {
                    outputStack = DPUP.methods[methodName.toLowerCase()](string, stacks);
                } else {
                    console.warn(`Function ${methodName} not found`);
                }
                if (outputStack !== undefined) {
                    stacks.push({ action: method.toLowerCase(), text: outputStack });
                }
                return methodNull ? '' : outputStack + '\n'; // or return a replacement string
            });
            return [stacks, line];
        },
        MutiLineScript: (fileContent) => {
            let outputStacks = [];
            let comp = fileContent.replace(/[\n]+/gim, "");
            let lines = comp.split(";");
            let i = 0;
            lines.forEach((line) => {
                i++;
                // If line has nothing then continue to next line or if comment
                if (line === "" || line[0] === "-") return;
                outputStacks.push(DPUP.Execute.Stacks(line));
                return;
            });
            return outputStacks;
        },
        Mixed(string) {
            let out = ["", string];
            out[0] = string.replace(/(>>[^;]+);[\s]{0,1}/g, (matchedText) => {
                let executedCode = this.MutiLineScript(matchedText);
                let stackItems = [
                    ...matchedText
                        .match(/(>>[^;]+);/)[0]
                        .matchAll(/>>[-A-Z]+\([^\)]+\)/g),
                ];
                stackItems.forEach((stack, index) => {
                    stack = stack[0];
                    let group = stack.match(/>>([-A-Z]+)\(([^\)]+)\)/);
                    out[1] = out[1].replace(
                        group[0],
                        `>>${group[1]}(${executedCode[0][0][index] ? executedCode[0][0][index].text : ''})`
                    );
                });
                return executedCode[0][1];
            });
            return out;
        },
    },
};

// DPUP.interpret.MutiLineScript(">>CONSOLE(this);");
