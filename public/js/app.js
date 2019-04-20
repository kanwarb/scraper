

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