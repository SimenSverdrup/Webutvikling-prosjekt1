$(document).ready(function(){
    //sjekk at dokumentet er klart, før vi begynner å gjøre operasjoner på det
    $("#documentation_text").hide();

    $(".doc_button").click(function(){
        $("#documentation_text").fadeToggle("slow");
    });
});

