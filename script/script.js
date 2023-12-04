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
    //fitnessQuestions[0].answers[0] = "strength"
    //fitnessQuestions[0].answers[1] = "plyometrics"
    // for loop to iterate through the bodyParts object and match the answer to the final question to the correct object key
    //math.random to pick a random muscle from the correct array
    // Change the key value for the bodyParts object to the chosen muscle
    // Get results for all questions and fetch from the fitness API
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
//     displayResults(); // Runs new function to pass the values into the API and generate results page


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
    // Sample data for fitness goals
    const fitnessGoals = [
      { title: "Bulking", text: "Achieve your goal of gaining muscle mass and size with our bulking program.", image: "bulking-image.jpg", resultType: "bulk" },
      { title: "Toning", text: "Define and sculpt your body with our toning program designed for a lean physique.", image: "toning-image.jpg", resultType: "lean" },
      { title: "Cardio", text: "Maintain cardiovascular health with our cardio program for a healthy lifestyle.", image: "cardio-image.jpg", resultType: "lean" }
    ];
  
    // Get the container where cards will be appended
    const cardContainer = document.getElementById("cardContainer");
  
    // Dynamically generate cards based on data
    fitnessGoals.forEach(function (goal) {
      // Create card element
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4", "card");
  
      // Create card content
      const cardContent = `
        <img src="${goal.image}" class="card-img-top" alt="${goal.title} Image">
        <div class="card-body">
          <h5 class="card-title">${goal.title}</h5>
          <p class="card-text">${goal.text}</p>
          <button class="btn btn-primary" data-toggle="modal" data-target="#resultsModal" data-result-type="${goal.resultType}">See Results</button>
        </div>
      `;
  
      // Set card content
      card.innerHTML = cardContent;
  
      // Append the card to the container
      cardContainer.appendChild(card);
    });
  
    // Handle modal for results
    $("#resultsModal").on("show.bs.modal", function (event) {
      // Clear previous results
      document.getElementById("leanResults").innerHTML = '';
      document.getElementById("bulkResults").innerHTML = '';
  
      // Get the result type from the clicked button
      const resultType = event.relatedTarget.getAttribute("data-result-type");
  
      // Dynamically generate meal cards based on result type
      if (resultType === "lean") {
        const leanResultsContainer = document.getElementById("leanResults");
        generateMealCards(leanResultsContainer, "Lean Results", leanMealData);
      } else if (resultType === "bulk") {
        const bulkResultsContainer = document.getElementById("bulkResults");
        generateMealCards(bulkResultsContainer, "Bulk Results", bulkMealData);
      }
    });
  
    // Function to generate meal cards
    function generateMealCards(container, title, mealData) {
      container.innerHTML = `<h2>${title}</h2>`;
  
      mealData.forEach(function (meal, index) {
        const card = document.createElement("div");
        card.classList.add("card", "mb-4");
  
        const cardContent = `
          <div class="card-body">
            <h5 class="card-title">${meal.title}</h5>
            <p class="card-text">${meal.description}</p>
            <a href="${meal.url}" target="_blank" class="btn btn-primary">Find out more</a>
          </div>
        `;
  
        card.innerHTML = cardContent;
        container.appendChild(card);
      });
    }
  
    // Sample data for lean meal results
    const leanMealData = [
      { title: "Lean Meal 1", description: "Our Small Meal Prep Pack comes with 6 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to lose body fat and retain or grow muscle mass.", url: "https://www.bewyld.co.uk/product-page/3-day-nurture-maintain-meal-prep-package" },
      { title: "Lean Meal 2", description: "Our Medium Meal Prep Pack comes with 9 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to lose body fat and retain or grow muscle mass.", url: "https://www.bewyld.co.uk/product-page/3-day-grow-gain-meal-prep-package" },
      { title: "Lean Meal 3", description: "Our Large Meal Prep Pack comes with 9 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to lose body fat and retain or grow muscle mass.", url: "https://www.bewyld.co.uk/product-page/3-day-lean-and-clean-meal-prep-package" }
    ];
  
    // Sample data for bulk meal results
    const bulkMealData = [
      { title: "Bulk Meal 1", description: "Our Small Bulk Meal Prep Pack comes with 6 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to gain Strength and Muscle Mass by including extra Protein and low GI Carbohydrates.", url: "https://www.bewyld.co.uk/product-page/nurture-maintain-meal-prep-package" },
      { title: "Bulk Meal 2", description: "Our Medium Bulk Meal Prep Pack comes with 9 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to gain Strength and Muscle Mass by including extra Protein and low GI Carbohydrates.", url: "https://www.bewyld.co.uk/product-page/copy-of-wyld-bulk-medium-box-9-meals-8-per-meal" },
      { title: "Bulk Meal 3", description: "Our LARGE Bulk Meal Prep Pack comes with 12 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to gain Strength and Muscle Mass by including extra Protein and low GI Carbohydrates.", url: "https://www.bewyld.co.uk/product-page/wyld-bulk-large-box-12-meals-7-50-per-meal" }
    ];
  });
  