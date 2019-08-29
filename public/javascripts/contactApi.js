//-----------------------------------Global Variable-------------------------------------------------------------
var newurl = document.getElementById("globalUrl").value;
var pmcId = document.getElementById("pmcId").value;
var userId = document.getElementById("userId").value;
var ContactTemplateId = "";
var ContactName = "";
var emailId = "";
var mobileNo = "";
var active = "";
var contactId = [];

//----------------------------------------click on Create New button-------------------------------------------------------
$('#createContactTemp').click(function () {
    $('#contactName').val('');
    $('#email').val('');
    $('#mobNo').val('');
    $('#contactText').empty();
    $('#contactText').append('<h6 class="modal-title">Create a New Contact Template</h6>')
    $('#editContact').empty();
    $('#addContactTemplate').empty();
    $('#addContactTemplate').append('<button type="submit" data-backdrop="static" data-keyboard="false" id="addContactTemplate" class="btn btn-blue btn-rounded btn-large width-100" data-toggle="modal" data-target="#myModal-ContactNext" data-dismiss="modal">Next</button>');
});

//------------------------------------click on Next in add flow----------------------------------------------------------
$('#addContactTemplate').click(function () {

    var contactName = document.getElementById("contactName").value;
    if (contactName == "") {
        document.getElementById("contactName1").innerHTML = 'Please enter Contact Name.';
        document.getElementById("contactName").focus();
        return false;
    }
    else {
        document.getElementById("contactName1").innerHTML = "";
    }

    var mailId = document.getElementById("email").value;
    if (mailId == "") {
        document.getElementById("emailId1").innerHTML = 'Please enter the Email.';
        document.getElementById("email").focus();
        return false;
    }
    else {
        document.getElementById("emailId1").innerHTML = "";
    }

    var v = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (v.test(email.value) == false) {
        document.getElementById("emailId1").innerHTML = 'Invalid Email Address.';
        email.focus();
        return false;
    } else {
        document.getElementById("emailId1").innerHTML = "";
    }


    var mobNo = document.getElementById("mobNo").value;
    if (mobNo == "") {
        document.getElementById("mobNo1").innerHTML = 'Please enter the Mobile Number.';
        document.getElementById("mobNo").focus();
        return false;
    }
    else {
        document.getElementById("mobNo1").innerHTML = "";
    }
    if (mobNo.length > 12 || mobNo.length < 12) {
        document.getElementById("mobNo1").innerHTML = 'Mobile number should be of 10 digits';
        document.getElementById("mobNo").focus();
        return false;
    }


    var mobile = mobNo.replace(/\D+/g, '');
    var template = new Object();
    template.contactTemplateName = contactName;
    template.emailId = mailId;
    template.contactNo = mobile;
    template.active = true;
    template.pmcId = pmcId;

    //------------------------------------------Save API call to add the Contact Details-----------------------------------------------------------
    $.ajax({
        type: 'POST',
        //data: person,
        data: JSON.stringify(template),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/contactTemplate',
        success: function (result) {
            console.log(JSON.stringify(result));
            ContactTemplateId = result.contactTemplateId;
            mobileNo = result.contactNo;
            emailId = result.emailId;
            var rows_selected = [];
            $('#contactAddLabel').append('Apply ' + result.contactTemplateName + ' template to Properties');

            //-------------------------------------------------display properties in add flow--------------------------------------
            $.ajax({
                url: newurl + 'property/contact/apply/pmcId/' + pmcId + '/contactTemplateId/' + ContactTemplateId,
                type: 'GET',
                dataType: "json",
                'headers': {
                    Authorization: localStorage.getItem('token') || '',
                },
                success: function (result, textStatus, xhr) {
                    //  console.log(JSON.stringify(result));
                    if((JSON.stringify(result)) == "[]"){
                        $("#ApplyContact").hide();
                       // document.getElementById("ApplyContact").disabled = true;
                    }
                    $.each(result, function (i, item) {


                        if (item.propertyName == undefined || item.propertyName == "" || item.propertyName == null) {
                            item.propertyName = "Untitled Property";
                        } else {
                            item.propertyName = item.propertyName;
                        }

                        if (item.contactTemplateId == "0") {
                            $('<tr>').html('<td class="text-center"><input class=chk type="checkbox" id="' + item.pmsUnitId + '" name="propertySelect"></td><td>' + item.propertyName + "</td><td>" + item.address + "</td>").appendTo('#contact_table');
                        }

                    });

                    $("#contact_table").dataTable().fnDestroy();
                    $('#contact_table').DataTable({
                        "language": {
                            "info": "Showing _END_ of _TOTAL_ Properties",
                            "infoFiltered": ""
                        },
                        "bLengthChange": false,
                        "bSort": false,
                        'order': [0, 'asc'],
                        'rowCallback': function (row, data, dataIndex) {
                            // var rowId = data;
                            var oTable = $('#contact_table').dataTable();
                            var rowcollection = oTable.$(".chk", { "page": "current" });
                            if (rowcollection.filter(':checked').length == rowcollection.length) {
                                $('#checkAllContact').prop('checked', true);
                            } else {
                                $('#checkAllContact').prop('checked', false);
                            }
                        }
                    });


                    // Updates "Select all" control in a data table
                    function updateDataTableSelectAllCtrl(table) {
                        var $table = $('#contact_table').dataTable();
                        var $chkbox_all = $('tbody input[type="checkbox"]', $table);
                        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
                        var chkbox_select_all = $('thead input[name="select_allContact"]', $table).get(0);

                        // If none of the checkboxes are checked
                        if ($chkbox_checked.length === 0) {
                            chkbox_select_all.checked = false;
                            if ('indeterminate' in chkbox_select_all) {
                                chkbox_select_all.indeterminate = false;
                            }

                            // If all of the checkboxes are checked
                        } else if ($chkbox_checked.length === $chkbox_all.length) {
                            chkbox_select_all.checked = true;
                            if ('indeterminate' in chkbox_select_all) {
                                chkbox_select_all.indeterminate = false;
                            }

                            // If some of the checkboxes are checked
                        } else {
                            chkbox_select_all.checked = true;
                            if ('indeterminate' in chkbox_select_all) {
                                chkbox_select_all.indeterminate = true;
                            }
                        }
                    }
                    // Handle click on checkbox
                    $('#contact_table tbody').on('click', 'input[type="checkbox"]', function (e) {
                        var $row = $(this).closest('tr');

                        // Get row data
                        var data = $('#contact_table').dataTable();

                        // Get row ID
                        var rowId = data[0];

                        // Determine whether row ID is in the list of selected row IDs 
                        var index = $.inArray(rowId, rows_selected);

                        // If checkbox is checked and row ID is not in list of selected row IDs
                        if (this.checked && index === -1) {
                            rows_selected.push(rowId);

                            // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
                        } else if (!this.checked && index !== -1) {
                            rows_selected.splice(index, 1);
                        }

                        if (this.checked) {
                            $row.addClass('selected');
                        } else {
                            $row.removeClass('selected');
                        }

                        // Update state of "Select all" control
                        updateDataTableSelectAllCtrl(data);

                        // Prevent click event from propagating to parent
                        e.stopPropagation();
                    });

                    // Handle click on table cells with checkboxes
                    $('#contact_table').on('click', 'tbody td, thead th:first-child', function (e) {

                        $(this).parent().find('input[type="checkbox"]').trigger('click');
                    });

                    // Handle click on "Select all" control
                    $('thead input[name="select_allContact"]').on('click', function (e) {
                        if (this.checked) {
                            $('#contact_table tbody input[type="checkbox"]:not(:checked)').trigger('click');
                        } else {
                            $('#contact_table tbody input[type="checkbox"]:checked').trigger('click');
                        }

                        // Prevent click event from propagating to parent
                        e.stopPropagation();
                    });

                    // Handle table draw event
                    $('#contact_table').on('draw', function () {
                        // Update state of "Select all" control
                        updateDataTableSelectAllCtrl(table);
                    });
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Update Stock error');

                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Update Stock error');

        }
    });
});

//--------------------------------------Apply Contact Details in add flow------------------------------------------------------
$('#ApplyContact').click(function () {

    var getData = $('#contact_table').dataTable();
    var getCollection = getData.$("input:checkbox[class=chk]:checked", { "page": "all" });

    $(getCollection).each(function () {
        var testData = new Object();
        testData.contactTemplateId = ContactTemplateId;
        // testData.emailId = emailId;
        // testData.contactNo = mobileNo;
        testData.active = true;
        testData.pmcId = pmcId;
        testData.pmsUnitId = $(this).attr("id");
        contactId.push(testData);

    });

    var getUncheckedContact = getData.$("input:checkbox[class=chk]:not(:checked)", { "page": "all" });
    $(getUncheckedContact).each(function () {
        var testData = new Object();
        testData.contactTemplateId = ContactTemplateId;
        // testData.emailId = emailId;
        // testData.contactNo = mobileNo;
        testData.active = false;
        testData.pmcId = pmcId;
        testData.pmsUnitId = $(this).attr("id");
        contactId.push(testData);

    });

    console.log(JSON.stringify(contactId));
    $.ajax({
        type: 'POST',
        //data: person,
        data: JSON.stringify(contactId),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/contact/apply',
        success: function (result) {
            document.getElementById("main-body").innerHTML = "Contact Details applied successfully!";
            $('#Tax_Message').modal('show');
        },
        error: function (xhr, textStatus, errorThrown) {
            document.getElementById("main-body").innerHTML = " Ooops! something went wrong, please try again later";
            $('#Tax_Message').modal('show');
        }
    });
});


//------------------------------------click on Next in edit flow----------------------------------------------------------
$('#editContact').click(function () {

    $('#contactName1').empty();
    $('#emailId1').empty();
    $('#mobNo1').empty();
    var contactName = document.getElementById("contactName").value;
    if (contactName == "") {
        document.getElementById("contactName1").innerHTML = 'Please enter Contact Name.';
        document.getElementById("contactName").focus();
        return false;
    }
    else {
        document.getElementById("contactName1").innerHTML = "";
    }

    var mailId = document.getElementById("email").value;
    if (mailId == "") {
        document.getElementById("emailId1").innerHTML = 'Please enter the Email.';
        document.getElementById("email").focus();
        return false;
    }
    else {
        document.getElementById("emailId1").innerHTML = "";
    }

    var v = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (v.test(email.value) == false) {
        document.getElementById("emailId1").innerHTML = 'Invalid Email Address.';
        email.focus();
        return false;
    } else {
        document.getElementById("emailId1").innerHTML = "";
    }

    var mobNo = document.getElementById("mobNo").value;
    if (mobNo == "") {
        document.getElementById("mobNo1").innerHTML = 'Please enter the Mobile Number.';
        document.getElementById("mobNo").focus();
        return false;
    }
    else {
        document.getElementById("mobNo1").innerHTML = "";
    }
    if (mobNo.length > 12 || mobNo.length < 12) {
        document.getElementById("mobNo1").innerHTML = 'Mobile number should be of 10 digits';
        document.getElementById("mobNo").focus();
        return false;
    }

    var mobile = mobNo.replace(/\D+/g, '');


    var UpdateTemplate = new Object();
    UpdateTemplate.contactTemplateName = contactName;
    UpdateTemplate.emailId = mailId;
    UpdateTemplate.contactNo = mobile;
    UpdateTemplate.contactTemplateId = document.getElementById("contactId").value;
    UpdateTemplate.pmcId = pmcId;
    UpdateTemplate.active = true;
    //console.log(JSON.stringify(UpdateTemplate))
    //------------------------------------------save API call in edit flow----------------------------------------------------------
    $.ajax({
        type: 'PUT',
        //data: person,
        data: JSON.stringify(UpdateTemplate),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/contactTemplate',
        success: function (result) {
            // console.log(result)
            ContactTemplateId = result.contactTemplateId;
            mobileNo = result.contactNo;
            emailId = result.emailId;
            var rows_selected = [];

            $('#contactUpdateLabel').append('Apply ' + result.contactTemplateName + ' template to Properties');
            //var ContactTempId = result.contactTemplateId;
            //-----------------------------------display properties in edit flow-------------------------------------------
            $.ajax({
                url: newurl + 'property/contact/apply/pmcId/' + pmcId + '/contactTemplateId/' + ContactTemplateId,
                type: 'GET',
                dataType: "json",
                'headers': {
                    Authorization: localStorage.getItem('token') || '',
                },
                success: function (result, textStatus, xhr) {
                    //console.log(JSON.stringify(result));
                    if((JSON.stringify(result)) == "[]"){
                        $("#UpdateContact").hide();
                        //document.getElementById("UpdateContact").disabled = true;
                    }
                    $.each(result, function (i, item) {

                        if (item.propertyName == undefined || item.propertyName == "" || item.propertyName == null) {
                            item.propertyName = "Untitled Property";

                        } else {
                            item.propertyName = item.propertyName;
                        }
                        if (item.contactTemplateId == "0") {
                            $('<tr>').html('<td class="text-center"><input class=chk type="checkbox" id="' + item.pmsUnitId + '" name="propertySelect"></td><td>' + item.propertyName + "</td><td>" + item.address + "</td>").appendTo('#contactUpdate_table');
                        } else {
                            $('<tr>').html('<td class="text-center"><input class=chk type="checkbox" id="' + item.pmsUnitId + '" name="propertySelect" checked></td><td>' + item.propertyName + "</td><td>" + item.address + "</td>").appendTo('#contactUpdate_table');
                        }

                    });



                    $("#contactUpdate_table").dataTable().fnDestroy();
                    $('#contactUpdate_table').DataTable({
                        "language": {
                            "info": "Showing _END_ of _TOTAL_ Properties",
                            "infoFiltered": ""
                        },
                        "bLengthChange": false,
                        "bSort": false,
                        'order': [0, 'asc'],
                        'rowCallback': function (row, data, dataIndex) {
                            // var rowId = data;
                            var oTable = $('#contactUpdate_table').dataTable();
                            var rowcollection = oTable.$(".chk", { "page": "current" });
                            if (rowcollection.filter(':checked').length == rowcollection.length) {
                                $('#checkAllContactUpdate').prop('checked', true);
                            } else {
                                $('#checkAllContactUpdate').prop('checked', false);
                            }
                        }
                    });


                    // Updates "Select all" control in a data table
                    function updateDataTableSelectAllCtrl(table) {
                        var $table = $('#contactUpdate_table').dataTable();
                        var $chkbox_all = $('tbody input[type="checkbox"]', $table);
                        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
                        var chkbox_select_all = $('thead input[name="select_allContactUpdate"]', $table).get(0);

                        // If none of the checkboxes are checked
                        if ($chkbox_checked.length === 0) {
                            chkbox_select_all.checked = false;
                            if ('indeterminate' in chkbox_select_all) {
                                chkbox_select_all.indeterminate = false;
                            }

                            // If all of the checkboxes are checked
                        } else if ($chkbox_checked.length === $chkbox_all.length) {
                            chkbox_select_all.checked = true;
                            if ('indeterminate' in chkbox_select_all) {
                                chkbox_select_all.indeterminate = false;
                            }

                            // If some of the checkboxes are checked
                        } else {
                            chkbox_select_all.checked = true;
                            if ('indeterminate' in chkbox_select_all) {
                                chkbox_select_all.indeterminate = true;
                            }
                        }
                    }
                    // Handle click on checkbox
                    $('#contactUpdate_table tbody').on('click', 'input[type="checkbox"]', function (e) {
                        var $row = $(this).closest('tr');

                        // Get row data
                        var data = $('#contactUpdate_table').dataTable();

                        // Get row ID
                        var rowId = data[0];

                        // Determine whether row ID is in the list of selected row IDs 
                        var index = $.inArray(rowId, rows_selected);

                        // If checkbox is checked and row ID is not in list of selected row IDs
                        if (this.checked && index === -1) {
                            rows_selected.push(rowId);

                            // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
                        } else if (!this.checked && index !== -1) {
                            rows_selected.splice(index, 1);
                        }

                        if (this.checked) {
                            $row.addClass('selected');
                        } else {
                            $row.removeClass('selected');
                        }

                        // Update state of "Select all" control
                        updateDataTableSelectAllCtrl(data);

                        // Prevent click event from propagating to parent
                        e.stopPropagation();
                    });

                    // Handle click on table cells with checkboxes
                    $('#contactUpdate_table').on('click', 'tbody td, thead th:first-child', function (e) {

                        $(this).parent().find('input[type="checkbox"]').trigger('click');
                    });

                    // Handle click on "Select all" control
                    $('thead input[name="select_allContactUpdate"]').on('click', function (e) {
                        if (this.checked) {
                            $('#contactUpdate_table tbody input[type="checkbox"]:not(:checked)').trigger('click');
                        } else {
                            $('#contactUpdate_table tbody input[type="checkbox"]:checked').trigger('click');
                        }

                        // Prevent click event from propagating to parent
                        e.stopPropagation();
                    });

                    // Handle table draw event
                    $('#contactUpdate_table').on('draw', function () {
                        // Update state of "Select all" control
                        updateDataTableSelectAllCtrl(table);
                    });
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Database');
                    // console.log(errorThrown);
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            document.getElementById("main-body").innerHTML = " Ooops! something went wrong, please try again later";
            $('#Tax_Message').modal('show');

        },


    });
});

//----------------------------------------------apply for properties in edit discount----------------------------------------
$('#UpdateContact').click(function () {
    var ContactInput = [];

    var getTable = $('#contactUpdate_table').dataTable();
    var getUpdatedData = getTable.$("input:checkbox[class=chk]:checked", { "page": "all" });

    $(getUpdatedData).each(function () {

        var testData1 = new Object();
        testData1.pmcId = pmcId;
        testData1.pmsUnitId = $(this).attr("id");
        testData1.contactTemplateId = ContactTemplateId;
        // testData1.emailId = emailId;
        // testData1.contactNo = mobileNo;
        testData1.active = true;
        ContactInput.push(testData1);

    });

    var getUncheckedData = getTable.$("input:checkbox[class=chk]:not(:checked)", { "page": "all" });
    $(getUncheckedData).each(function () {

        var testData1 = new Object();
        testData1.pmcId = pmcId;
        testData1.pmsUnitId = $(this).attr("id");
        testData1.contactTemplateId = ContactTemplateId;
        // testData1.emailId = emailId;
        // testData1.contactNo = mobileNo;
        testData1.active = false;
        ContactInput.push(testData1);

    });
    // console.log(JSON.stringify(ContactInput))
    //  window.location.reload();
    $.ajax({
        type: 'PUT',
        //data: person,
        data: JSON.stringify(ContactInput),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/contact/apply/update',
        success: function (result) {
            document.getElementById("main-body").innerHTML = "Contact Details applied successfully!";
            $('#Tax_Message').modal('show');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            document.getElementById("main-body").innerHTML = " Ooops! something went wrong, please try again later";
            $('#Tax_Message').modal('show');

        },


    });
});
