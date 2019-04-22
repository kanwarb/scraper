$(document).on("click", "#savearticle", function(event){
  event.preventDefault();
  var articleId = event.target.dataset.name;
  axios.put("/savearticle", {
    data: {
      id: articleId,
      saved: true
    }
  }).then(function(response) {
    location.reload();
      });
});

$(document).on("click", "#deletearticle", function(event){
  event.preventDefault();
  console.log(event)
  var articleId = event.target.dataset.id;
  axios.delete("/deletearticle", {
    data: {
      id: articleId,
    }
  }).then(function(response) {
    location.reload();
      });
});

$(document).ready(function(){
    $("#scrapenew").on("click", function(event){
      event.preventDefault();
       axios.get("/scrape").then(function(response){
          console.log(response.length);
            $("#modal1").modal();
        })

    })
   
});

$(document).on("click", "#savenote", function(event) {
    // Grab the id associated with the article from the submit button
    var thisId = event.target.dataset.id;
    alert(event.target);
    axios.get("/articles/" + thisId, {
    }).then(function(data){
      if (data.note) {
        $('#noteModal').modal();
        // Place the title of the note in the title input
        $("#mytitle").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#mynote").val(data.note.body);
        
      }
      else{
        $('#noteModal').modal();
        var title = $("#mytitle").val();
        var text = $("#mynote").val();
        axios.post("/articles/" +thisId, {
        data: {
          title: title,
          body: text
        }
      }).then(function(data) {
          $("#mynote").empty();
        });
      }
    });   
        
      
});
  
