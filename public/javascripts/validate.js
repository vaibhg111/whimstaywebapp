
$(function () {
    var baseUrl = document.getElementById('globalUrl').value;
    $('#signup').click(function () {

        var Pagel = document.getElementById("Pagel");
        Pagel.innerHTML = "SignUp";

        /* For First name field validation*/


        var u = document.getElementById("firstName").value;
        if (u == "") {
            document.getElementById("first").innerHTML = 'Please enter your First Name.';
            document.getElementById("firstName").focus();
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
            document.getElementById("mail").innerHTML = 'Please enter your Email.';
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
        var mob = document.getElementById("mobileno").value;
        if (mob == "") {
            document.getElementById("number").innerHTML = 'Please enter your mobile number';
            document.getElementById("mobileno").focus();
            return false;
        }
        else {
            document.getElementById("number").innerHTML = "";
        }
        // var r = 0;
        // for (y = 0; y < mob.length; y++) {
        //     if ((mob.charCodeAt(y) >= 32 && mob.charCodeAt(y) <= 47) || (mob.charCodeAt(y) >= 58 && mob.charCodeAt(y) <= 255) || (mob.charCodeAt(y) >= 338 && mob.charCodeAt(y) <= 402) || (mob.charCodeAt(y) >= 8211 && mob.charCodeAt(y) <= 8482)) {
        //         r++;
        //     }
        // }
        // if (r != 0) {
        //     document.getElementById("number").innerHTML = 'Please enter only numeric values in Mobile Number.';
        //     document.getElementById("mobileno").focus();
        //     return false;
        // }

        // else {
        //     document.getElementById("number").innerHTML = "";
        // }

        if (mob.length > 12 || mob.length < 12) {
            document.getElementById("number").innerHTML = 'Mobile number should be of 10 digits';
            document.getElementById("mobileno").focus();
            return false;
        }




        // Date of Birth Validation
        // var chkdate = document.getElementById("fullDob").value
        // if (document.getElementById("fullDob").value == "") {

        //     document.getElementById("dob").innerHTML = 'Please enter the Date of Birth..!!';
        //     document.getElementById("fullDob").focus();
        //     return false;
        // }
        // else if (!chkdate.match(/^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/g)) {
        //     document.getElementById("dob").innerHTML = 'Please enter the Valid Date of Birth..!!';
        //     document.getElementById("fullDob").focus();
        //     return false;
        // }
        // // Date of Birth 18 years old Validation
        // var x = new Date($("#fullDob").val());
        // var Cnow = new Date();
        // if ($("#fullDob").val() == "") {
        //     $("#fullDob").focus();
        // }
        // else if (Cnow.getFullYear() - x.getFullYear() < 18) {
        //     document.getElementById("dob").innerHTML = 'Sorry you are not eligible for Wemaste because you are not 18 years old';
        //     document.getElementById("fullDob").focus();
        //     return false;
        // }
        // else { }

        var pmsLinked = document.getElementById("pmsType").value;
        if(pmsLinked != "WHIM"){
            var pms_id = document.getElementById("pms_id").value;
            if (pms_id == "") {
                document.getElementById("pms_id1").innerHTML = 'Please enter pms id.';
                document.getElementById("pms_id").focus();
                return false;
            }
            else {
                document.getElementById("pms_id1").innerHTML = "";
            }
        }

        /* For Checkbox field validation*/
        var box = f1.dob.checked;
        if (box == "") {
            document.getElementById("terms1").innerHTML = "You must be over the age of 18, for accessing Whimstay and accept terms and conditions";
            document.getElementById("dob").focus();
            return false;
        } else {
            document.getElementById("terms1").innerHTML = "";
        }

       // var pmsLinked = $('input[name=pms]:checked').val();
        

        $('#OtPmsgVerify').empty();
        $('#mobileVerifySignup').val('');

        var mobileno = document.getElementById("mobileno").value;
        var mobileNum = mobileno.replace( /\D+/g, '');
        var countryCode = document.getElementById("countryCode").value;
        var mobile = countryCode + mobileNum;

        var pmc_Id = document.getElementById("pms_id").value;
        if(pmc_Id == ''){
            pmc_Id = null;
        }

       var checkMessage='';
        $.ajax({
            type: "GET",
            dataType: "json",  
            'headers': {                 
                Authorization: localStorage.getItem('token') || '',             
            },
            url: baseUrl + "user/mobile/" + mobileNum,
            success: function (result) {
                var checkStatus = result.status;
                $.ajax({
                    type: "GET",
                    dataType: "json",  
                    'headers': {                 
                        Authorization: localStorage.getItem('token') || '',             
                    },
                    url: baseUrl + "user/email/" + mailid,
                    success: function (result) {
                        var checkEmail = result.status;
                        console.log(result)
                        if (checkEmail == 400) {
                            checkMessage = result.message;
                        }
                        if (checkStatus == 200 && checkEmail == 200) {
                            // console.log(baseUrl + "user/pmcId/" + pmc_Id)
                            $.ajax({
                                type: "GET",
                                dataType: "json",  
                                'headers': {                 
                                    Authorization: localStorage.getItem('token') || '',             
                                },
                                url: baseUrl + "user/pmcId/" + pmc_Id,
                                success: function (result) {
                                   
                                    $.ajax({
                                        type: "GET",
                                        dataType: "json",  
                                        'headers': {                 
                                            Authorization: localStorage.getItem('token') || '',             
                                        },
                                        url: baseUrl + "user/signup/mobile/" + mobile + "/otp",
                                        success: function (result) {
        
                                            $('#Signup-Verify').modal({ backdrop: 'static', keyboard: false }, 'show');
                                        },
                                        error: function (error) {
                                           //console.log("error");
                                        }
                                    });
        
                                },
                                error: function (error) {
                                    checkMessage = error.responseJSON.message;
                                    document.getElementById("message-body").innerHTML = checkMessage;
                                    $('#gen-popup').modal('show');
                                }
                            });

                        } else {
                           
                           // document.getElementById("message-body").innerHTML = checkMessage;
                        }

                    },
                    error: function (error) {
                       // console.log("error" + error.responseText);
                        checkMessage = error.responseJSON.message;
                        document.getElementById("message-body").innerHTML = checkMessage;
                        $('#gen-popup').modal('show');
                    }
                });


            },
            error: function (error) {
                //console.log(error);
                checkMessage = error.responseJSON.message;
                document.getElementById("message-body").innerHTML = checkMessage;
                $('#gen-popup').modal('show');
            }
        });
      
    });
});


$(function () {

    var baseUrl = document.getElementById('globalUrl').value;
    
    $('#signin').click(function () {

        var Pagel = document.getElementById("Pagel");
        Pagel.innerHTML = "SignIn";
        //using code and api to check present in table or not


        // For mobile number field
        var mob = document.getElementById("mobile").value;
        if (mob == "") {
            document.getElementById("num").innerHTML = 'Please enter your mobile number';
            document.getElementById("mobile").focus();
            return false;
        }
        else {
            document.getElementById("num").innerHTML = "";
        }
        var r = 0;
        for (y = 0; y < mob.length; y++) {
            if ((mob.charCodeAt(y) >= 32 && mob.charCodeAt(y) <= 47) || (mob.charCodeAt(y) >= 58 && mob.charCodeAt(y) <= 255) || (mob.charCodeAt(y) >= 338 && mob.charCodeAt(y) <= 402) || (mob.charCodeAt(y) >= 8211 && mob.charCodeAt(y) <= 8482)) {
                r++;
            }
        }

        if (mob.length > 12 || mob.length < 12) {
            document.getElementById("num").innerHTML = 'Mobile number should be of 10 digits';
            document.getElementById("mobile").focus();
            return false;
        }

        // var newurl = globalUrl;
        var mobile = mob.replace( /\D+/g, '');
        $('#msgVerify').empty();
        $('#mobileVerify').val('');
        
        $.ajax({
            type: 'GET',
            dataType: 'json',
            headers : {
            Authorization: localStorage.getItem('token') || '',
            },
            url: baseUrl + 'user/mobile/' + mobile,
            success: function (result) {
                console.log(result)
                    document.getElementById("message-body").innerHTML = 'Account does not exists with this mobile : '+ mobile +'.<br>Please sign up!';
                    $('#myModal-Verify').modal('hide');
                    $('#gen-popup').modal('show');
                    return false;   
            },
            error: function (error) {
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    headers : {
                        Authorization: localStorage.getItem('token') || '',
                        },
                    //Authorization: localStorage.getItem('token') || '',
                    url: baseUrl + 'user/login/mobile/' + mobile + '/otp',
                    success: function (result) {
                        //console.log("OTP has sent your Mobile Number");
                        $('#myModal-Verify').modal({ backdrop: 'static', keyboard: false }, 'show');
                    },
                    error: function (error) {

                        jsonValue = jQuery.parseJSON(error.responseText);
                        //console.log("error" + error.responseText);
                    }
                });
               // console.log("error" + error.responseText);
            }
        });
    });


    $('#otpVerify').click(function () {
        var otpCodeVerify = document.getElementById("mobileVerify").value;
        if (otpCodeVerify == "") {
            document.getElementById("msgVerify").innerHTML = 'Please enter the Whimstay verification code.';
            document.getElementById("mobileVerify").focus();
            return false;
        }
        else {
            document.getElementById("msgVerify").innerHTML = "";
        }
        

       var mobileno = document.getElementById("mobileNumber").value;
       var otpCode= document.getElementById("mobileVerify").value;

        var otpData={
           'mobileno':mobileno,
           'otpCode':otpCode,
           'userType':1
        }
            console.log(JSON.stringify(otpData));
           $.ajax({
               type: "POST",
               dataType: "json",
               headers: {
                    app: 'host',
                    Authorization: localStorage.getItem('token') || '',
                },
               contentType: "application/json",
               data:JSON.stringify(otpData),
               url: baseUrl + "user/login/mobile/verify",
               success: function (result) {
                  // alert(JSON.stringify(result));
                   //sessionStorage.setItem('otpcode', otpCode);
                    localStorage.setItem('token', result.token);
                    document.getElementById('form_id').submit();
               },
               error: function (error) {
                console.log(error);
                document.getElementById("msgVerify").innerHTML="Incorrect verification code entered.";
               }
           });
        
        
        
        });
       

        $('#SignUpotpVerify').click(function () {

            var otp = document.getElementById("mobileVerifySignup").value;
            if (otp == "") {
                document.getElementById("OtPmsgVerify").innerHTML = 'Please enter the Whimstay verification code.';
                document.getElementById("mobileVerifySignup").focus();
                return false;
            }
            else {
                document.getElementById("OtPmsgVerify").innerHTML = "";
            }

            var mobileno1 = document.getElementById("mobileno12").value;
            var dialerCode = document.getElementById("dialerCode").value;
            var otpCode= document.getElementById("mobileVerifySignup").value;
            var mobileno =  dialerCode + mobileno1
           // console.log(mobileno)
             var otpVerify={
                'mobileno':mobileno,
                'otpCode':otpCode
             }
                 console.log(JSON.stringify(otpVerify));
                $.ajax({
                    type: "POST",
                    dataType: "json",  
                    'headers': {
                        app: 'host',               
                        Authorization: localStorage.getItem('token') || '',             
                    },
                    contentType: "application/json",
                    data:JSON.stringify(otpVerify),
                    url: baseUrl + "user/signup/mobile/verify",
                    success: function (result) {
                        // console.log(result);
                        //sessionStorage.setItem('otpcode', otpCode);
                        document.getElementById('token').value = result.token;
                        localStorage.setItem('token', result.token);
                        document.getElementById('SignUp_id').submit();
                    },
                    error: function (error) {
                        console.log(error);
                     document.getElementById("OtPmsgVerify").innerHTML="Incorrect verification code entered.";
                    }
                });
             
             
             
             });

});



