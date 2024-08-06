const questions = [
    { question: "1. Who wrote the play 'Romeo and Juliet'?", answers: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"], correct: 0 },
    { question: "2. Which planet is known as the Red Planet?", answers: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { question: "3. In what year did the Titanic sink?", answers: ["1902", "1912", "1922", "1932"], correct: 1 },
    { question: "4. Who painted the Mona Lisa?", answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], correct: 2 },
    { question: "5. Which country is known as the Land of the Rising Sun?", answers: ["China", "Japan", "South Korea", "Thailand"], correct: 1 },
    { question: "6. What is the capital of Australia?", answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
    { question: "7. Who was the first person to walk on the moon?", answers: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Michael Collins"], correct: 1 },
    { question: "8. What is the smallest prime number?", answers: ["0", "1", "2", "3"], correct: 2 },
    { question: "9. Which famous novel begins with the line, 'It was the best of times, it was the worst of times'?", answers: ["Pride and Prejudice", "Moby Dick", "A Tale of Two Cities", "Great Expectations"], correct: 2 },
    { question: "10. What is the chemical symbol for water?", answers: ["H2O", "CO2", "O2", "H2"], correct: 0 },

];


// Initial state variables
let currentQuestionIndex = 0;
let score = 0;
let time = 60; // Time per question
let totalTime = 600; // Total time for the quiz (10 minutes)
let timer;
let totalTimer;
let attempted = 0;
let skipped = 0;
let wrong = 0;
let selectedAnswer = null;
let hasAnswered = false;

// DOM elements
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const questionTimeElement = document.getElementById('question-time');
const totalTimeElement = document.getElementById('total-time');
const nextButton = document.getElementById('next-btn');
const previousButton = document.getElementById('prev-btn');
const submitButton = document.getElementById('submit-btn');
const noticeElement = document.getElementById('notice');

// Function to start the quiz
function startQuiz() {
    showQuestion();
    timer = setInterval(countdown, 1000); // Timer for question time
    totalTimer = setInterval(totalCountdown, 1000); // Total quiz timer
}

// Function to display the current question and options
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    // Create buttons for multiple choice answers
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('cta-button');
        button.addEventListener('click', () => selectAnswer(index, button));
        answersElement.appendChild(button);
    });

    updateNavigationButtons();
}

// Function to reset state before showing a new question
function resetState() {
    selectedAnswer = null;
    hasAnswered = false;
    answersElement.innerHTML = ''; // Clear previous answers
    nextButton.classList.add('hide');
    previousButton.classList.add('hide');
    questionTimeElement.innerText = time; // Reset question timer
}

// Function to select an answer and highlight it
function selectAnswer(index, button) {
    if (hasAnswered) return; // Prevent changing answer
    selectedAnswer = index;
    hasAnswered = true;
    // Remove active class from all buttons
    Array.from(answersElement.children).forEach(btn => btn.classList.remove('active'));
    // Add active class to the selected button
    button.classList.add('active');
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove('hide');
    }
}

// Function to handle proceeding to the next question
function nextQuestion() {
    if (!hasAnswered) {
        skipped++;
    } else {
        attempted++;
        const isCorrect = selectedAnswer === questions[currentQuestionIndex].correct;
        if (isCorrect) {
            score++;
        } else {
            wrong++;
        }
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        time = 60; // Reset question time
        showQuestion();
    } else {
        finishQuiz();
    }
}

// Function to handle going back to the previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        time = 60; // Reset question time
        showQuestion();
    }
}

// Countdown timer function for each question
function countdown() {
    if (time > 0) {
        time--;
        questionTimeElement.innerText = time;
    } else {
        skipped++;
        nextQuestion();
    }
}

// Countdown timer function for total quiz time
function totalCountdown() {
    if (totalTime > 0) {
        totalTime--;
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        totalTimeElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        finishQuiz();
    }
}

// Function to finalize the quiz and store results
function finishQuiz() {
    clearInterval(timer);
    clearInterval(totalTimer);
    localStorage.setItem('quizScore', score);
    localStorage.setItem('attempted', attempted);
    localStorage.setItem('skipped', skipped);
    localStorage.setItem('wrong', wrong);
    window.location.href = 'report.html';
}

// Function to update the visibility of navigation buttons
function updateNavigationButtons() {
    previousButton.classList.toggle('hide', currentQuestionIndex === 0);
    nextButton.classList.toggle('hide', currentQuestionIndex === questions.length - 1);
    submitButton.classList.toggle('hide', currentQuestionIndex !== questions.length - 1);
}

// Event listeners for navigation buttons
nextButton.addEventListener('click', nextQuestion);
previousButton.addEventListener('click', previousQuestion);
submitButton.addEventListener('click', finishQuiz);

// Start the quiz
startQuiz();