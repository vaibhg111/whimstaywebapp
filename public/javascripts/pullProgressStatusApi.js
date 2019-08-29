
var baseUrl=globalUrl;
var userId = document.getElementById("userId").value;
$(document).ready(function () {
$('#addNewListingButtonId').click(function () {
    // http://localhost:8080/v1/user/%7BuserId%7D/pullPropertyProgressStatus
    $.ajax({
        dataType: "json",
        type: "GET",
        url: baseUrl + 'v1/user/' + userId + '/pullPropertyProgressStatus',
        success: function (result, textStatus, xhr) {
           
            console.log(result)
            sessionStorage.setItem("isButtonDesable", result);
        }
    });
    });
});