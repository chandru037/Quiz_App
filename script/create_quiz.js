document.getElementById('create-quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const questionText = document.getElementById('question').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const correctOption = document.getElementById('correct-option').value;

    const questionItem = document.createElement('li');
    questionItem.classList.add('list-group-item');
    questionItem.innerHTML = `
        <strong>${questionText}</strong><br>
        1. ${option1}<br>
        2. ${option2}<br>
        3. ${option3}<br>
        4. ${option4}<br>
        <em>Correct Option: ${correctOption}</em>
    `;
    document.getElementById('question-list').appendChild(questionItem);

    // Clear the form
    document.getElementById('create-quiz-form').reset();
});