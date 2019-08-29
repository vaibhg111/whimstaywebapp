var userId = document.getElementById("userId").value;
var newurl = document.getElementById("globalUrl").value;
var pmcId = document.getElementById("pmcId").value;

//---------------------------------------update host details--------------------------------------------------------
$('#updateAccountInfo').click(function () {

    if (document.getElementById('firstName').value == "") {
        document.getElementById("firstName1").innerHTML = 'Please enter the First name.';
        document.getElementById("firstName").focus();
        return false;
    } else {
        document.getElementById("firstName1").innerHTML = "";
    }

    if (document.getElementById('lastName').value == "") {
        document.getElementById("lastName1").innerHTML = 'Please enter the Last name.';
        document.getElementById("lastName").focus();
        return false;
    } else {
        document.getElementById("lastName1").innerHTML = "";
    }

    // var userProfile = new Object();//parent
    var user = new Object();//c o
    // userProfile.userProfileId = document.getElementById("userProfileId").value;
    user.about = document.getElementById("descHost").value;
    user.userId = userId;
    user.firstName = document.getElementById("firstName").value;
    user.lastName = document.getElementById("lastName").value;
    user.emailId = document.getElementById("emailId").value;
    user.mobileno1 = document.getElementById("mobileno").value;
    // user.dobDt = document.getElementById("dobDt").value;
    user.dialerCode = document.getElementById("dialerCode").value;
    user.hostWebsite = document.getElementById("weburl").value;
    // userProfile.user = user;
    //console.log(JSON.stringify(user));

    $.ajax({
        type: 'PUT',
        //data: person,
        data: JSON.stringify(user),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'user',
        success: function (result) {
            // console.log(JSON.stringify(result));
            window.location.reload();
        },
        error: function (xhr, textStatus, errorThrown) {

            console.log(xhr);
        },


    });

})



//---------------------------------------------Update About You details---------------------------------------------------
$('#updateDetails').click(function () {
    // var userProfile = new Object();//parent
    var user = new Object();//c o
    // userProfile.userProfileId = document.getElementById("userProfileId").value;
    user.about = document.getElementById("descHost").value;
    user.userId = userId;
    user.firstName = document.getElementById("firstName").value;
    user.lastName = document.getElementById("lastName").value;
    user.emailId = document.getElementById("emailId").value;
    user.mobileno1 = document.getElementById("mobileno").value;
    // user.dobDt = document.getElementById("dobDt").value;
    user.dialerCode = document.getElementById("dialerCode").value;
    user.hostWebsite = document.getElementById("weburl").value;
    user.active = 1;

    // userProfile.user = user;
    //console.log(JSON.stringify(userProfile));

    $.ajax({
        type: 'PUT',
        //data: person,
        data: JSON.stringify(user),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'user',
        success: function (result) {
            //console.log(JSON.stringify(result));
            window.location.reload();
        },
        error: function (xhr, textStatus, errorThrown) {

            console.log(xhr);
        },


    });

});

// function filel(file) {
//     fileattch = file;
//     document.getElementById('image_display').src = window.URL.createObjectURL(file);
//     document.getElementById("Photo_Confirm").show = true;

// }
var data = new FormData();
$('input[type="file"]').change(function (event) {
    var files = event.target.files[0];

    data.append('userId', userId);
    data.append('profileImg', files);
});

//----------------------------------------upload profile image------------------------------------------------------
$('#uploadProfileImg').click(function () {
    var userId = document.getElementById("userId").value;
    $('#spinner').modal();
    var checkfile = data.get("profileImg");

    if (checkfile != null) {
        $.ajax({
            // url: newurl+'v1/user/' + userId +'/profile/image',
            url: newurl + 'user/' + userId + '/pmcId/' + pmcId + '/updateprofile',
            'headers': {
                Authorization: localStorage.getItem('token') || '',
            },
            processData: false,
            contentType: false,
            data: data,
            type: 'PUT'
        }).done(function (result) {
            // console.log("Record Saved");

            //    document.getElementById("msg-body").innerHTML = "Image successfully saved";
            //     $('#dynamic_model').modal('show');
            $('#spinner').modal('hide');

            window.location.reload();

        }).fail(function (a, b, c) {
            console.log(a, b, c);
            document.getElementById("msg-body").innerHTML = "Uploading process failed";
            $('#dynamic_model').modal('show');
            $('#spinner').modal('hide');
        });
    }
    else {
        document.getElementById("msg-body").innerHTML = " You have not selected any Image, please Select Image";
        $('#dynamic_model').modal('show');
        $('#spinner').modal('hide');
    }

});

// function Photo_Upload() {
//     //console.log("a");

//     //filename1.propertyFile = fileattch;
//    // console.log(document.getElementById("userId").value);
//     var userId = document.getElementById("userId").value; 
//    // console.log(userId);
//     filename1.fileDescription = "";
//      var data = new FormData();
//     var file = fileattch;   
//     //data.append('propertyFile', fileattch);
//     data.append('userId', userId);
//     data.append('fileDescription', '');
//     $.ajax({
//         url: 'v1/user/' + userId +'/profile/image',
//         processData: false,
//         contentType: false,
//         data: data,
//         type: 'POST'
//     }).done(function (result) {
//         console.log("Record Saved");
//         location.href = "/dashboard";

//     }).fail(function (a, b, c) {
//         console.log(a, b, c);
//     });

// }

//----------------------------------------Remove Profile Image API Call------------------------------------------------

$('#removeProfileImg').click(function () {
    $.ajax({
        url: newurl + 'user/' + userId + '/deleteprofile',
        type: 'DELETE',
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        data: JSON.stringify(data),
    }).done(function (result) {
        window.location.reload();

    }).fail(function (a, b, c) {
        console.log(a, b, c);
    });
});