$(document).on("click", "#savearticle", function(event){
  event.preventDefault();
  var articleId = event.target.dataset.name;
   console.log(event.target.dataset.name);
  alert("savearticle clicked "+ event.target.dataset.name);
  axios.put("/savearticle", {
    data: {
      id: articleId,
      saved: true
    }
  }).then(function(response) {
    console.log(response);
      });
});



$(document).ready(function(){
    $("#scrapenew").on("click", function(){
       axios.get("/scrape").then(function(response){
            console.log(response);
            alert("Scraped data")
            $("input[name='scrape']").text(response);

        })
        $('#modal1').modal( {
            ready: function(modal, trigger) {
                 modal.find('input[name="scrape"]').val(trigger.data('scrape'))
            }
        });
       
    })

});

$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
        $('#noteModal').modal( {
          ready: function(modal, trigger) {
               modal.find('textarea[name="newNote"]').val(trigger.data('id'))
          }
      });
      var text = $("#mynote").val();
      alert(text);
      axios.post("/note", {
      data: {
        id: thisId,
        body: text
      }
    }).then(function(data) {
        $("#mynote").empty();
      });
    });
  
  
