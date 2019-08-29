$(function () {
    var todaysDate = new Date();
    var currentsYear = todaysDate.getFullYear();
    var range = '1900:' + currentsYear
    $('#txtyear').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: range
    });


});

function validate(){
    /* For name field validation*/
      var u=document.getElementById("fullname").value;
      if(u=="")
      {
      document.getElementById("umsg").innerHTML='Please enter your Full Name.';
      document.getElementById("fullname").focus();
      return false;
      }
      else
      {
          document.getElementById("umsg").innerHTML="";
      }
    }