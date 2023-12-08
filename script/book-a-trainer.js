$(document).ready(function () {
    // Handle click event for "Book A Session" button
    $("#bookSessionBtn").on("click", function () {
        // Show the Bootstrap modal
        $("#bookSessionModal").modal("show");
    });

    // Handle form submission
    $("#bookingForm").submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get form data
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var subscribe = $("#subscribeCheckbox").is(":checked");

        // Log form data (you can replace this with your form handling logic)
        console.log("Name: " + name);
        console.log("Email: " + email);
        console.log("Message: " + message);
        console.log("Subscribe: " + subscribe);

        // Close the modal
        $("#bookSessionModal").modal("hide");

        // Show the "Return To Results Page" button and hide the "Book A Session" button
        $("#returnToResultsContainer").show();
        $("#bookSessionBtn").hide();

        // Optional: Perform additional actions after form submission
        // For example, display a confirmation message or send data to a server
    });

    // Handle click event for "Return To Results Page" button
    $("#returnToResultsBtn").on("click", function () {
        // Redirect to the index.html page
        window.location.href = "index.html";
    });
    // Handle click event for "Return To Results Page" button
    $("#returnToResultsBtn").on("click", function () {
        // Redirect to the index.html page
        window.location.href = "index.html";
    });
});