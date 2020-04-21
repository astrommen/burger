// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // update burger code block
  $(".change-devour").on("click", function(event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newdevour");

    var newDevourState = {
      devoured: newDevour
    };

    console.log(newDevourState);

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(
      function() {
        console.log("changed devour to", newDevour);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // add a burger code block
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var letters = /^[a-zA-Z]+$/;
    // var numbers = /^[0-9]+$/

    if (!$("#bg").val()) {

      alert("Please enter a burger!");

    } else if ($("#bg").val().match(letters)){

      var newBurger = {
        burger_name: $("#bg").val().trim(),
        devoured: $("[name=devour]:checked").val().trim()
      };
  
      console.log(newBurger);
  
      // Send the POST request.
      $.post("/api/burgers", newBurger).then(function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    } else {

      alert("Please enter letters only!");
    }

  });

  // delete a burger block
  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
