
$(document).ready(function(){
    $("#scrapenew").on("click", function(){
       axios.get("/scrape").then(function(response){
            console.log(response);
            alert("Scraped data")
            $("input[name='scrape']").text(response);

        })
        $('.modal').modal( {
            ready: function(modal, trigger) {
                 modal.find('input[name="scrape"]').val(trigger.data('scrape'))
            }
        });
       
    })

});

$(document).on("click", "#saveNote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    $('.modal').modal( {
      ready: function(modal, trigger) {
           modal.find('input[name="notes"]').val(trigger.data('id'))
      }
  });
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
    });
  