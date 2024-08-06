document.getElementById('category-select').addEventListener('change', function() {
    const selectedCategory = this.value;
    console.log('Selected category:', selectedCategory);
    if (selectedCategory) {
        fetch(selectedCategory)
            .then(response => {
                console.log('Response:', response);
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                displayAnswers(data);
            })
            .catch(error => console.error('Error fetching answers:', error));
    }
});

function displayAnswers(questions) {
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = ''; // Clear previous answers

    questions.forEach((q, index) => {
                const questionElem = document.createElement('div');
                questionElem.classList.add('question');
                questionElem.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
            <ul>
                ${q.answers.map((answer, idx) => `
                    <li class="${idx === q.correct ? 'correct-answer' : ''}">${idx + 1}. ${answer}</li>
                `).join('')}
            </ul>
        `;
        answersContainer.appendChild(questionElem);
    });
}