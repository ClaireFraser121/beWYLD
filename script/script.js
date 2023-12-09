var questionIndex = 0; // Variable to store questionIndex, which goes up by 1 after each question
var userAnswers = []; // Array to store user answers
// Object for questions, answer options and icon classes for each answer
var fitnessQuestions = [
  {
    question: "What is your fitness goal?",
    answers: ["Bulk", "Tone", "Cardio", "Stretch"],
    iconClass: ["fa-dumbbell", "fa-weight-scale", "fa-heart-pulse", "fa-child-reaching"]
  },
  {
    question: "How intense would you like to go?",
    answers: ["Easy", "Make Me Sweat!",],
    iconClass: ["fa-person-walking", "fa-face-grin-beam-sweat",]
  },
];

// Function to dynamically match meals based on fitness goals
var mealMatcher = function () {
  var fitnessGoals = {
    'Bulk': bulkMealCard,
    'Tone': leanMealCard,
    'Cardio': leanMealCard,
    'Stretch': leanMealCard,
  };
};

// Dynamically generate dropdown options for the results page
var populateDropdowns = function (element, options) {
  for (var i = 0; i < options.length; i++) {
    var optionEl = document.createElement("option");
    optionEl.value = options[i];
    optionEl.text = options[i];
    element.append(optionEl);
  }
}

// Function to show results page
var showResults = function (workout, gif) {
  $("#results-screen").removeClass("hide")
  $("#quiz-screen").attr("class", "hide")
  console.log(workout);
  console.log(gif);
// Function to change equipment string to title case
  var toTitleCase = function (string) {
    var words = string.split(' '); // Split the string into words
    var titleCaseWords = words.map(word => { // Capitalize the first letter of each word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    var titleCaseString = titleCaseWords.join(' ');  // Join the words back into a string
    return titleCaseString;
  }
  // Dynamically display results page content
  $('#yourWorkout').append(`<h2 class="display-4 mb-4">You asked for workouts to help you ${userAnswers[0].toLowerCase()}`);
  for (var i = 0; i < 3; i++) {
    $('#yourWorkout').append(`<div class="card mb-3">
  <img src="${gif.data[i].images.original.url}" class="mx-3 mt-4 card-img-top" alt="${userAnswers[0]} Workout Gif" style="width:300px">
  <div class="card-body">
    <h3 class="card-title">${workout[i].name}</h3>
    <p class="card-text"><span>Equipment:</span> ${toTitleCase(workout[i].equipment.replace(/_/g, ' '))}</p>
    <h5>Instructions</h5>
    <p class="card-text">${workout[i].instructions}</p>
    <a href="#" id="btn-${i}" class="btn btn-primary">Save exercise</a>
  </div>
</div>`)
  }
  // Function to show/hide meal cards based on user answer
  var toggleMealCard = function (userAnswer) {
    // Hide both meal cards initially
    $("#leanMealCard").hide();
    $("#bulkMealCard").hide();

    // Determine which meal card to show based on user's answer
    if (userAnswer === "Tone" || userAnswer === "Cardio" || userAnswer === "Stretch") {
      $("#leanMealCard").show();
    } else if (userAnswer === "Bulk") {
      $("#bulkMealCard").show();
    }
  };
  toggleMealCard(userAnswers[0]);
  // Display meal cards based on fitness goal
  mealMatcher();
};

// Function to pass fitnessQuestions into the excercises API and log results
var getWorkout = function () {
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

  // Gets random gif from the giphyMappings arrays
  var getRandomGif = function (type) {
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
      </div>
    </div>`);
      if (i === 1 || i === 3) {
        $('#card-container').append('<div class="row justify-content-center"></div>');
      }
    }
  } else {
    console.log(userAnswers)
    getWorkout();
    populateDropdowns($("#goalSelect"), fitnessQuestions[0].answers);  // Populate dropdowns
    populateDropdowns($("#skillSelect"), fitnessQuestions[1].answers);

  }
};

generateQuestion(); // Call the function to start the quiz

// event listener to regenerate quiz questions
$('#regenerateResultsBtn').on('click', function (event) {
  event.preventDefault();
  var selectedGoal = $('#goalSelect').val();
  var selectedSkill = $('#skillSelect').val();
  userAnswers = [];
  userAnswers.push(selectedGoal, selectedSkill);
  $("#leanMealCard").hide();
  $("#bulkMealCard").hide();
  $('#yourWorkout').text("");
  getWorkout();
});

// event listener to book trainer
$('#bookaTrainerBtn').on('click', function (event) {
  event.preventDefault();
  window.open('./book-a-trainer.html', '_blank');
});

// event listener to book trainer
$('#mealPrep').on('click', '.btn', function (event) {
  event.preventDefault();
  window.open('https://www.bewyld.co.uk/shop', '_blank');
});

// event listener to view menu
$('#viewMenuBtn').on('click', function (event) {
  event.preventDefault();
  window.open('https://www.bewyld.co.uk/_files/ugd/d9fc74_06834711b1094e22a5fbc17f3c3a8362.pdf', '_blank');
});

// Event listener for all quiz cards
$('#card-container').on('click', '.card', function (event) {
  var userAnswer = $(event.currentTarget).find('.card-title').text();
  userAnswers.push(userAnswer);
  questionIndex++
  $('#card-container').text("");
  generateQuestion();
});