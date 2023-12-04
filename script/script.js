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
  