// Fetch quiz results from localStorage
const userName = localStorage.getItem('userName');
const totalScore = localStorage.getItem('quizScore');
const totalAttempted = localStorage.getItem('attempted');
const totalSkipped = localStorage.getItem('skipped');
const totalWrong = localStorage.getItem('wrong');

// Display the results on the report page
document.getElementById('user-name').innerText = `User: ${userName}`;
document.getElementById('total-score').innerText = totalScore;
document.getElementById('total-attempted').innerText = totalAttempted;
document.getElementById('total-skipped').innerText = totalSkipped;
document.getElementById('total-wrong').innerText = totalWrong;

// Event listeners for the buttons
document.getElementById('restart-btn').addEventListener('click', () => {
    window.location.href = 'quiz.html'; // Redirect to the quiz page to restart
});

document.getElementById('home-btn').addEventListener('click', () => {
    window.location.href = 'home.html'; // Redirect to the homepage
});

// Function to download the report as PDF
document.getElementById('download-btn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Quiz Report", 10, 20);

    doc.setFontSize(12);
    doc.text(`User: ${userName}`, 10, 30);

    doc.setFontSize(16);
    doc.text("Results Summary", 10, 50);

    doc.setFontSize(12);
    doc.text(`Total Score: ${totalScore}`, 10, 60);
    doc.text(`Questions Attempted: ${totalAttempted}`, 10, 70);
    doc.text(`Questions Skipped: ${totalSkipped}`, 10, 80);
    doc.text(`Incorrect Answers: ${totalWrong}`, 10, 90);

    doc.save(`${userName}_Quiz_Report.pdf`);
});