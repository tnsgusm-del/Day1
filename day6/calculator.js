// calculator.js

const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const enterBtn = document.querySelector('.enter');
const clearBtn = document.querySelector('.clear');
const onOffBtn = document.querySelector('.on-off');

let isOn = true;        // 계산기 켜짐 상태
let firstNum = '';      // 첫 번째 숫자
let operator = '';      // 연산자
let isNewInput = false; // 새 입력 여부

// ON/OFF 버튼
onOffBtn.addEventListener('click', () => {
    isOn = !isOn;
    onOffBtn.classList.toggle('on', isOn);

    if (!isOn) {
        display.value = '';
    } else {
        display.value = '0';
        firstNum = '';
        operator = '';
        isNewInput = false;
    }
});

// 숫자 버튼
numbers.forEach(button => {
    button.addEventListener('click', () => {
        if (!isOn) return;

        const value = button.textContent;

        if (isNewInput) {
            display.value = value;
            isNewInput = false;
        } else {
            if (display.value === '0' && value !== '.') {
                display.value = value;
            } else {
                display.value += value;
            }
        }
    });
});

// 연산자 버튼
operators.forEach(button => {
    button.addEventListener('click', () => {
        if (!isOn) return;

        firstNum = display.value;
        operator = button.textContent;
        isNewInput = true;
    });
});

// Enter 버튼
enterBtn.addEventListener('click', () => {
    if (!isOn) return;
    if (firstNum === '' || operator === '') return;

    const secondNum = parseFloat(display.value);
    const first = parseFloat(firstNum);
    let result;

    if (operator === '+') result = first + secondNum;
    else if (operator === '-') result = first - secondNum;
    else if (operator === '*') result = first * secondNum;
    else if (operator === '/') {
        if (secondNum === 0) {
            display.value = 'Error';
            firstNum = '';
            operator = '';
            return;
        }
        result = first / secondNum;
    }

    display.value = result;
    firstNum = '';
    operator = '';
    isNewInput = true;
});

// C 버튼
clearBtn.addEventListener('click', () => {
    if (!isOn) return;

    display.value = '0';
    firstNum = '';
    operator = '';
    isNewInput = false;
});