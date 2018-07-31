$(document).ready(function () {


    // Initial array of aminals
    var animals = ["dog", "cat", "rabbit", "hampster", "skunk", "goldfish", "bird", "farret", "turtle", "sugar glider", 
                   "chinchilla", "hedge hog", "hemit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig",
                    "serval", "salamander", "frog"];

    // display Animal Info function re-renders the HTML to display the appropriate content
    function displayAnimalInfo() {

        // Retrive search criteria 
        var animal = $(this).attr("data-name");

         // build search Query
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=12";

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            // Storing an array of results only fron the respnse into the results variable
            var results = response.data;

            // Deleting the animals prior to adding new animals
            // (this is necessary otherwise you will have repeat animals)
            $("#animals-view").empty();

            // Creating a div to hold the animals
            var animalDiv = $("<div class='animal'>");


            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var wrapDiv = $("<div class='animal-wrap'>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);
                    
                    // Assign a class to paragraph tag
                    p.attr("class", "image-heading");

                    // Creating an image tag
                    var amimalImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    var imageStill = results[i].images.fixed_width_still.url;
                    var imageAnimate = results[i].images.fixed_height.url;

                    amimalImage.attr("src", imageStill);
                    amimalImage.attr("data-still", imageStill);
                    amimalImage.attr("data-animate", imageAnimate);
                    amimalImage.attr("data-state", "still");
                    amimalImage.attr("class", "gif");

                    // Appending the paragraph and amimalImage we created to the "gifDiv" div we created
                    animalDiv.append(wrapDiv);
                    wrapDiv.append(p);
                    wrapDiv.append(amimalImage);
                    $("#animals-view").prepend(animalDiv);
                }
            }
        });
    }

    // Function for displaying animal data
    function renderButtons() {
        // Deleting the amimals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // clear input 
        $("#animal-input").val('');

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

            // Dynamicaly generate buttons for each animal in the array
            var a = $("<button>");
            // Adding a class of animal-btn to our button
            a.addClass("animal-btn");
            // Adding a data-attribute
            a.attr("data-name", animals[i]);
            // Providing the initial button text
            a.text(animals[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }


    // This function handles events where a animal button is clicked
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
    });

    // Function for toggling animation
    function changeImageState() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
      
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        } else {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
    }


    // Adding a click event listener to all elements with a class of "gif"
    $(document).on("click", ".gif", changeImageState);

    // Adding a click event listener to all elements with a class of "animal-btn"
    $(document).on("click", ".animal-btn", displayAnimalInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
   

});
