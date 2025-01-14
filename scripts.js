/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

const minInput_value = 1;
const maxInput_value = 33;

let alreadyGenerated = [1, 2, 3, 5, 6, 8, 9, 10, 12, 15, 18, 22, 24, 28, 29, 33];
let generatedNumber = 0;
let questions = {};

const numberDisplay = document.getElementById('generated_number');
const storageDisplay = document.getElementById('storage_display');
const questionDisplay = document.getElementById('question_display');

const maxInput = document.getElementById('max_number');
const minInput = document.getElementById('min_number');
const alreadyGeneratedInput = document.getElementById('already_generated');

minInput.value = minInput_value;
maxInput.value = maxInput_value;

showStoredNumbers();

//
// fetch('file://questions.json')
//     .then(response => response.json())
//     .then(data => {
//         questions = data.questions;
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });

document.getElementById('generate').addEventListener('click', () => {
    if (alreadyGeneratedInput.enabled) {
        alreadyGeneratedInput.disabled = true;
    }

    if (!checkIsAllNumbersCompleted()) {
        generatedNumber = getRandomNumber(+minInput.value, +maxInput.value);
        alreadyGenerated.push(generatedNumber);
    } else {
        generatedNumber = 'All tasks already completed';
    }

    numberDisplay.innerText = generatedNumber.toString();

    showStoredNumbers();
    showQuestion();
});

document.getElementById('clear-data').addEventListener('click', () => {
    const result = window.confirm('Are you sure?');

    if (result) {
        numberDisplay.innerText = null;
        alreadyGenerated = [];
    }

    showStoredNumbers();
});


function getRandomNumber(min, max) {
    let generatedRandomly = Math.round((Math.random() * (max - min) + min));

    if (alreadyGenerated.find(num => num === generatedRandomly)) {
        generatedRandomly = getRandomNumber(min, max);
    }

    return generatedRandomly;
}

function showQuestion() {
    questionDisplay.innerText = questions[generatedNumber] || '';
}

function showStoredNumbers() {
    storageDisplay.innerText = JSON.stringify(alreadyGenerated.sort((a, b) => a - b));
}

function checkIsAllNumbersCompleted() {
    for (let i = +minInput.value; i <= +maxInput.value; i++) {
        if (!alreadyGenerated.includes(i)) {
            return false;
        }
    }

    return true;
}
