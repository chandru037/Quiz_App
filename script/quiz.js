let questions = [];
let currentQuestionIndex = 0;
let score = 0;

document.getElementById('category-select').addEventListener('change', startQuiz);

function startQuiz() {
    const category = document.getElementById('category-select').value;
    fetch(`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`)
        .then(response => response.json())
        .then(data => {
            questions = data.results;
            document.getElementById('quiz').classList.remove('d-none');
            showQuestion();
        });
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').innerHTML = question.question;

    const answers = [...question.incorrect_answers, question.correct_answer];
    answers.sort(() => Math.random() - 0.5); // Shuffle answers

    const answerElements = document.querySelectorAll('.answer');
    answerElements.forEach((element, index) => {
        element.innerHTML = answers[index];
        element.classList.remove('correct', 'wrong');
        element.setAttribute('data-answer', answers[index]);
    });

    document.getElementById('submit-btn').disabled = true;
    document.getElementById('next-btn').classList.add('d-none');
}

function selectAnswer(element) {
    const answerElements = document.querySelectorAll('.answer');
    answerElements.forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    document.getElementById('submit-btn').disabled = false;
}

function checkAnswer() {
    const selectedElement = document.querySelector('.answer.selected');
    if (!selectedElement) return;

    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedElement.getAttribute('data-answer') === correctAnswer) {
        score++;
        selectedElement.classList.add('correct');
    } else {
        selectedElement.classList.add('wrong');
        document.querySelectorAll('.answer').forEach(element => {
            if (element.getAttribute('data-answer') === correctAnswer) {
                element.classList.add('correct');
            }
        });
    }

    document.getElementById('submit-btn').disabled = true;
    document.getElementById('next-btn').classList.remove('d-none');

    updateProgressBar();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
}

function updateProgressBar() {
    const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
    document.getElementById('progress-text').innerText = `${Math.round(percentage)}%`;
}

function endQuiz() {
    alert(`Quiz finished! Your score is: ${score} out of ${questions.length}`);
    location.reload();
}