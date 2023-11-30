document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("quiz-container");
    const submitBtn = document.getElementById("submit-btn");
    const resultContainer = document.getElementById("result-container");
  
    // Sample questions for the quiz
    const questions = [
      { question: "How many days per week do you want to work out?", options: ["3", "4", "5", "6", "7"] },
      { question: "What is your preferred workout duration?", options: ["15 minutes", "30 minutes", "45 minutes", "1 hour", "More than 1 hour"] },
      // Add more questions as needed
    ];
  
    // Display quiz questions
    function displayQuestions() {
      let html = "";
      questions.forEach((q, index) => {
        html += `
          <div class="mb-4">
            <h5>${index + 1}. ${q.question}</h5>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              ${q.options.map((option, optionIndex) => `
                <label class="btn btn-outline-secondary">
                  <input type="radio" name="q${index}" value="${optionIndex}"> ${option}
                </label>
              `).join("")}
            </div>
          </div>
        `;
      });
      quizContainer.innerHTML = html;
    }
  
    // Calculate and display the workout program based on user choices
    function calculateResult() {
      const answers = [];
      questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        answers.push(selectedOption ? selectedOption.value : null);
      });
  
      // Call an API or use a predefined logic to get workout program based on answers
      const workoutProgram = getWorkoutProgram(answers);
  
      // Display the result
      resultContainer.innerHTML = `<h3>Your Workout Program:</h3><p>${workoutProgram}</p>`;
    }
  
    // Event listener for the submit button
    submitBtn.addEventListener("click", calculateResult);
  
    // Initialize the quiz
    displayQuestions();
  });
  
  // Mock function to get workout program based on user answers
  function getWorkoutProgram(answers) {
    // Implement your logic or call an API to get workout program
    // This is just a mock example
    const intensityLevels = ["Beginner", "Intermediate", "Advanced"];
    const selectedIntensity = answers[0]; // Assuming the first question is about intensity
    return `Follow a ${intensityLevels[selectedIntensity]} workout program.`;
  }
  