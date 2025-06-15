document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.pantalla');
    const buttons = document.querySelectorAll('.botones button');

    let currentExpression = '';
    let justEvaluated = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;

            if (buttonValue === 'C') {
                currentExpression = '';
                display.textContent = '0';
                justEvaluated = false;
                return;
            }

            if (buttonValue === '√') {
                try {
                    let numberToSquareRoot = parseFloat(currentExpression);
                    if (!isNaN(numberToSquareRoot) && numberToSquareRoot >= 0) {
                        let result = Math.sqrt(numberToSquareRoot);
                        if (typeof result === 'number' && !isNaN(result)) {
                            result = parseFloat(result.toFixed(6));
                        }
                        display.textContent = result;
                        currentExpression = result.toString();
                        justEvaluated = true;
                    } else {
                        display.textContent = 'Error!';
                        currentExpression = '';
                        justEvaluated = false;
                    }
                } catch (e) {
                    display.textContent = 'Error!';
                    currentExpression = '';
                    justEvaluated = false;
                }
                return;
            }

            if (buttonValue === '=') {
                try {
                    let expressionToEvaluate = currentExpression.replace(/x/g, '*').replace(/÷/g, '/');
                    let result = eval(expressionToEvaluate);

                    if (typeof result === 'number' && !isNaN(result)) {
                        result = parseFloat(result.toFixed(6));
                    }
                    
                    display.textContent = result;
                    currentExpression = result.toString();
                    justEvaluated = true;
                } catch (e) {
                    display.textContent = 'Error!';
                    currentExpression = '';
                    justEvaluated = false;
                }
                return;
            }

            if (justEvaluated) {
                if (!isNaN(buttonValue) || buttonValue === '.') {
                    currentExpression = buttonValue;
                } else {
                    currentExpression += buttonValue;
                }
                justEvaluated = false;
            } else {
                currentExpression += buttonValue;
            }

            display.textContent = currentExpression;
        });
    });
});