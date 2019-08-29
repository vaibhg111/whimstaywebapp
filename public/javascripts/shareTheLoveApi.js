var url = document.getElementById('globalUrl').value;



$('#shareMail').click(function () {

    var msg = 'Just wanted to share the love. Thought you might be interested. <br/><br/>' +
        'Whimstay is a new vacation rental app that will sell your unsold properties 10 days out as last-minute deals to respectful adventurers.<br/><br/> ' +
        document.getElementById('hostUrl').value +
        '<br/><br/>' +
        'Cheers,<br/><br/>'
        + document.getElementById("firstName").value
    document.getElementById("shareMessage").innerHTML = msg;
})

$('#emailSent').click(function () {

    /* For Email Id field validation*/
    var mailid = document.getElementById("shareTo").value;
    if (mailid == "") {
        document.getElementById("mail1").innerHTML = 'Please enter the email.';
        document.getElementById("shareTo").focus();
        return false;
    }
    else {
        document.getElementById("mail1").innerHTML = "";
    }
    var emails = mailid.replace(/\s/g, '').split(",");
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    for (var i = 0; i < emails.length; i++) {
        if (emails[i] == "" || !regex.test(emails[i])) {
            document.getElementById("mail1").innerHTML = 'Please enter the valid email.';
            document.getElementById("shareTo").focus();
            return false;
        }
        else {
            document.getElementById("mail1").innerHTML = "";
        }
    }

    /* For Subject field validation*/
    var u = document.getElementById("shareSubject").value;
    if (u == "") {
        document.getElementById("subject").innerHTML = 'Please enter the Subject Here.';
        document.getElementById("shareSubject").focus();
        return false;
    }
    else {
        document.getElementById("subject").innerHTML = "";
    }

    /* For message field validation*/
    var v = document.getElementById("shareMessage").innerHTML;

    if (v == "" || v == undefined) {

        document.getElementById("message-body").innerHTML = "please enter the Message.";

        return false;
    }


    var userId = document.getElementById("userId").value;
    var str = document.getElementById("shareTo").value;
    var words = str.split(',');

    var emailDetails = new Object();
    emailDetails.tos = words;
    emailDetails.body = document.getElementById("shareMessage").innerHTML;
    emailDetails.subject = document.getElementById("shareSubject").value;
    emailDetails.typeId = 1;
    emailDetails.commReference = "Share the Love";
    emailDetails.commWay = "e";

    //    console.log(JSON.stringify(emailDetails));
    $.ajax({
        type: 'POST',
        //data: person,
        data: JSON.stringify(emailDetails),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: url + 'user/' + userId + '/email/share_love',
        success: function (result) {
            // alert(JSON.stringify(result.status);
            document.getElementById("shareTo").value = '';
            document.getElementById("message-body").innerHTML = "Mail Sent Successfully!";
            $('#Share_model').modal('show');

            // setTimeout(function() { $("#success-alert").hide(); }, 5000);
        },
        error: function (xhr, textStatus, errorThrown) {
            document.getElementById("message-body").innerHTML = "Mail Not Sent!";

        },


    });

});