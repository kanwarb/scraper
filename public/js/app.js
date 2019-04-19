
$(document).ready(function(){
    var instance = M.Modal.getInstance(elem);

    $("#saveScraped").on("click", function(){
        instance.open();
    });

});