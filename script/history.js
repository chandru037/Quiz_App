let questions = [
    // Add questions here
    { text: "Who was the first President of the United States?", answers: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], correctAnswer: "George Washington" },
    // Add more questions
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.text;

    const answersElement = document.getElementById('answers');
    answersElement.innerHTML = '';

    question.answers.forEach(answer => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('cta-button');
        answerElement.innerText = answer;
        answerElement.onclick = () => selectAnswer(answerElement, question.correctAnswer);
        answersElement.appendChild(answerElement);
    });

    document.getElementById('prev-btn').classList.toggle('hide', currentQuestionIndex === 0);
    document.getElementById('next-btn').classList.add('hide');
    document.getElementById('submit-btn').classList.add('hide');
}

function selectAnswer(answerElement, correctAnswer) {
    const selectedAnswer = answerElement.innerText;
    const isCorrect = selectedAnswer === correctAnswer;

    if (isCorrect) {
        score++;
        answerElement.classList.add('correct');
    } else {
        answerElement.classList.add('wrong');
    }

    document.getElementById('next-btn').classList.remove('hide');
    document.getElementById('submit-btn').classList.toggle('hide', currentQuestionIndex < questions.length - 1);
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function submitQuiz() {
    document.getElementById('question-container').classList.add('hide');
    document.getElementById('scoreboard').innerText = `You scored ${score} out of ${questions.length}`;
}

document.getElementById('prev-btn').onclick = () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
};
document.getElementById('next-btn').onclick = nextQuestion;
document.getElementById('submit-btn').onclick = submitQuiz;

window.onload = startQuiz;