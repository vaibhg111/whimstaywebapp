var newurl = globalUrl;

$('#homeawayLogin').click(function () {

    var u = document.getElementById("stcode").value;
    if (u == "") {
        document.getElementById("stcode1").innerHTML = 'Please enter ST Code.';
        document.getElementById("stcode").focus();
        return false;
    }
    else {
        document.getElementById("stcode1").innerHTML = "";
    }
    
    var data = new Object();
    data.stCode = document.getElementById("stcode").value;
    data.pullType = "hm";
    // console.log("User iD"+data.stCode);
    // console.log("User iD"+document.getElementById("userId").value );

    //$('#spinner').modal();

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
        url: newurl + 'v1/user/' + document.getElementById("userId").value + '/property/homeaway',
        success: function (result) {
            //console.log(JSON.stringify(result));
            document.getElementById("msges-body").innerHTML = "Woohoo! Your properties are being imported! We will email when complete!";
			$('#HomeAway-modal').show();
           // console.log("Property Import Successfully");
            $('#spinner').modal('hide');
            location.href = "/listing";
            //    console.log(JSON.stringify(result));
            // console.log("Bed");
        },
        error: function (xhr, textStatus, errorThrown) {
            document.getElementById("msges-body").innerHTML = "Oops! The HomeAway connection is away from home at the moment. Should be back in a few hours!";
            $('#HomeAway-modal').show();
            
           // console.log("Authentication Failed");
            $('#spinner').modal('hide');
            // console.log(errorThrown);

            // console.log(textStatus);
        },
    });








});