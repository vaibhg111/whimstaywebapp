var url = document.getElementById('globalUrl').value;
var ipAddress = '';
var timeStamp = '';
$(document).ready(function () {
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        //    alert(e.ip);
        ipAddress = e.ip
        var start = new Date().getTime();
        //    alert(start/1000);
        timeStamp = start / 1000;
    });
})

$('#checkAccType').click(function () {


    var agreement = $('#agreement').is(':checked');

    if (agreement) {

    } else {
        document.getElementById("checkboxval").innerHTML = 'Please approve the terms and conditions.';
        return false;
    }



    $('#myModal-AddAccount').modal('hide');

    if ($('input[name=accType]:checked').val() == 1) {
        $('#myModal-Individual').modal({ backdrop: 'static', keyboard: false }, 'show')
    } else {
        $('#myModal-Biz').modal({ backdrop: 'static', keyboard: false }, 'show')
    }
});


// $('#fillDataIndividual').click(function () {

// });

$('#individualSubmit').click(function () {

    if (document.getElementById('bankNameIndividual').value == "") {
        document.getElementById("bankNameIndividual1").innerHTML = 'Please enter the bank name.';
        document.getElementById("bankNameIndividual").focus();
        return false;
    } else {
        document.getElementById("bankNameIndividual1").innerHTML = "";
    }

    if (document.getElementById('routingIndividual').value == "") {
        document.getElementById("routingIndividual1").innerHTML = 'Please enter the routing number.';
        document.getElementById("routingIndividual").focus();
        return false;
    } else {
        document.getElementById("routingIndividual1").innerHTML = "";
    }
    if (document.getElementById('routingIndividual').value.length != 9) {
        document.getElementById("routingIndividual1").innerHTML = 'Please enter 9 digit routing number.';
        document.getElementById("routingIndividual").focus();
        return false;
    }
    if (document.getElementById('accountIndividual').value == "") {
        document.getElementById("accountIndividual1").innerHTML = 'Please enter account number.';
        document.getElementById("accountIndividual").focus();
        return false;
    } else {
        document.getElementById("accountIndividual1").innerHTML = "";
    }

    if (document.getElementById('accountConfirm').value == '') {
        document.getElementById("accountConfirm1").innerHTML = 'Please enter the confirm account number.';
        document.getElementById("accountConfirm").focus();
        return false;
    } else {
        document.getElementById("accountConfirm1").innerHTML = "";
    }

    if (document.getElementById('accountConfirm').value != document.getElementById('accountIndividual').value) {
        document.getElementById("accountConfirm1").innerHTML = 'Account Number does not match.';
        document.getElementById("accountConfirm").focus();
        return false;
    } else {
        document.getElementById("accountConfirm1").innerHTML = "";
    }

    var accountHolderName = document.getElementById("firstNameIndividual").value + " " + document.getElementById("lastNameIndividual").value;
    var Individual = new Object();
    Individual.firstName = document.getElementById("firstNameIndividual").value;
    Individual.lastName = document.getElementById("lastNameIndividual").value;
    Individual.city = document.getElementById("CityIndividual").value;
    Individual.state = document.getElementById("stateIndividual").value;
    Individual.zipcode = document.getElementById("ZipIndividual").value;
    Individual.ssnNumber = document.getElementById("ssnIndividual").value;

    var birthDateCon = moment(document.getElementById("fullDobIndividual").value).format('YYYY-MM-DD');

    Individual.birthDate = birthDateCon;
    Individual.bankName = document.getElementById("bankNameIndividual").value;
    Individual.routingNumber = document.getElementById("routingIndividual").value;
    Individual.accountNumber = document.getElementById("accountIndividual").value;
    Individual.email = document.getElementById("emailIndividual").value;
    Individual.timeStamp = timeStamp;
    Individual.ipAddress = ipAddress;
    Individual.accountHolderType = "individual";
    Individual.country = "US";
    Individual.type = "custom";
    Individual.currency = "usd";
    Individual.accountHolderName = accountHolderName;
    Individual.pmcId = document.getElementById('pmcId').value;

    if (document.getElementById("Address2Individual").value == "") {

        //var strAddress = document.getElementById("AddressIndividual").value;
        // pos = strAddress.indexOf(' ');
        // var address1 = strAddress.substring(0, pos);
        // var address2 = strAddress.substring(pos+1, strAddress.Length);

        Individual.address = document.getElementById("AddressIndividual").value;
        Individual.addressline1 = "US";
    } else {
        Individual.address = document.getElementById("AddressIndividual").value;
        Individual.addressline1 = document.getElementById("Address2Individual").value;
    }
    // Individual.displayAddress1 = document.getElementById("AddressIndividual").value;
    // Individual.displayAddress2 = document.getElementById("Address2Individual").value;

    // console.log(JSON.stringify(Individual));

    $.ajax({
        type: 'POST',
        data: JSON.stringify(Individual),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        async: false,
        url: url + 'user/payment/account/host',
        success: function (result) {
            // console.log(result);
            document.getElementById("payout-body").innerHTML = "Account Details Added successfully!";
            $('#Payout_Message').modal('show');
            setTimeout(function () {
                $('#Payout_Message').modal('hide');
                window.location.reload();
            }, 3000);

        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            document.getElementById("payout-body").innerHTML = xhr.responseJSON.message;
            $('#Payout_Message').modal('show');

        },


    });

});


// $('#businessValidate').click(function () {


// });

$('#businessAccountComplete').click(function () {

    if (document.getElementById('businessBankName').value == "") {
        document.getElementById("businessBankName1").innerHTML = 'Please enter the bank name.';
        document.getElementById("businessBankName").focus();
        return false;
    } else {
        document.getElementById("businessBankName1").innerHTML = "";
    }

    if (document.getElementById('businessRouting').value == "") {
        document.getElementById("businessRouting1").innerHTML = 'Please enter the routing number.';
        document.getElementById("businessRouting").focus();
        return false;
    } else {
        document.getElementById("businessRouting1").innerHTML = "";
    }
    if (document.getElementById('businessRouting').value.length != 9) {
        document.getElementById("businessRouting1").innerHTML = 'Please enter 9 digit routing number.';
        document.getElementById("businessRouting").focus();
        return false;
    }

    if (document.getElementById('businessAccount').value == "") {
        document.getElementById("businessAccount1").innerHTML = 'Please enter account number.';
        document.getElementById("businessAccount").focus();
        return false;
    } else {
        document.getElementById("businessAccount1").innerHTML = "";
    }

    if (document.getElementById('businessAccountConfirm').value == '') {
        document.getElementById("businessAccountConfirm1").innerHTML = 'Please enter the confirm account number.';
        document.getElementById("businessAccountConfirm").focus();
        return false;
    } else {
        document.getElementById("businessAccountConfirm1").innerHTML = "";
    }

    if (document.getElementById('businessAccountConfirm').value != document.getElementById('businessAccount').value) {
        document.getElementById("businessAccountConfirm1").innerHTML = 'Account Number does not match.';
        document.getElementById("businessAccountConfirm").focus();
        return false;
    } else {
        document.getElementById("businessAccountConfirm1").innerHTML = "";
    }

    var accountHolderFullName = document.getElementById("Businessfirst").value + " " + document.getElementById("Businesslast").value;
    var Business = new Object();
    Business.companyName = document.getElementById("BusinessName").value;
    Business.taxId = document.getElementById("BusinessID").value;
    Business.firstName = document.getElementById("Businessfirst").value;
    Business.lastName = document.getElementById("Businesslast").value;
    // Business.address = document.getElementById("BusinessAddress").value;
    // Business.addressline1 = document.getElementById("BusinessAddress2").value;
    Business.city = document.getElementById("BusinessCity").value;
    Business.state = document.getElementById("BusinessState").value;
    Business.zipcode = document.getElementById("BusinessZip").value;
    Business.ssnNumber = document.getElementById("BusinessSsn").value;
    var birthDateCon1 = moment(document.getElementById("BusinessDob").value).format('YYYY-MM-DD');
    Business.birthDate = birthDateCon1;
    Business.bankName = document.getElementById("businessBankName").value;
    Business.routingNumber = document.getElementById("businessRouting").value;
    Business.accountNumber = document.getElementById("businessAccount").value;
    Business.email = document.getElementById("BusinessEmail").value;
    Business.timeStamp = timeStamp;
    Business.ipAddress = ipAddress;
    Business.accountHolderType = "company";
    Business.country = "US";
    Business.type = "custom";
    Business.currency = "usd";
    Business.accountHolderName = accountHolderFullName;
    Business.ownerFirstName = document.getElementById("Businessfirst").value;
    Business.ownerLastName = document.getElementById("Businesslast").value;
    Business.pmcId = document.getElementById('pmcId').value;

    if (document.getElementById("BusinessAddress2").value == "") {

        //var strAddress = document.getElementById("AddressIndividual").value;
        // pos = strAddress.indexOf(' ');
        // var address1 = strAddress.substring(0, pos);
        // var address2 = strAddress.substring(pos+1, strAddress.Length);

        Business.address = document.getElementById("BusinessAddress").value;
        Business.addressline1 = "US";
    } else {
        Business.address = document.getElementById("BusinessAddress").value;
        Business.addressline1 = document.getElementById("BusinessAddress2").value;
    }
    //console.log(JSON.stringify(Business));
    $.ajax({
        type: 'POST',
        data: JSON.stringify(Business),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        async: false,
        url: url + 'user/payment/account/host',
        success: function (result) {
            document.getElementById("payout-body").innerHTML = "Account Details Added successfully";
            $('#Payout_Message').modal('show',
            );
            // console.log(result);
            setTimeout(function () {
                $('#Payout_Message').modal('hide');
                window.location.reload();
            }, 3000);

        },
        error: function (xhr, textStatus, errorThrown) {

            document.getElementById("payout-body").innerHTML = xhr.responseJSON.message;
            $('#Payout_Message').modal('show');

        },


    });

});

$('#updateAddress').click(function () {

    if (document.getElementById('displayFirstName').value == "") {
        document.getElementById("displayfirst").innerHTML = 'Please enter the First name.';
        document.getElementById("displayFirstName").focus();
        return false;
    } else {
        document.getElementById("displayfirst").innerHTML = "";
    }

    if (document.getElementById('displayLastName').value == "") {
        document.getElementById("displaylast").innerHTML = 'Please enter the Last name.';
        document.getElementById("displayLastName").focus();
        return false;
    } else {
        document.getElementById("displaylast").innerHTML = "";
    }
    var email = document.getElementById("displayEmail").value;
    if (email == "") {
        document.getElementById("displayEmail1").innerHTML = 'Please enter your Email.';
        document.getElementById("displayEmail").focus();
        return false;
    }
    else {
        document.getElementById("displayEmail1").innerHTML = "";
    }

    var v = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (v.test(displayEmail.value) == false) {
        document.getElementById("displayEmail1").innerHTML = 'Invalid Email Address.';
        emailIndividual.focus();
        return false;
    } else {
        document.getElementById("displayEmail1").innerHTML = "";
    }

    if (document.getElementById('displayAddress').value == "") {
        document.getElementById("displayAddress1").innerHTML = 'Please enter the Address.';
        document.getElementById("displayAddress").focus();
        return false;
    } else {
        document.getElementById("displayAddress1").innerHTML = "";
    }

    if (document.getElementById('displayAddress2').value == "") {
        document.getElementById("displayAddress3").innerHTML = 'Please enter the Address.';
        document.getElementById("displayAddress2").focus();
        return false;
    } else {
        document.getElementById("displayAddress3").innerHTML = "";
    }


    if (document.getElementById('displayCity').value == "") {
        document.getElementById("displayCity1").innerHTML = 'Please enter the city.';
        document.getElementById("displayCity").focus();
        return false;
    } else {
        document.getElementById("displayCity1").innerHTML = "";
    }

    if (document.getElementById('displaystate').value == "") {
        document.getElementById("displaystate1").innerHTML = 'Please select the state.';
        document.getElementById("displaystate").focus();
        return false;
    } else {
        document.getElementById("displaystate1").innerHTML = "";
    }

    if (document.getElementById('displayZip').value == "") {
        document.getElementById("displayZip1").innerHTML = 'Please select the zip code.';
        document.getElementById("displayZip").focus();
        return false;
    } else {
        document.getElementById("displayZip1").innerHTML = "";
    }

    if (document.getElementById('fullDob').value == "") {
        document.getElementById("fullDob1").innerHTML = 'Please enter the date of birth.';
        document.getElementById("fullDob").focus();
        return false;
    } else {
        document.getElementById("fullDob1").innerHTML = "";
    }


    var UpdateAddressDetails = new Object();
    UpdateAddressDetails.firstName = document.getElementById("displayFirstName").value;
    UpdateAddressDetails.lastName = document.getElementById("displayLastName").value;
    UpdateAddressDetails.accountHolderName = UpdateAddressDetails.firstName + ' ' + UpdateAddressDetails.lastName;
    UpdateAddressDetails.email = document.getElementById("displayEmail").value;
    UpdateAddressDetails.address = document.getElementById("displayAddress").value;
    UpdateAddressDetails.addressline1 = document.getElementById("displayAddress2").value;
    UpdateAddressDetails.city = document.getElementById("displayCity").value;
    UpdateAddressDetails.state = document.getElementById("displaystate").value;
    UpdateAddressDetails.zipcode = document.getElementById("displayZip").value;

    var birthDateFullDob = moment(document.getElementById("fullDob").value).format('YYYY-MM-DD');

    UpdateAddressDetails.birthDate = birthDateFullDob;
    UpdateAddressDetails.country = document.getElementById("displayCountry").value;
    UpdateAddressDetails.currency = document.getElementById("displayCurrency").value;
    UpdateAddressDetails.type = 'custom';
    UpdateAddressDetails.accountHolderType = document.getElementById("accountHolderType").value;
    UpdateAddressDetails.routingNumber = document.getElementById("displayRoutingNumber").value;
    // UpdateAddressDetails.companyName = document.getElementById("BusinessName").value;
    UpdateAddressDetails.ownerFirstName = UpdateAddressDetails.firstName
    UpdateAddressDetails.ownerLastName = UpdateAddressDetails.lastName
    UpdateAddressDetails.timeStamp = timeStamp;
    UpdateAddressDetails.ipAddress = ipAddress;
    UpdateAddressDetails.pmcId = document.getElementById('pmcId').value;

    console.log(JSON.stringify(UpdateAddressDetails))
    $.ajax({
        type: 'PUT',
        data: JSON.stringify(UpdateAddressDetails),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: url + 'user/payment/account/host',
        async: false,
        success: function (result) {
            console.log(result);
            if (result.message != undefined) {
                document.getElementById("payout-body").innerHTML = JSON.stringify(result.message);
                $('#Payout_Message').modal('show');

                setTimeout(function () {
                    $('#Payout_Message').modal('hide');
                    window.location.reload();
                }, 3000);
            } else {
                document.getElementById("payout-body").innerHTML = "Address updated successfully";
                $('#Payout_Message').modal('show');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr)
            document.getElementById("payout-body").innerHTML = xhr.responseJSON.message;
            $('#Payout_Message').modal('show');

        },


    });

});


$('#payout_Indi').click(function () {
    if (document.getElementById('firstNameIndividual').value == "") {
        document.getElementById("firstNameIndividual1").innerHTML = 'Please enter the First name.';
        document.getElementById("firstNameIndividual").focus();
        return false;
    } else {
        document.getElementById("firstNameIndividual").innerHTML = "";
    }

    if (document.getElementById('lastNameIndividual').value == "") {
        document.getElementById("lastNameIndividual1").innerHTML = 'Please enter the Last name.';
        document.getElementById("lastNameIndividual").focus();
        return false;
    } else {
        document.getElementById("lastNameIndividual1").innerHTML = "";
    }

    var mailid = document.getElementById("emailIndividual").value;
    if (mailid == "") {
        document.getElementById("emailIndividual1").innerHTML = 'Please enter your Email.';
        document.getElementById("emailIndividual").focus();
        return false;
    }
    else {
        document.getElementById("emailIndividual1").innerHTML = "";
    }

    var v = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (v.test(emailIndividual.value) == false) {
        document.getElementById("emailIndividual1").innerHTML = 'Invalid Email Address.';
        emailIndividual.focus();
        return false;
    } else {
        document.getElementById("emailIndividual1").innerHTML = "";
    }

    if (document.getElementById('AddressIndividual').value == "") {
        document.getElementById("AddressIndividual1").innerHTML = 'Please enter the address.';
        document.getElementById("AddressIndividual").focus();
        return false;
    } else {
        document.getElementById("AddressIndividual1").innerHTML = "";
    }

    // if (document.getElementById('Address2Individual').value == "") {
    //     document.getElementById("Address2Individual1").innerHTML = 'Please enter the address.';
    //     document.getElementById("Address2Individual").focus();
    //     return false;
    // } else {
    //     document.getElementById("Address2Individual1").innerHTML = "";
    // }

    if (document.getElementById('CityIndividual').value == "") {
        document.getElementById("CityIndividual1").innerHTML = 'Please enter the city.';
        document.getElementById("CityIndividual").focus();
        return false;
    } else {
        document.getElementById("CityIndividual1").innerHTML = "";
    }

    if (document.getElementById('stateIndividual').value == "") {
        document.getElementById("stateIndividual1").innerHTML = 'Please select the state.';
        document.getElementById("stateIndividual").focus();
        return false;
    } else {
        document.getElementById("stateIndividual1").innerHTML = "";
    }

    if (document.getElementById('ZipIndividual').value == "") {
        document.getElementById("ZipIndividual1").innerHTML = 'Please enter the zip code.';
        document.getElementById("ZipIndividual").focus();
        return false;
    } else {
        document.getElementById("ZipIndividual1").innerHTML = "";
    }

    if (document.getElementById('ssnIndividual').value == "") {
        document.getElementById("ssnIndividual1").innerHTML = 'Please enter the SSN number.';
        document.getElementById("ssnIndividual").focus();
        return false;
    } else {
        document.getElementById("ssnIndividual1").innerHTML = "";
    }

    if (document.getElementById('fullDobIndividual').value == "") {
        document.getElementById("fullDobIndividual1").innerHTML = 'Please enter date of birth.';
        document.getElementById("fullDobIndividual").focus();
        return false;
    } else {
        document.getElementById("fullDobIndividual1").innerHTML = "";
    }



    if ($('input[name=accType]:checked').val() == 1) {
        $('#myModal-Individual').modal('hide');

        //    alert("open Popup");
        // $('#myModal-info_indi').modal('show');
        // $('#myModal-Individual').modal('show');
        // $("#myModal-info_indi").modal({ backdrop: 'static', keyboard: false }, 'show');
        // $("#myModal-info_indi").modal("show");
        $('#myModal-info_indi').appendTo("body").modal('show');

        $('#myModal-info_indi').modal('show');
        $('#myModal-info_indi').on('shown.bs.modal', function (e) {
            // $('.myModal-info_indi').css('z-index', 1500);
            $(".myModal-info_indi").css('display', 'block');
        });


        // $('#myModal-Individual').modal('show');
        // var accountHolderName = document.getElementById("firstNameIndividual").value + " " + document.getElementById("lastNameIndividual").value;
        // var Individual = new Object();
        var firstName = document.getElementById("firstNameIndividual").value;
        // alert(firstName);
        var lastName = document.getElementById("lastNameIndividual").value;
        var address = document.getElementById("AddressIndividual").value;
        var addressline1 = document.getElementById("Address2Individual").value;
        var city = document.getElementById("CityIndividual").value;
        var state = document.getElementById("stateIndividual").value;
        var zipcode = document.getElementById("ZipIndividual").value;
        var ssnNumber = document.getElementById("ssnIndividual").value;
        var birthDate = document.getElementById("fullDobIndividual").value;
        var email = document.getElementById("emailIndividual").value;

        $('#payout-Address2Individual').empty();
        $('#payout-Address3Individual').empty();
        document.getElementById("payout-email").innerHTML = email;
        document.getElementById("payout-firstNameIndividual").innerHTML = firstName;
        document.getElementById("payout-lastNameIndividual").innerHTML = lastName;
        document.getElementById("payout-AddressIndividual").innerHTML = address;
        if (addressline1 == '') {
            document.getElementById("payout-Address2Individual").innerHTML = '';
        } else {
            document.getElementById("payout-Address2Individual").innerHTML = '<tr><td><label> Address 2 </label></td>'
            document.getElementById("payout-Address3Individual").innerHTML = '<td>' + addressline1 + '</td></tr>'
        }
        //document.getElementById("payout-Address2Individual").innerHTML = addressline1;
        document.getElementById("payout-CityIndividual").innerHTML = city;
        document.getElementById("payout-stateIndividual").innerHTML = state;
        document.getElementById("payout-ZipIndividual").innerHTML = zipcode;
        document.getElementById("payout-ssnIndividual").innerHTML = '****';
        document.getElementById("payout-fullDobIndividual").innerHTML = birthDate;
        // document.getElementById("payout-bankNameIndividual").innerHTML = bankName;
        // document.getElementById("payout-routingIndividual").innerHTML = routingNumber;
        // document.getElementById("payout-accountIndividual").innerHTML = accountNumber;

    } else {

        $('#myModal-info_biz').modal({ backdrop: 'static', keyboard: false }, 'show');



    }
});

$('#payout_info').click(function () {
    
    if (document.getElementById('BusinessName').value == "") {
        document.getElementById("BusinessName1").innerHTML = 'Please enter the business name.';
        document.getElementById("BusinessName").focus();
        return false;
    } else {
        document.getElementById("BusinessName1").innerHTML = "";
    }

    if (document.getElementById('BusinessID').value == "") {
        document.getElementById("BusinessID1").innerHTML = 'Please enter the business Tax ID.';
        document.getElementById("BusinessID").focus();
        return false;
    } else {
        document.getElementById("BusinessID1").innerHTML = "";
    }

    if (document.getElementById('BusinessAddress').value == "") {
        document.getElementById("BusinessAddress1").innerHTML = 'Please enter the business Address.';
        document.getElementById("BusinessAddress").focus();
        return false;
    } else {
        document.getElementById("BusinessAddress1").innerHTML = "";
    }

    // if (document.getElementById('BusinessAddress2').value == "") {
    //     document.getElementById("BusinessAddress3").innerHTML = 'Please enter the business Address.';
    //     document.getElementById("BusinessAddress2").focus();
    //     return false;
    // } else {
    //     document.getElementById("BusinessAddress3").innerHTML = "";
    // }

    if (document.getElementById('BusinessCity').value == "") {
        document.getElementById("BusinessCity1").innerHTML = 'Please enter the city.';
        document.getElementById("BusinessCity").focus();
        return false;
    } else {
        document.getElementById("BusinessCity1").innerHTML = "";
    }

    if (document.getElementById('BusinessState').value == "") {
        document.getElementById("BusinessState1").innerHTML = 'Please select the state.';
        document.getElementById("BusinessState").focus();
        return false;
    } else {
        document.getElementById("BusinessState1").innerHTML = "";
    }

    if (document.getElementById('BusinessZip').value == "") {
        document.getElementById("BusinessZip1").innerHTML = 'Please select the zip code.';
        document.getElementById("BusinessZip").focus();
        return false;
    } else {
        document.getElementById("BusinessZip1").innerHTML = "";
    }

    if (document.getElementById('Businessfirst').value == "") {
        document.getElementById("Businessfirst1").innerHTML = 'Please enter the First name.';
        document.getElementById("Businessfirst").focus();
        return false;
    } else {
        document.getElementById("Businessfirst1").innerHTML = "";
    }

    if (document.getElementById('Businesslast').value == "") {
        document.getElementById("Businesslast1").innerHTML = 'Please enter the Last name.';
        document.getElementById("Businesslast").focus();
        return false;
    } else {
        document.getElementById("Businesslast1").innerHTML = "";
    }

    var mail = document.getElementById("BusinessEmail").value;
    if (mail == "") {
        document.getElementById("BusinessEmail1").innerHTML = 'Please enter your Email.';
        document.getElementById("BusinessEmail").focus();
        return false;
    }
    else {
        document.getElementById("BusinessEmail1").innerHTML = "";
    }

    var v = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (v.test(BusinessEmail.value) == false) {
        document.getElementById("BusinessEmail1").innerHTML = 'Invalid Email Address.';
        BusinessEmail.focus();
        return false;
    } else {
        document.getElementById("BusinessEmail1").innerHTML = "";
    }

    if (document.getElementById('BusinessSsn').value == "") {
        document.getElementById("BusinessSsn1").innerHTML = 'Please enter the SSN.';
        document.getElementById("BusinessSsn").focus();
        return false;
    } else {
        document.getElementById("BusinessSsn1").innerHTML = "";
    }

    if (document.getElementById('BusinessDob').value == "") {
        document.getElementById("BusinessDob1").innerHTML = 'Please enter the date of birth.';
        document.getElementById("BusinessDob").focus();
        return false;
    } else {
        document.getElementById("BusinessDob1").innerHTML = "";
    }

    if ($('input[name=accType]:checked').val() == 1) {
        $('#myModal-info_indi').modal({ backdrop: 'static', keyboard: false }, 'show')
    } else {
        $('#payout-BusinessAddress2').empty();
        $('#payout-BusinessAddress3').empty();
        // $('#myModal-info_biz').modal({backdrop: 'static', keyboard: false}, 'show');
        var companyName = document.getElementById("BusinessName").value;
        var taxId = document.getElementById("BusinessID").value;
        var firstName = document.getElementById("Businessfirst").value;
        var lastName = document.getElementById("Businesslast").value;
        var address = document.getElementById("BusinessAddress").value;
        var addressline1 = document.getElementById("BusinessAddress2").value;
        var city = document.getElementById("BusinessCity").value;
        var state = document.getElementById("BusinessState").value;
        var zipcode = document.getElementById("BusinessZip").value;
        var ssnNumber = document.getElementById("BusinessSsn").value;
        var birthDate = document.getElementById("BusinessDob").value;
        var email = document.getElementById("BusinessEmail").value;


        document.getElementById("payout-BusinessName").innerHTML = companyName;
        document.getElementById("payout-BusinessID").innerHTML = taxId;
        document.getElementById("payout-Businessfirst").innerHTML = firstName;
        document.getElementById("payout-Businesslast").innerHTML = lastName;
        document.getElementById("payout-BusinessAddress").innerHTML = address;
        // document.getElementById("payout-BusinessAddress2").innerHTML = addressline1;
        document.getElementById("payout-BusinessCity").innerHTML = city;
        document.getElementById("payout-BusinessState").innerHTML = state;
        document.getElementById("payout-BusinessZip").innerHTML = zipcode;
        document.getElementById("payout-BusinessSsn").innerHTML = '****';
        document.getElementById("payout-BusinessDob").innerHTML = birthDate;
        document.getElementById("payout-BusinessEmail").innerHTML = email;
        if (addressline1 == '') {
            document.getElementById("payout-BusinessAddress2").innerHTML = '';
        } else {
            document.getElementById("payout-BusinessAddress2").innerHTML = '<tr><td><label> Address 2 </label></td>'
            document.getElementById("payout-BusinessAddress3").innerHTML = '<td>' + addressline1 + '</td></tr>'
        }

        $('#myModal-Biz').modal('hide');

        $('#myModal-info_biz').modal({ backdrop: 'static', keyboard: false }, 'show');


    }
});

