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
//     excerciseNumber: answer to 4th question
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

var questionIndex = 0;
var userAnswers = []; // Array to store user answers
var fitnessQuestions = [
  {
    question: "What is your fitness goal?",
    answers: ["Bulk", "Tone", "Cardio", "Stretch"],
    iconClass: ["fa-dumbbell", "fa-weight-scale", "fa-heart-pulse", "fa-child-reaching"],
  },
  {
    question: "How would you describe your fitness level?",
    answers: ["Beginner", "Intermediate", "Advanced"],
    iconClass: ["fa-circle", "fa-circle-half-stroke", "fa-circle",],

  },
  {
    question: "What part of the body would you like to work on?",
    answers: ["Chest", "Arms", "Abs", "Back", "Bum", "Legs"],
  },
  {
    question: "How many excercises would you like?",
    answers: [1, 3, 5],
    iconClass: ["fa-1", "fa-3", "fa-5"],
  }
];

var generateQuestion = function () {
  if (questionIndex < fitnessQuestions.length) {
    $('#question-title').text(fitnessQuestions[questionIndex].question);
    for (var i = 0; i < fitnessQuestions[questionIndex].answers.length; i++) {
      var iconHtml = "";
      if (questionIndex !== 2) {
        iconHtml = `<i class="fa-solid ${fitnessQuestions[questionIndex].iconClass[i]} fa-5x" style="color: #292b2e;"></i>`;
      }
      $('#card-container').append(`<div class="card question-card text-center m-3 pt-3" style="width: 18rem;">
       ${iconHtml}
      <div class="card-body">
        <h5 class="card-title">${fitnessQuestions[questionIndex].answers[i]}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>`);
      if (i === 1 || i === 3) {
        $('#card-container').append('<div class="row justify-content-center"></div>');
      }
    }
  } else {
    console.log(userAnswers)
}
};

generateQuestion();

$('#card-container').on('click', '.card', function (event) {
  var userAnswer = $(event.currentTarget).find('.card-title').text();
  userAnswers.push(userAnswer);
  questionIndex++
  $('#card-container').text("");
  generateQuestion();
});

// document.addEventListener("DOMContentLoaded"), function () {
//   // Sample data for dropdown options
//   const goals = ["Bulking", "Slimming", "Cardio", "Stretching"];
//   const skillLevels = ["Beginner", "Intermediate", "Advanced"];
//   const muscles = [
//     "Abdominals",
//     "Abductors",
//     "Adductors",
//     "Biceps",
//     "Calves",
//     "Chest",
//     "Forearms",
//     "Glutes",
//     "Hamstrings",
//     "Lats",
//     "Lower Back",
//     "Middle Back",
//     "Neck",
//     "Quadriceps",
//     "Traps",
//     "Triceps"
//   ];
//   const exerciseNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

//   // Function to dynamically generate dropdown options
//   function populateDropdown(selectElement, options) {
//     options.forEach(option => {
//       const optionElement = document.createElement("option");
//       optionElement.value = option;
//       optionElement.text = option;
//       selectElement.appendChild(optionElement);
//     });
//   }

//   // Populate dropdowns
//   populateDropdown(document.getElementById("goalSelect"), goals);
//   populateDropdown(document.getElementById("skillSelect"), skillLevels);
//   populateDropdown(document.getElementById("muscleSelect"), muscles);
//   populateDropdown(document.getElementById("exerciseSelect"), exerciseNumbers);

//   // Function to dynamically generate workout buttons
//   function generateWorkoutButtons(container, workouts) {
//     workouts.forEach(workout => {
//       const button = document.createElement("button");
//       button.classList.add("btn", "btn-primary", "mb-2");
//       button.textContent = workout;
//       container.appendChild(button);

//       // Add click event listener to each button
//       button.addEventListener("click", function () {
//         // Get user selections
//         const selectedGoal = document.getElementById("goalSelect").value;
//         const selectedSkill = document.getElementById("skillSelect").value;
//         const selectedMuscle = document.getElementById("muscleSelect").value;
//         const selectedExerciseNumber = document.getElementById("exerciseSelect").value;

//         // Translate user-friendly fitness goal to API terms
//         const apiFitnessGoal = translateFitnessGoal(selectedGoal);

//         // Make API request based on user selections
//         makeApiRequest(apiFitnessGoal, selectedSkill, selectedMuscle, selectedExerciseNumber);
//       });
//     });
//   }

//   // Populate workout buttons
//   generateWorkoutButtons(document.getElementById("workoutsContainer"), ["View Your Results"]);

//   // Function to translate user-friendly fitness goals to API terms
//   const fitnessGoalMapping = {
//     "Bulking": "strength",
//     "Slimming": "plyometrics",
//     "Cardio": "cardio",
//     "Stretching": "stretching"
//   };

//   function translateFitnessGoal(userFriendlyGoal) {
//     return fitnessGoalMapping[userFriendlyGoal] || userFriendlyGoal;
//   }

//   // Function to make API request
//   function makeApiRequest(goal, skill, muscle, exerciseNumber) {
//     $.ajax({
//       method: 'GET',
//       url: `https://api.api-ninjas.com/v1/exercises?&difficulty=${skill}&muscle=${muscle}&goal=${goal}&limit=${exerciseNumber}`,
//       headers: { 'X-Api-Key': 'Xm9KrAkFaXPAXu1rR0wdLw==EAJWzakA1gYNDQF6' },
//       contentType: 'application/json',
//       success: function (result) {
//         // Process and display API results here
//         console.log(result);
//         displayWorkouts(result); // Assuming you have a function to display the results
//       },
//       error: function ajaxError(jqXHR) {
//         console.error('Error: ', jqXHR.responseText);

//       // All the code below is from a test file and needs to be incorporated into the results ouput for exercises
//   // There is example code which generates buttons to select from the 4 categories: Strength, Plyometrics, Cardio, and Stretching 
//   // Strength = Bulking, Plyometrics = Slimming, Cardio and Stretching matches

// // This function obtains a random ID from an array of category IDs
// function getRandomId(categoryIds) {
//   var randomIndex = Math.floor(Math.random() * categoryIds.length);
//   return categoryIds[randomIndex];
// }

// // This function retrieves a Giphy image based on a category and API key
// function getGiphyImage(apiKey, category) {
//   // Object containing Giphy IDs for different exercise categories
//   var categories = {
//       'Strength': ['o4HacXW6rQty0', 'f5dDxjoo0MSnQMFPOp', 'dt40pTFK4lETk43ldq', '1oC7CzF6DHBQqPniuS'],
//       'Plyometrics': ['3oKIPz238SgcY0p8xG', 'xeUFXl6Wspcz6Yv7cY', 'jkrI2HmUmdDlBz9oeN', 'H6o2fJlAPEiVhJN3M6'],
//       'Cardio': ['dUelhsHEDmf3UXqGQJ', 'w6VJN62HsjRceiqier', '61Uq7xBqtFu57tYqtV', '26kNaMjv2yfeqgVrZ3'],
//       'Stretching': ['3oKIPpaHCfN7ECPIGs', 'DBbPjLMsQPruMkDcrd', 'YSrDx5MlMDp3dvYCML', 'ef0AeVgH1Jb0FBNKq1']
//   };

//   // This will get the category IDs based on the provided category
//   var categoryIds = categories[category];

//   // This will check if the category is valid
//   if (!categoryIds) {
//       console.error('Invalid category.');
//       return null;
//   }

//   // This will get a random ID from the category
//   var selectedId = getRandomId(categoryIds);

//   // This will then set up the Giphy API endpoint and parameters
//   var endpoint = 'https://api.giphy.com/v1/gifs';
//   var params = new URLSearchParams({
//       api_key: apiKey,
//       ids: selectedId
//   });
//   var url = endpoint + '?' + params.toString();

//   console.log('API Request URL:', url);

//   return fetch(url)
//       .then(function (response) {
//           console.log('API Response Status:', response.status);

//           if (!response.ok) {
//               throw new Error('HTTP error! Status: ' + response.status);
//           }

//           return response.json();
//       })
//       .then(function (data) {
//           console.log('API Response Data:', data);

//           if (data.data && data.data.length > 0) {
//               // This grabs the image URL from the API response
//               var imageUrl = data.data[0].images.original.url;
//               console.log('Image URL:', imageUrl);
//               return data.data[0];
//           } else {
//               console.error('No valid data found in the response.');
//               return null;
//           }
//       })
//       .catch(function (error) {
//           console.error('Error making Giphy API request:', error);
//           return null;
//       });
// }

// // See example below. This can be used for structuring the code to sync up both APIs
// var apiKey = 'KoDhL5K0ZtHXlWn5Dsuxf9rQaSPHtZWP';
// var category = 'Strength';

// // This function will handle a click on an exercise category button
// function handleExerciseCategoryClick(category) {
//   // This fetches exercise title, difficulty level, and instructions from API Ninja
//   // For demonstration purposes, a placeholder text is used here, which needs to be replaced with API Ninja data
//   var exerciseInfo = {
//       title: 'Sample Exercise title',
//       difficulty: 'Intermediate',
//       instructions: 'Sample Exercise Instructions'
//   };

//   // This dynamic html placeholder text is here for demo purposes and can be deleted/replaced with API Ninja data
//   var exerciseInfoContainer = document.getElementById('exercise-info');
//   exerciseInfoContainer.innerHTML = `
//       <h2>${exerciseInfo.title}</h2>
//       <p>Difficulty: ${exerciseInfo.difficulty}</p>
//       <p>Instructions: ${exerciseInfo.instructions}</p>
//   `;

//   /// This is how we get and display a Giphy image
//   getGiphyImage(apiKey, category)
//   .then(function (result) {
//       var giphyImageContainer = document.getElementById('giphy-image');

//       if (result) {
//           // We use the 'imageUrl' obtained from the Giphy API response
//           var imageUrl = result.images.original.url;

//           // We create an <img> element and set its src attribute so the image can be displayed
//           var imageElement = document.createElement('img');
//           imageElement.src = imageUrl;
//           imageElement.alt = 'Giphy Image';

//           // Clear the container and append the image
//           giphyImageContainer.innerHTML = '';
//           giphyImageContainer.appendChild(imageElement);
//       } else {
//           giphyImageContainer.innerHTML = '<p>No Giphy image found.</p>';
//       }
//   });
// }

// // The code below which is used to dynamically create buttons for each exercise category can be replaced with the 4 large icons
// var exerciseCategories = ['Strength', 'Plyometrics', 'Cardio', 'Stretching'];
// var exerciseButtonsContainer = document.getElementById('exercise-buttons');

// exerciseCategories.forEach(function (category) {
//   var button = document.createElement('button');
//   button.textContent = category;
//   button.className = 'btn btn-primary';
//   button.addEventListener('click', function () {
//       handleExerciseCategoryClick(category);
//   });
//   exerciseButtonsContainer.appendChild(button);
    
//       // Function to translate user-friendly fitness goals to API terms
//       const fitnessGoalMapping = {
//         "Bulking": "strength",
//         "Slimming": "plyometrics",
//         "Cardio": "cardio",
//         "Stretching": "stretching"
//       };
    
//       function translateFitnessGoal(userFriendlyGoal) {
//         return fitnessGoalMapping[userFriendlyGoal] || userFriendlyGoal;
//       }
    
//       // Function to make API request
//       function makeApiRequest(goal, skill, muscle, exerciseNumber) {
//         $.ajax({
//           method: 'GET',
//           url: `https://api.api-ninjas.com/v1/exercises?&difficulty=${skill}&muscle=${muscle}&goal=${goal}&limit=${exerciseNumber}`,
//           headers: { 'X-Api-Key': 'Xm9KrAkFaXPAXu1rR0wdLw==EAJWzakA1gYNDQF6' },
//           contentType: 'application/json',
//           success: function (result) {
//             // Process and display API results here
//             console.log(result);
//             displayWorkouts(result); // Assuming you have a function to display the results
//           },
//           error: function ajaxError(jqXHR) {
//             console.error('Error: ', jqXHR.responseText);
//           }
//         });

//       }
//     });
//   }

//   // Function to display workout results (modify as needed)
//   function displayWorkouts(results) {
//     // Clear previous results
//     const workoutsContainer = document.getElementById("workoutsContainer");
//     workoutsContainer.innerHTML = "";

//     // Display results, modify as needed
//     results.forEach(result => {
//       const workoutCard = document.createElement("div");
//       workoutCard.classList.add("card", "mb-4");

//       const workoutCardContent = `
//             <div class="card-body">
//               <h5 class="card-title">${result.name}</h5>
//               <p class="card-text">${result.description}</p>
//             </div>
//           `;

//       workoutCard.innerHTML = workoutCardContent;
//       workoutsContainer.appendChild(workoutCard);
//     });
//   }

//   // Function to save results to Local Storage
//   function saveResultsToLocalStorage(results) {
//     localStorage.setItem('savedResults', JSON.stringify(results));
//   }

//   // Function to get results from Local Storage
//   function getResultsFromLocalStorage() {
//     const savedResults = localStorage.getItem('savedResults');
//     return savedResults ? JSON.parse(savedResults) : null;
//   }

//   // Function to display saved results
//   function displaySavedResults() {
//     const savedResults = getResultsFromLocalStorage();

//     if (savedResults) {
//       // Display saved results on the page as needed
//       console.log("Saved Results:", savedResults);
//       // Modify the display logic based on your page structure
//     } else {
//       console.log("No saved results found.");
//     }
//   }

//   // Event listener for the "Save Results" button
//   document.getElementById("saveResultsBtn").addEventListener("click", function () {
//     // Get current results (modify this based on your page structure)
//     const currentResults = /* logic to get current results */

//       // Save results to Local Storage
//       saveResultsToLocalStorage(currentResults);
//   });

//   // Event listener for history buttons
//   document.getElementById("historyBtn").addEventListener("click", function () {
//     // Display saved results when history button is clicked
//     displaySavedResults();
//   });

//   // Sample data for meal cards (copied from WYLD website so can be changed)
//   const leanMealData = [
//     { title: "Lean Meal 1", description: "Our Small Meal Prep Pack comes with 6 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to lose body fat and retain or grow muscle mass.", url: "https://www.bewyld.co.uk/product-page/3-day-nurture-maintain-meal-prep-package" },
//     { title: "Lean Meal 2", description: "Our Medium Meal Prep Pack comes with 9 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to lose body fat and retain or grow muscle mass.", url: "https://www.bewyld.co.uk/product-page/3-day-grow-gain-meal-prep-package" },
//     { title: "Lean Meal 3", description: "Our Large Meal Prep Pack comes with 9 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to lose body fat and retain or grow muscle mass.", url: "https://www.bewyld.co.uk/product-page/3-day-lean-and-clean-meal-prep-package" }
//   ];

//   const bulkMealData = [
//     { title: "Bulk Meal 1", description: "Our Small Bulk Meal Prep Pack comes with 6 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to gain Strength and Muscle Mass by including extra Protein and low GI Carbohydrates", url: "https://www.bewyld.co.uk/product-page/nurture-maintain-meal-prep-package" },
//     { title: "Bulk Meal 2", description: "Our Medium Bulk Meal Prep Pack comes with 9 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to gain Strength and Muscle Mass by including extra Protein and low GI Carbohydrates", url: "https://www.bewyld.co.uk/product-page/copy-of-wyld-bulk-medium-box-9-meals-8-per-meal" },
//     { title: "Bulk Meal 3", description: "Our LARGE Bulk Meal Prep Pack comes with 12 meals of your choice from the beWYLD Meal Prep Menu and is designed for those that want to gain Strength and Muscle Mass by including extra Protein and low GI Carbohydrates", url: "https://www.bewyld.co.uk/product-page/wyld-bulk-large-box-12-meals-7-50-per-meal" }
//   ];

//   // Function to dynamically generate meal cards
//   function generateMealCards(container, mealData) {
//     mealData.forEach(meal => {
//       const card = document.createElement("div");
//       card.classList.add("card", "mb-4");

//       const cardContent = `
//             <div class="card-body">
//               <h5 class="card-title">${meal.title}</h5>
//               <p class="card-text">${meal.description}</p>
//               <a href="${meal.url}" target="_blank" class="btn btn-primary">Find out more</a>
//             </div>
//           `;

//       card.innerHTML = cardContent;
//       container.appendChild(card);
//     });
//   }

//   // Populate meal cards
//   generateMealCards(document.getElementById("leanMealContainer"), leanMealData);
//   generateMealCards(document.getElementById("bulkMealContainer"), bulkMealData);

//   // Event listener for the "View BeWYLD Menu" button
//   document.getElementById("viewMenuBtn").addEventListener("click", function () {
//     // Open the PDF in a new tab or window
//     window.open("https://www.bewyld.co.uk/_files/ugd/d9fc74_06834711b1094e22a5fbc17f3c3a8362.pdf", "_blank");
//   });
// });