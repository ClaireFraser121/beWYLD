// Variable to questions index
    // e.g. var questionIndex = 0;
// variable to store questions
// var fitnessQuestions = [
    // {
    //     question: "What is your fitness goal?",
    //     answers: ["Bulking = strength", "Toning = plyometrics", "cardio", "stretching"
    //    },
    //    {
    //     question: "How would you describe your fitness level?",
    //     answers: ["1. Beginner", "2. Intermediate", "3. Advanced"],
    // },
    //    {
    //     question: "What part of the body would you like to work on?",
    //     answers: ["Chest", "Arms", "Abs", "Back", "Bum", "Legs"],
    // },
    //    {
    //     question: "How many excercises would you like?",
    //     answers: [1, 3, 5, 10],
    // },

    // Object to store user input from question cards
    //   var fitnessGoals = {
    //     fitnessGoal: answer to 1st question
    //     fitnessLevel: answer to 2nd question
    //     muscleGroup: answer to 3rd question"
    //   };

        // match muscle group to below object. Math.random on any resulting array to pick a random muscle group e.g. if legs was picked, pick a random value from that array.

// Object to store user input from 3rd question
    //   var bodyParts = {
    //     chest: chest
    //     arms: [biceps, forearms, triceps]
    //     abs: abdominals
    //     back: [lats, lower_back, middle_back, traps, neck]
    //     bum: [abductors, glutes]
    //     legs: [adductors, calves, hamstrings, quadriceps]
    //   };

// var function = mealMatcherer()
    // 
    // Object to convert user answers to meal tags
    //   var mealTypes = {
    //     lean: [cardio, stretching, plyometrics]
    //     bulk: [strength]
    //   };
    // if fitnessGoals.muscleGroup = mealtypes value
    // shows HTML content for all meals with that class
    // else - show content for all meals with the other class

// var function = displayResults()
    // Get results for all questions and fetch from the fitness API
    // How do we convert results for final question (research this!)
        // if statement?
        // new object?
// fetch (fitnessApiUrl)
    // get and store the results in JSON object
// .then fetch (imageApiUrl)
    // After fitness API fetch, ideally pass the name of the workout from the results into the image generator API
    // Display image (ideally) matching the workout
    // Generate results onto pre-existing HTML elements - pre-existing elements would be dropdowns, Title and container for results.
    // Generate save buttons for 
    // mealMatcherer() run the mealmatcher function



// var function = generateQuestion(index) - Function to get a question
// if (currentQuestion < fitnessQuestions.length) { // If statement to display a  question as long as the question index hasn't reached the end of the array
    // Display the current question As the question title
    // For loop to iterate through the answers and generate a cards for each one
    // Dynamically generate the answers on cards - dynamically generate all HTML in this function
    // Sets data of each card to correspond to the index of it's answer
    // Sets text of each button to index of answer
    // ends the quiz once all the questions have been iterated through, e.g.:
// } else {
//     displayResults(); // Runs new function to pass values into the API and generate results page


// Once results are displayed - drop downs visible for the 3 criteria and a regenerate button

// a regenerate button can be clicked if results aren't suitable. 

// What if each workout had a meal combo?
// What if each of these combo's could be saved to local storage?
// Regenerate button could then produce more combos?
    
// Event listener
   // Listening for click event on all cards
   // Pass value of the selected card (using $(this).text() method) to the matching fitnessGoals object key
   // add one to the question index
        // e.g. questionIndex++;
    // Reset HTML to default
    // call function to display new question e.g. generateQuestion(questionIndex)

    document.addEventListener("DOMContentLoaded", function () {
      // Sample data for dropdown options
      const goals = ["Bulking", "Slimming", "Cardio", "Stretching"];
      const skillLevels = ["Beginner", "Intermediate", "Advanced"];
      const muscles = ["Chest", "Arms", "Abs", "Back", "Bum", "Legs"];
      const exerciseNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
