var url= document.getElementById('globalUrl').value;

$('#emailSupport').click(function () {  

        /* For First name field validation*/
        var u = document.getElementById("fName").value;
        if (u == "") {
            document.getElementById("first").innerHTML = 'Please enter your First Name.';
            document.getElementById("fName").focus();
            return false;
        }
        else {
            document.getElementById("first").innerHTML = "";
        }

        /* For Last name field validation*/
        var u = document.getElementById("lastName").value;
        if (u == "") {
            document.getElementById("last").innerHTML = 'Please enter your Last Name.';
            document.getElementById("lastName").focus();
            return false;
        }
        else {
            document.getElementById("last").innerHTML = "";
        }



        /* For Email Id field validation*/
        var mailid = document.getElementById("email").value;
        if (mailid == "") {
            document.getElementById("mail").innerHTML = 'Please enter your email Id.';
            document.getElementById("email").focus();
            return false;
        }
        else {
            document.getElementById("mail").innerHTML = "";
        }

        var v = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (v.test(email.value) == false) {
            document.getElementById("mail").innerHTML = 'Invalid Email Address.';
            email.focus();
            return false;
        } else {
            document.getElementById("mail").innerHTML = "";
        }


        // For mobile number field
        var mob = document.getElementById("mobileNo").value;
        if (mob == "") {
            document.getElementById("number").innerHTML = 'Please enter your mobile number';
            document.getElementById("mobileNo").focus();
            return false;
        }
        else {
            document.getElementById("number").innerHTML = "";
        }
        var r = 0;
        for (y = 0; y < mob.length; y++) {
            if ((mob.charCodeAt(y) >= 32 && mob.charCodeAt(y) <= 47) || (mob.charCodeAt(y) >= 58 && mob.charCodeAt(y) <= 255) || (mob.charCodeAt(y) >= 338 && mob.charCodeAt(y) <= 402) || (mob.charCodeAt(y) >= 8211 && mob.charCodeAt(y) <= 8482)) {
                r++;
            }
        }
        if (r != 0) {
            document.getElementById("number").innerHTML = 'Please enter only numeric values in Mobile Number.';
            document.getElementById("mobileNo").focus();
            return false;
        }

        else {
            document.getElementById("number").innerHTML = "";
        }

        if (mob.length > 10 || mob.length < 10) {
            document.getElementById("number").innerHTML = 'Mobile number should be of 10 digits';
            document.getElementById("mobileNo").focus();
            return false;
        }

        /* For Any Comments field validation*/
        var u = document.getElementById("FullBody").value;
        if (u == "") {
            document.getElementById("bodyValidate").innerHTML = 'Please enter Any Comments or Questions.';
            document.getElementById("FullBody").focus();
            return false;
        }
        else {
            document.getElementById("bodyValidate").innerHTML = "";
        }




    var userId = document.getElementById("userId").value; 
    
    var hostSupport = new Object();
    hostSupport.replyTo = document.getElementById("email").value;  
    hostSupport.body = document.getElementById("FullBody").value;  
    hostSupport.subject = "Need Customer Support"; 
    hostSupport.typeId = 1;
    hostSupport.commReference="Host Support";
    hostSupport.commWay= "e"; 
    hostSupport.firstName = document.getElementById("fName").value;  
    hostSupport.lastName = document.getElementById("lastName").value; 
    hostSupport.mobileNo = document.getElementById("mobileNo").value; 
    hostSupport.company = document.getElementById("company").value; 

    console.log(JSON.stringify(hostSupport));
    $.ajax({
        type: 'POST',
        //data: person,
        data: JSON.stringify(hostSupport),
        contentType: "application/json",
        dataType: "json",             
        'headers': {                 
            Authorization: localStorage.getItem('token') || '',             
        },
        url: url+'user/'+userId+'/email/support',
        success: function (result) {
           
           document.getElementById("msg-body").innerHTML = " Mail Sent Successfully!";
             $('#dynamic_model').modal('show');
             document.getElementById('company').value = '';
             document.getElementById('FullBody').value = '';
            
        },
        error: function (xhr, textStatus, errorThrown) {
         
            console.log("Mail not sent");
         
        },
    
    
    });
    });