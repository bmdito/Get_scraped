$(document).ready(function(){


$(document).on("click", "#buttScrape", function(){
    console.log("You clicked butt");

    $.ajax({
        method: "GET",
        url: "/scrape"
      }).then(function(data){
         location.reload();
      })
      
});    

$(document).on("click", ".notey", function(){
    console.log("you clicked notes");
   var noteId = $(this).attr("data-id"); 
   
   
    
    $.ajax({
        method: "GET",
        url: "/addnote/" + noteId
      }).then(function(result){
        console.log(result);
        
        $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      })
      

});

$(document).on("click", ".sv", function(){

    
        let id = $(this).data('id');

        $.ajax({
            url: `/article/${id}`,
            method: 'PUT'
        })
        .then((data)=>{
            location.reload();
        });
    
});

$(document).on("click", "#subCom", function() {
    event.preventDefault();
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleCom").val(),
        // Value taken from note textarea
        comment: $("#commentArea").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });



})