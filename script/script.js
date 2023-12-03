document.addEventListener("DOMContentLoaded", function () {
    // Sample data for fitness goals
    const fitnessGoals = [
      { title: "Bulking", text: "Achieve your goal of gaining muscle mass and size with our bulking program.", image: "bulking-image.jpg", resultType: "bulk" },
      { title: "Toning", text: "Define and sculpt your body with our toning program designed for a lean physique.", image: "toning-image.jpg", resultType: "lean" },
      { title: "Cardio", text: "Maintain cardiovascular health with our cardio program for a healthy lifestyle.", image: "cardio-image.jpg", resultType: "lean" }
    ];
  
     // Get the container where cards will be appended
     const cardContainer = document.getElementById("cardContainer");
  
     