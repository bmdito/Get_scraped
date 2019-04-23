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
    
    
    $.ajax({
        method: "GET",
        url: "/addnote"
      }).then(function(){
         window.location("/addnote");
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
    
})

})