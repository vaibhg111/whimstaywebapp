//-----------------------------------Global Variable-------------------------------------------------------------
var newurl = document.getElementById("globalUrl").value;
var pmcId = document.getElementById("pmcId").value;
var taxTemplateId = "";
var nightlyRateTaxPercent = "";
var serviceTaxPercent = "";
var active = "";
var propertyTaxTemplateId = "";
var taxId = [];

//----------------------------------------click on Create New button-------------------------------------------------------

$('#createTaxTemp').click(function () {

    $('#taxTempId').val('');
    $('#taxTName').val('');
    $('#rateTaxes').val('')
    $('#servicesTaxes').val('');
    $('#headerText').empty();
    $('#headerText').append('<h6 class="modal-title">Create a New Tax Template</h6>')
    $('#editTemplate').empty();
    $('#addTemplate').empty();
    $('#addTemplate').append('<button type="submit" data-backdrop="static" data-keyboard="false" id="addTemplate" class="btn btn-blue btn-rounded btn-large width-100" data-toggle="modal" data-target="#myModal-TaxesNext" data-dismiss="modal">Next</button>');
});

//------------------------------------click on Next in add flow----------------------------------------------------------

$('#addTemplate').click(function () {
    $('#taxTName1').empty();
    $('#rateTaxes1').empty();
    $('#servicesTaxes1').empty();

    var taxTName = document.getElementById("taxTName").value;
    if (taxTName == "") {
        document.getElementById("taxTName1").innerHTML = 'Please enter Tax Template Name.';
        document.getElementById("taxTName").focus();
        return false;
    }
    else {
        document.getElementById("taxTName1").innerHTML = "";
    }

    var rateTaxes = document.getElementById("rateTaxes").value;
    if (rateTaxes == "") {
        document.getElementById("rateTaxes1").innerHTML = 'Please enter Rate Taxes.';
        document.getElementById("rateTaxes").focus();
        return false;
    }
    else {
        document.getElementById("rateTaxes1").innerHTML = "";
    }
    if (rateTaxes > 100) {
        document.getElementById("rateTaxes1").innerHTML = 'The Rate Taxes must be less than 100%.';
        document.getElementById("rateTaxes").focus();
        return false;
    }
    else {
        document.getElementById("rateTaxes1").innerHTML = "";
    }

    var servicesTaxes = document.getElementById("servicesTaxes").value;
    if (servicesTaxes == "") {
        document.getElementById("servicesTaxes1").innerHTML = 'Please enter Service Taxes.';
        document.getElementById("servicesTaxes").focus();
        return false;
    }
    else {
        document.getElementById("servicesTaxes1").innerHTML = "";
    }

    if (servicesTaxes > 100) {
        document.getElementById("servicesTaxes1").innerHTML = 'The Service Taxes must be less than 100%.';
        document.getElementById("servicesTaxes").focus();
        return false;
    }
    else {
        document.getElementById("servicesTaxes1").innerHTML = "";
    }

    var Template = new Object();
    Template.taxTemplateName = document.getElementById("taxTName").value;
    Template.nightlyRateTaxPercent = document.getElementById("rateTaxes").value;
    Template.serviceTaxPercent = document.getElementById("servicesTaxes").value;
    Template.active = true;
    Template.pmcId = pmcId;

    //------------------------------------------Save API call to add the Tax-----------------------------------------------------------

    $.ajax({
        type: 'POST',
        //data: person,
        data: JSON.stringify(Template),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/tax',
        success: function (result) {

            taxTemplateId = result.taxTemplateId;
            nightlyRateTaxPercent = result.nightlyRateTaxPercent;
            serviceTaxPercent = result.serviceTaxPercent;
            active = result.active;
            var rows_selected = [];
            $('#taxDisplay').append('Apply ' + result.taxTemplateName + ' template to Properties');

            //-------------------------------------------------display properties in add flow--------------------------------------
            $.ajax({
                url: newurl + 'property/tax/apply/pmcId/'+ pmcId +'/taxTemplateId/' + taxTemplateId,
                type: 'GET',
                dataType: "json", 'headers': { Authorization: localStorage.getItem('token') || '', },
                success: function (result, textStatus, xhr) {

                    // console.log(JSON.stringify(result))
                    if((JSON.stringify(result)) == "[]"){
                        $("#applyTax").hide();
                    }
                    
                    $.each(result, function (i, item) {


                        if (item.propertyName == undefined || item.propertyName == "" || item.propertyName == null) {
                            item.propertyName = "Untitled Property";
                        } else {
                            item.propertyName = item.propertyName;
                        }

                        if (item.taxTemplateId == "0") {
                            $('<tr>').html('<td class="text-center"><input class=chk type="checkbox" id="' + item.pmsUnitId + '" name="propertySelect"></td><td>' + item.propertyName + "</td><td>" + item.address + "</td>").appendTo('#table_data');
                        }

                    });

                    $("#table_data").dataTable().fnDestroy();
                    $('#table_data').DataTable({
                        "language": {
                            "info": "Showing _END_ of _TOTAL_ Properties",
                            "infoFiltered": ""
                        },
                        "bLengthChange": false,
                        "bSort": false,
                        'order': [0, 'asc'],
                        'rowCallback': function (row, data, dataIndex) {
                            // var rowId = data;
                            var oTable = $('#table_data').dataTable();
                            var rowcollection = oTable.$(".chk", { "page": "current" });
                            if (rowcollection.filter(':checked').length == rowcollection.length) {
                                $('#checkAll').prop('checked', true);
                            } else {
                                $('#checkAll').prop('checked', false);
                            }
                        }
                    });


                    // Updates "Select all" control in a data table
                    function updateDataTableSelectAllCtrl(table) {
                        var $table = $('#table_data').dataTable();
                        var $chkbox_all = $('tbody input[type="checkbox"]', $table);
                        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
                        var chkbox_select_all = $('thead input[name="select_tax"]', $table).get(0);

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
                    $('#table_data tbody').on('click', 'input[type="checkbox"]', function (e) {
                        var $row = $(this).closest('tr');

                        // Get row data
                        var data = $('#table_data').dataTable();

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
                    $('#table_data').on('click', 'tbody td, thead th:first-child', function (e) {

                        $(this).parent().find('input[type="checkbox"]').trigger('click');
                    });

                    // Handle click on "Select all" control
                    $('thead input[name="select_tax"]').on('click', function (e) {
                        if (this.checked) {
                            $('#table_data tbody input[type="checkbox"]:not(:checked)').trigger('click');
                        } else {
                            $('#table_data tbody input[type="checkbox"]:checked').trigger('click');
                        }

                        // Prevent click event from propagating to parent
                        e.stopPropagation();
                    });

                    // Handle table draw event
                    $('#table_data').on('draw', function () {
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
            console.log('Error in Database');
            // console.log(errorThrown);
        }
    });

});

//--------------------------------------Apply Tax in add flow------------------------------------------------------

$('#applyTax').click(function () {

    $("#table_data").dataTable().fnDestroy();
    var getData = $('#table_data').dataTable();
    var getDataCollection = getData.$("input:checkbox[class=chk]:checked", { "page": "all" });

    $(getDataCollection).each(function () {
        var testData1 = new Object();
        testData1.taxTemplateId = taxTemplateId;
        testData1.nightlyTaxPer = nightlyRateTaxPercent;
        testData1.serviceTaxPer = serviceTaxPercent;
        testData1.pmcId =  pmcId;
        testData1.active =  true;
        testData1.pmsUnitId = $(this).attr("id");
        taxId.push(testData1);

    });
    var getUncheckedData = getData.$("input:checkbox[class=chk]:not(:checked)", { "page": "all" });
    
    $(getUncheckedData).each(function () {
        var testData1 = new Object();
        testData1.taxTemplateId = taxTemplateId;
        testData1.nightlyTaxPer = nightlyRateTaxPercent;
        testData1.serviceTaxPer = serviceTaxPercent;
        testData1.pmcId =  pmcId;
        testData1.active =  false;
        testData1.pmsUnitId = $(this).attr("id");
        taxId.push(testData1);

    });
    console.log(JSON.stringify(taxId));
    $.ajax({
        type: 'POST',
        //data: person,
        data: JSON.stringify(taxId),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/tax/apply',
        success: function (result) {

            document.getElementById("main-body").innerHTML = "Tax applied successfully!";
            $('#Tax_Message').modal('show');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in API');
            // console.log(errorThrown);
        }
    });


});

//------------------------------------click on Next in edit flow----------------------------------------------------------

$('#editTemplate').click(function () {
    $('#taxTName1').empty();
    $('#rateTaxes1').empty();
    $('#servicesTaxes1').empty();

    var taxTName = document.getElementById("taxTName").value;
    if (taxTName == "") {
        document.getElementById("taxTName1").innerHTML = 'Please enter Tax Template Name.';
        document.getElementById("taxTName").focus();
        return false;
    }
    else {
        document.getElementById("taxTName1").innerHTML = "";
    }

    var rateTaxes = document.getElementById("rateTaxes").value;
    if (rateTaxes == "") {
        document.getElementById("rateTaxes1").innerHTML = 'Please enter Rate Taxes.';
        document.getElementById("rateTaxes").focus();
        return false;
    }
    else {
        document.getElementById("rateTaxes1").innerHTML = "";
    }
    if (rateTaxes > 100) {
        document.getElementById("rateTaxes1").innerHTML = 'The Rate Taxes must be less than 100%.';
        document.getElementById("rateTaxes").focus();
        return false;
    }
    else {
        document.getElementById("rateTaxes1").innerHTML = "";
    }

    var servicesTaxes = document.getElementById("servicesTaxes").value;
    if (servicesTaxes == "") {
        document.getElementById("servicesTaxes1").innerHTML = 'Please enter Service Taxes.';
        document.getElementById("servicesTaxes").focus();
        return false;
    }
    else {
        document.getElementById("servicesTaxes1").innerHTML = "";
    }
    if (servicesTaxes > 100) {
        document.getElementById("servicesTaxes1").innerHTML = 'The Service Taxes must be less than 100%.';
        document.getElementById("servicesTaxes").focus();
        return false;
    }
    else {
        document.getElementById("servicesTaxes1").innerHTML = "";
    }


    var UpdateTemplate = new Object();
    UpdateTemplate.taxTemplateId = document.getElementById("taxTempId").value;
    UpdateTemplate.taxTemplateName = document.getElementById("taxTName").value;
    UpdateTemplate.nightlyRateTaxPercent = document.getElementById("rateTaxes").value;
    UpdateTemplate.serviceTaxPercent = document.getElementById("servicesTaxes").value;
    UpdateTemplate.active = true;
    UpdateTemplate.pmcId = pmcId;

    // console.log(JSON.stringify(UpdateTemplate));
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
        url: newurl + 'property/tax',
        success: function (result) {
            // console.log(JSON.stringify(result));
            var taxSetId = result.taxTemplateId;
            taxTemplateId = result.taxTemplateId;
            nightlyRateTaxPercent = result.nightlyRateTaxPercent;
            serviceTaxPercent = result.serviceTaxPercent;
            var taxTemplateName = result.taxTemplateName;
            var rows_selected = [];
            // propertyTaxTemplateId = result.propertyTaxTemplates[0].propertyTaxTemplateId;

            //-----------------------------------display properties in edit flow-------------------------------------------

            $.ajax({
                url: newurl + 'property/tax/apply/pmcId/'+ pmcId +'/taxTemplateId/' + taxSetId,
                type: 'GET',
                dataType: "json",
                'headers': {
                    Authorization: localStorage.getItem('token') || '',
                },
                success: function (result, textStatus, xhr) {
                     console.log(JSON.stringify(result))
                    if((JSON.stringify(result)) == "[]"){
                        $("#updateTax").hide();
                    }
                    $('#taxTitleDisplay').append('Apply ' + taxTemplateName + ' template to Properties');

                    $.each(result, function (i, item) {

                        if (item.propertyName == undefined || item.propertyName == "" || item.propertyName == null) {
                            item.propertyName = "Untitled Property";

                        } else {
                            item.propertyName = item.propertyName;
                        }
                        if (item.taxTemplateId == "0") {
                            $('<tr>').html('<td class="text-center"><input class=chk type="checkbox" id="' + item.pmsUnitId + '" name="propertySelect"></td><td>' + item.propertyName + "</td><td>" + item.address + "</td>").appendTo('#Update_table');
                        } else {
                            $('<tr>').html('<td class="text-center"><input class=chk type="checkbox" id="' + item.pmsUnitId + '" name="propertySelect" checked></td><td>' + item.propertyName + "</td><td>" + item.address + "</td>").appendTo('#Update_table');
                        }

                    });

                    $("#Update_table").dataTable().fnDestroy();
                    $('#Update_table').DataTable({
                        "language": {
                            "info": "Showing _END_ of _TOTAL_ Properties",
                            "infoFiltered": ""
                        },
                        "bLengthChange": false,
                        "bSort": false,
                        'order': [0, 'asc'],
                        'rowCallback': function (row, data, dataIndex) {
                            // var rowId = data;
                            var oTable = $('#Update_table').dataTable();
                            var rowcollection = oTable.$(".chk", { "page": "current" });
                            if (rowcollection.filter(':checked').length == rowcollection.length) {
                                $('#checkUpdateAll').prop('checked', true);
                            } else {
                                $('#checkUpdateAll').prop('checked', false);
                            }
                        }
                    });


                    // Updates "Select all" control in a data table
                    function updateDataTableSelectAllCtrl(table) {
                        var $table = $('#Update_table').dataTable();
                        var $chkbox_all = $('tbody input[type="checkbox"]', $table);
                        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
                        var chkbox_select_all = $('thead input[name="select_taxUpdate"]', $table).get(0);

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
                    $('#Update_table tbody').on('click', 'input[type="checkbox"]', function (e) {
                        var $row = $(this).closest('tr');

                        // Get row data
                        var data = $('#Update_table').dataTable();

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
                    $('#Update_table').on('click', 'tbody td, thead th:first-child', function (e) {

                        $(this).parent().find('input[type="checkbox"]').trigger('click');
                    });

                    // Handle click on "Select all" control
                    $('thead input[name="select_taxUpdate"]').on('click', function (e) {
                        if (this.checked) {
                            $('#Update_table tbody input[type="checkbox"]:not(:checked)').trigger('click');
                        } else {
                            $('#Update_table tbody input[type="checkbox"]:checked').trigger('click');
                        }

                        // Prevent click event from propagating to parent
                        e.stopPropagation();
                    });

                    // Handle table draw event
                    $('#Update_table').on('draw', function () {
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

//----------------------------------------------apply for properties in edit Tax----------------------------------------

$('#updateTax').click(function () {
    var taxInput = [];
    // var checkTable = $('#Update_table').dataTable();
    //    var checkboxs = checkTable.$("input:checkbox[class=chk]:checked", { "page": "all" })
    //     var okay = false;
    //     for (var i = 0, l = checkboxs.length; i < l; i++) {
    //         if (checkboxs[i].checked) {
    //             okay = true;
    //             break;
    //         }
    //     }
    //     if (okay) {

    //     }
    //     else {
    //         document.getElementById("checkboxval").innerHTML = 'Please select at least one Property';
    //         return false;
    //     }
    $("#Update_table").dataTable().fnDestroy();
    var getTable = $('#Update_table').dataTable();
    var getChecked = getTable.$("input:checkbox[class=chk]:checked", { "page": "all" });

    $(getChecked).each(function () {

        var testData1 = new Object();
        testData1.pmcId = pmcId;
        testData1.pmsUnitId = $(this).attr("id");
        testData1.taxTemplateId = taxTemplateId;
        testData1.nightlyTaxPer = nightlyRateTaxPercent;
        testData1.serviceTaxPer = serviceTaxPercent;
        testData1.active = true;
        taxInput.push(testData1);

    });

    var getUnchecked = getTable.$("input:checkbox[class=chk]:not(:checked)", { "page": "all" });
    $(getUnchecked).each(function () {

        var testData1 = new Object();
        testData1.pmcId = pmcId;
        testData1.pmsUnitId = $(this).attr("id");
        testData1.active = false;
        testData1.taxTemplateId = taxTemplateId;
        testData1.nightlyTaxPer = nightlyRateTaxPercent;
        testData1.serviceTaxPer = serviceTaxPercent;
        taxInput.push(testData1);

    });
    // console.log(JSON.stringify(taxInput))
    //  window.location.reload();
    $.ajax({
        type: 'PUT',
        //data: person,
        data: JSON.stringify(taxInput),
        contentType: "application/json",
        dataType: "json",
        async: false,
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/tax/apply',
        success: function (result) {
            document.getElementById("main-body").innerHTML = "Tax updated successfully!";
            $('#Tax_Message').modal('show');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            document.getElementById("main-body").innerHTML = " Ooops! something went wrong, please try again later";
            $('#Tax_Message').modal('show');

        },


    });
});
