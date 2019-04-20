
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

axios.get("/articles").then(function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });

  
  