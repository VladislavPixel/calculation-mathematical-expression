// Вычисление инфиксного выражения с приоритетами
// Поддерживаются операции сложения, вычитания, умножения, деления

function calc(string) {
	const arrChars = [...string];

	const operators = new Map([
		["+", "+"],
		["-", "-"],
		["*", "*"],
		["/", "/"]
	]);

	const bracers = new Map([
		["(", "("],
		[")", ")"]
	]);

	const stackForOperators = [];

	const stackForPostfixEntry = [];

	let num = "";

	for (let m = 0; m < arrChars.length; m++) {
		// Перевод из инфиксной записи в постфиксную
		const char = arrChars[m];

		if (operators.has(char) || bracers.has(char)) {
			if (num !== "") {
				stackForPostfixEntry.push(Number(num));

				num = "";
			}

			const lastOperator = stackForOperators[stackForOperators.length - 1];

			const isNotEmpty = stackForOperators.length !== 0;

			if (char === "+" || char === "-") {
				if (isNotEmpty && lastOperator !== "(") {
					while(stackForOperators.length !== 0) {
						const operator = stackForOperators.pop();

						stackForPostfixEntry.push(operator);
					}
				}

			} else if (char === "*" || char === "/") {
				if (isNotEmpty && (lastOperator === "*" || lastOperator === "/")) {
					const operator = stackForOperators.pop();

					stackForPostfixEntry.push(operator);
				}
			}

			if (char === ")") {
				let isWork = true;

				while(isWork) {
					const operator = stackForOperators.pop();

					if (operator === "(") {
						isWork = false;

					} else {
						stackForPostfixEntry.push(operator);
					}
				}

			} else {
				stackForOperators.push(char);
			}

		} else {
			num += char;
		}
	}

	if (num !== "") {
		stackForPostfixEntry.push(Number(num));
	}

	while(stackForOperators.length !== 0) {
		stackForPostfixEntry.push(stackForOperators.pop());
	}

	// Код ниже производит расчет постфиксного выражения
	const stackForOperands = [];

	for (const value of stackForPostfixEntry) {
		if (typeof value === "number") {
			stackForOperands.push(value);

		} else {
			const num2 = stackForOperands.pop();

			const num1 = stackForOperands.pop();

			let newOperand = 0;

			switch(value) {
				case "+":
					newOperand = num1 + num2;
				break;
				case "-":
					newOperand = num1 - num2;
				break;
				case "*":
					newOperand = num1 * num2;
				break;
				case "/":
					newOperand = num1 / num2;
				break;
				default:
					throw new Error("Operator is not sapported");
			}

			stackForOperands.push(newOperand);
		}
	}

	return stackForOperands[0];
}

console.log(calc("12+5*2/(60-58)-5")); // 12
console.log(calc("12+5*2/(60-58*2)/2+5")); // 16.910714285714285
console.log(calc("12+5*2/(60-58*2*(5-3*3))/2+5")); // 17.009541984732824
console.log(calc("3+4-5")); // 2
console.log(calc("3+4*5")); // 23
console.log(calc("3*(4+5)")); // 27