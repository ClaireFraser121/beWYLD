
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

// Once results are displayed - drop downs visible for the 3 criteria and a regenerate button

// a regenerate button can be clicked if results aren't suitable. 

var questionIndex = 0; // Variable to store questionIndex, which goes up by 1 after each question
var userAnswers = []; // Array to store user answers
// Object for questions, answer options and icon classes for each answer
var fitnessQuestions = [
  {
    question: "What is your fitness goal?",
    answers: ["Bulk", "Tone", "Cardio", "Stretch"],
    iconClass: ["fa-dumbbell", "fa-weight-scale", "fa-heart-pulse", "fa-child-reaching"],
  },
  {
    question: "How intense would you like to go?",
    answers: ["Easy", "Make Me Sweat!",],
    iconClass: ["fa-person-walking", "fa-face-grin-beam-sweat",],

  },
];

// Function to show results page
// NEEDS BUILDING OUT WITH DYNAMIC HTML
var showResults = function(workout, gif) {
  $("#results-screen").removeClass("hide")
  $("#quiz-screen").attr("class", "hide")
  console.log(workout);
  console.log(gif);
  function toTitleCase(string) {
    // Split the string into words
    var words = string.split(' ');
  
    // Capitalize the first letter of each word
    var titleCaseWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  
    // Join the words back into a string
    var titleCaseString = titleCaseWords.join(' ');
  
    return titleCaseString;
  }

  $('#yourWorkout').append(`<h2 class="display-4 mb-4">You asked for workouts to help you ${userAnswers[0].toLowerCase()}`)
  for (var i = 0; i < 3; i++) {
    $('#yourWorkout').append(`<div class="card mb-3">
  <img src="${gif.data[i].images.original.url}" class="mx-3 mt-4 card-img-top" alt="${userAnswers[0]} Workout Gif" style="width:300px">
  <div class="card-body">
    <h3 class="card-title">${workout[i].name}</h3>
    <p class="card-text"><span>Equipment:</span> ${toTitleCase(workout[i].equipment.replace(/_/g, ' '))}</p>
    <h5>Instructions</h5>
    <p class="card-text">${workout[i].instructions}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`)
  }
}

// Function to pass fitnessQuestions into the excercises API and log results
var getWorkout = function() {
  // Maps user answers to parameters the API can understand
  var answerMappings = {
    'Bulk': 'strength',
    'Tone': 'plyometrics',
    'Cardio': 'cardio',
    'Stretch': 'stretching',
    'Easy': 'beginner',
    'Make Me Sweat!': 'intermediate',
  };

var type = answerMappings[userAnswers[0]]; // Maps the user chosen fitness goal to one of the APIable types of workout
var difficulty = answerMappings[userAnswers[1]]; // Maps the user chosen skill level to an APIable parameter
var workoutUrl = "https://api.api-ninjas.com/v1/exercises?type=" + type + "&difficulty=" + difficulty;

// Fetch from workout API
fetch(workoutUrl, {
headers: { 'X-Api-Key': 'Xm9KrAkFaXPAXu1rR0wdLw==EAJWzakA1gYNDQF6' },
})
.then(function (response) {
  console.log(workoutUrl)
  return response.json();
})
.then(function (workoutData) {
  getGiphy(type, workoutData)
})
.catch(function (error) {
  console.error(error);
});
};

// Function to pass workoutData into Giphy API to get a gif
var getGiphy = function (type, workoutData) {
// Maps user answers to appropriate Giphy ID's
  var giphyMappings = {
    'strength': ['o4HacXW6rQty0', 'f5dDxjoo0MSnQMFPOp', 'dt40pTFK4lETk43ldq', '1oC7CzF6DHBQqPniuS'],
    'plyometrics': ['3oKIPz238SgcY0p8xG', 'xeUFXl6Wspcz6Yv7cY', 'jkrI2HmUmdDlBz9oeN', 'H6o2fJlAPEiVhJN3M6'],
    'cardio': ['dUelhsHEDmf3UXqGQJ', 'w6VJN62HsjRceiqier', '61Uq7xBqtFu57tYqtV', '26kNaMjv2yfeqgVrZ3'],
    'stretching': ['3oKIPpaHCfN7ECPIGs', 'DBbPjLMsQPruMkDcrd', 'YSrDx5MlMDp3dvYCML', 'ef0AeVgH1Jb0FBNKq1']
  };

  var getRandomGif = function(type) {
    var value = giphyMappings[type];
    
    // Shuffle the array
    for (var i = value.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [value[i], value[j]] = [value[j], value[i]];
    }
    return value;
  };
  
  var randomGiphyId = getRandomGif(type); // Store random giphyMappings value in variable
  console.log(randomGiphyId)
  var giphyKey = "BpXTUZMuQkSFoZt9q5biIp1nwCwE5xEh";
  var giphyURL = "https://api.giphy.com/v1/gifs?ids=" + randomGiphyId + "&api_key=" + giphyKey;

  // Fetch from Giphy API
  fetch(giphyURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (gifData) {
    showResults(workoutData, gifData);
  })
  .catch(function (error) {
    console.error(error);
});
};

// Generate Quiz question cards
var generateQuestion = function () {
  // If statement to run through the length of the fitnessQuestions object and display components
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
    getWorkout();
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

// -------------------------- CLAIRE'S CODE ---------------------------------

// document.addEventListener("DOMContentLoaded"), function () {
//   // Sample data for dropdown options
  const goals = ["Bulking", "Slimming", "Cardio", "Stretching"];
  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const muscles = [
    "Abdominals",
    "Abductors",
    "Adductors",
    "Biceps",
    "Calves",
    "Chest",
    "Forearms",
    "Glutes",
    "Hamstrings",
    "Lats",
    "Lower Back",
    "Middle Back",
    "Neck",
    "Quadriceps",
    "Traps",
    "Triceps"
  ];
  const exerciseNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

//   // Function to dynamically generate dropdown options
  function populateDropdown(selectElement, options) {
    options.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.text = option;
      selectElement.appendChild(optionElement);
    });
  }

  // Populate dropdowns
  populateDropdown(document.getElementById("goalSelect"), fitnessQuestions[0].answers);
  populateDropdown(document.getElementById("skillSelect"), fitnessQuestions[1].answers);
 

//   // Function to dynamically generate workout buttons
  function generateWorkoutButtons(container, workouts) {
    workouts.forEach(workout => {
      const button = document.createElement("button");
      button.classList.add("btn", "btn-primary", "mb-2");
      button.textContent = workout;
      container.appendChild(button);

//       // Add click event listener to each button
      button.addEventListener("click", function () {
        // Get user selections
        const selectedGoal = document.getElementById("goalSelect").value;
        const selectedSkill = document.getElementById("skillSelect").value;
//         const selectedMuscle = document.getElementById("muscleSelect").value;
//         const selectedExerciseNumber = document.getElementById("exerciseSelect").value;

//         // Translate user-friendly fitness goal to API terms
//         const apiFitnessGoal = translateFitnessGoal(selectedGoal);

//         // Make API request based on user selections
        makeApiRequest(apiFitnessGoal, selectedSkill, selectedMuscle, selectedExerciseNumber);
      });
    });
  }

//   // Populate workout buttons
  generateWorkoutButtons(document.getElementById("workoutsContainer"), ["View Your Results"]);


  // This will get the category IDs based on the provided category
  // var categoryIds = categories[category];

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
    
    
// 

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