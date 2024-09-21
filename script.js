const questions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Lisbon"
        },
        correctAnswer: "c"
    },
    {
        question: "What is 2 + 2?",
        answers: {
            a: "3",
            b: "4",
            c: "5",
            d: "6"
        },
        correctAnswer: "b"
    }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');

let score = 0;
let selectedAnswers = [];

function buildQuiz() {
    const output = [];

    questions.forEach((currentQuestion, questionIndex) => {
        const answers = [];

        for (let letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionIndex}" value="${letter}" onclick="selectAnswer(${questionIndex}, '${letter}')">
                    ${letter}: ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function selectAnswer(questionIndex, selectedAnswer) {
    const answerContainers = quizContainer.querySelectorAll('.answers')[questionIndex];
    const correctAnswer = questions[questionIndex].correctAnswer;
    
    // Check if the question was already answered
    if (selectedAnswers[questionIndex] === undefined) {
        selectedAnswers[questionIndex] = selectedAnswer;

        if (selectedAnswer === correctAnswer) {
            score++;
        }
    } else {
        // If changing the answer, adjust the score accordingly
        if (selectedAnswers[questionIndex] !== correctAnswer && selectedAnswer === correctAnswer) {
            score++;
        } else if (selectedAnswers[questionIndex] === correctAnswer && selectedAnswer !== correctAnswer) {
            score--;
        }
        selectedAnswers[questionIndex] = selectedAnswer;
    }

    answerContainers.querySelectorAll('label').forEach(label => {
        const input = label.querySelector('input');

        // Reset background color
        label.style.backgroundColor = '';

        // Highlight the selected answer
        if (input.value === selectedAnswer) {
            if (selectedAnswer === correctAnswer) {
                label.style.backgroundColor = '#c8e6c9'; // Correct answer color
            } else {
                label.style.backgroundColor = '#ffcdd2'; // Incorrect answer color
            }
        }

        // Always highlight the correct answer
        if (input.value === correctAnswer) {
            label.style.backgroundColor = '#c8e6c9';
        }
    });

    // Display the score
    resultsContainer.innerHTML = `Your current score is ${score} out of ${questions.length}`;
}

buildQuiz();
