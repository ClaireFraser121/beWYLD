$(document).ready(function () {
    // Function to update the workout list with saved workouts
    function updateList() {
        // Get the container element for the history list
        var savedWorkoutContainer = $("#history-container");
        // Clear the existing content of the history list
        savedWorkoutContainer.empty();

        // Retrieve the workout history from localStorage
        var savedWorkouts = JSON.parse(localStorage.getItem("savedWorkouts")) || [];

        // Loop through the saved workout history
        savedWorkouts.forEach(function (workoutData) {
            // Create a list item for each workout and append it to the history list
            var listItem = $("<li>").text(workoutData.workout);
            savedWorkoutContainer.append(listItem);
        });
    }

    // Call the updateHistory function when the page is loaded
    updateHistory();

    // Event listener for the button to clear workout history and update the history list
    $("#clearFieldBtn").click(function (event) {
        // Prevent the default behavior when the button is clicked
        event.preventDefault();
        // Clear workout history from localStorage
        localStorage.removeItem("workoutHistory");
        // Update the history list
        updateHistory();
    });
});