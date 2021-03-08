$(document).ready(function(){
  var counter=0;
  var c=0;
  var i=setInterval(function(){
    $("#loadingPercent").html(c + "%");
    $("#logo_left_left").css("left", (-100 + c) + "%");

    counter++;
    c++;
    if(counter == 101){
      clearInterval(i);
      $("#loading").fadeOut(500);
    }

  },10);
})