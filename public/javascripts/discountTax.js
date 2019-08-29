//-----------------------------------Global Variable-------------------------------------------------------------
var newurl = document.getElementById("globalUrl").value;
var pmcId = document.getElementById("pmcId").value;
var discountTemplateId = "";
var discTName = "";
var discount = "";
var active = "";
var discountId = [];

//----------------------------------------click on Create New button-------------------------------------------------------
$('#createDiscountxTemp').click(function () {

    $('#discountTName').val('');
    $('#discountPer').val('');
    $('#discountText').empty();
    $('#discountText').append('<h6 class="modal-title">Create a New Discount Template</h6>')
    $('#editDiscount').empty();
    $('#addDiscountTemplate').empty();
    $('#addDiscountTemplate').append('<button type="submit" data-backdrop="static" data-keyboard="false" id="addDiscountTemplate" class="btn btn-blue btn-rounded btn-large width-100" data-toggle="modal" data-target="#myModal-discountNext" data-dismiss="modal">Next</button>');
});

//------------------------------------click on Next in add flow----------------------------------------------------------
$('#addDiscountTemplate').click(function () {

    var discountTName = document.getElementById("discountTName").value;
    if (discountTName == "") {
        document.getElementById("discountTName1").innerHTML = 'Please enter Discount Template Name.';
        document.getElementById("discountTName").focus();
        return false;
    }
    else {
        document.getElementById("discountTName1").innerHTML = "";
    }

    var discountPer = document.getElementById("discountPer").value;
    if (discountPer == "") {
        document.getElementById("discountPer1").innerHTML = 'Please enter the discount Percentage.';
        document.getElementById("discountPer").focus();
        return false;
    } else if (discountPer < 5) {
        document.getElementById("discountPer1").innerHTML = 'The discount must be at least 5%.';
        document.getElementById("discountPer").focus();
        return false;
    } else if (discountPer > 100) {
        document.getElementById("discountPer1").innerHTML = 'The discount must be greater than 100%.';
        document.getElementById("discountPer").focus();
        return false;
    }
    else {
        document.getElementById("discountPer1").innerHTML = "";
    }


    var template = new Object();
    template.discountTemplateName = discountTName;
    template.discountPercent = discountPer;
    template.active = true;
    template.pmcId = pmcId;

    //------------------------------------------Save API call to add the discount-----------------------------------------------------------
    $.ajax({
        type: 'POST',
        //data: person,
        data: JSON.stringify(template),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/discount',
        success: function (result) {

            discountTemplateId = result.discountTemplateId;
            discount = result.discountPercent;
            discTName = result.discountTemplateName;
            var rows_selected = [];
            $('#discNameDisplay').append('Apply ' + result.discountTemplateName + ' template to Properties');

            //-------------------------------------------------display properties in add flow--------------------------------------
            $.ajax({
                url: newurl + 'property/discount/apply/pmcId/' + pmcId + '/discountTemplateId/' + discountTemplateId,
                type: 'GET',
                dataType: "json",
                'headers': {
                    Authorization: localStorage.getItem('token') || '',
                },
                success: function (result, textStatus, xhr) {

                    if((JSON.stringify(result)) == "[]"){
                        $("#applyDiscount").hide();
                      //  document.getElementById("applyDiscount").disabled = true;
                    }
                    $.each(result, function (i, item) {


                        if (item.propertyName == undefined || item.propertyName == "" || item.propertyName == null) {
                            item.propertyName = "Untitled Property";
                        } else {
                            item.propertyName = item.propertyName;
                        }

                        if (item.discountTemplateId == "0") {
                            $('<tr>').html('<td class="text-center"><input class=chk type="checkbox" id="' + item.pmsUnitId + '" name="propertySelect"></td><td>' + item.propertyName + "</td><td>" + item.address + "</td>").appendTo('#discount_table');
                        }
                        // onclick="return CheckDiscountAddAll(this);"
                    });

                    $("#discount_table").dataTable().fnDestroy();
                    $('#discount_table').DataTable({
                        "language": {
                            "info": "Showing _END_ of _TOTAL_ Properties",
                            "infoFiltered": ""
                        },
                        "bLengthChange": false,
                        "bSort": false,
                        'order': [0, 'asc'],
                        'rowCallback': function (row, data, dataIndex) {
                            // var rowId = data;
                            var oTable = $('#discount_table').dataTable();
                            var rowcollection = oTable.$(".chk", { "page": "current" });
                            if (rowcollection.filter(':checked').length == rowcollection.length) {
                                $('#checkAllDiscount').prop('checked', true);
                            } else {
                                $('#checkAllDiscount').prop('checked', false);
                            }
                        }
                    });


                    // Updates "Select all" control in a data table
                    function updateDataTableSelectAllCtrl(table) {
                        var $table = $('#discount_table').dataTable();
                        var $chkbox_all = $('tbody input[type="checkbox"]', $table);
                        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
                        var chkbox_select_all = $('thead input[name="selectall"]', $table).get(0);

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
                    $('#discount_table tbody').on('click', 'input[type="checkbox"]', function (e) {
                        var $row = $(this).closest('tr');

                        // Get row data
                        var data = $('#discount_table').dataTable();

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
                    $('#discount_table').on('click', 'tbody td, thead th:first-child', function (e) {

                        $(this).parent().find('input[type="checkbox"]').trigger('click');
                    });

                    // Handle click on "Select all" control
                    $('thead input[name="selectall"]').on('click', function (e) {
                        if (this.checked) {
                            $('#discount_table tbody input[type="checkbox"]:not(:checked)').trigger('click');
                        } else {
                            $('#discount_table tbody input[type="checkbox"]:checked').trigger('click');
                        }

                        // Prevent click event from propagating to parent
                        e.stopPropagation();
                    });

                    // Handle table draw event
                    $('#discount_table').on('draw', function () {
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

//--------------------------------------Apply discount in add flow------------------------------------------------------
$('#applyDiscount').click(function () {

    $("#discount_table").dataTable().fnDestroy();
    var getData = $('#discount_table').dataTable();
    var getCollection = getData.$("input:checkbox[class=chk]:checked", { "page": "all" });

    $(getCollection).each(function () {
        var testData = new Object();
        testData.discountTemplateId = discountTemplateId;
        testData.discPer = discount;
        testData.pmcId = pmcId;
        testData.active = true;
        testData.pmsUnitId = $(this).attr("id");
        discountId.push(testData);

    });

    var getUncheckedDisc = getData.$("input:checkbox[class=chk]:not(:checked)", { "page": "all" });
    $(getUncheckedDisc).each(function () {
        var testData = new Object();
        testData.discountTemplateId = discountTemplateId;
        testData.discPer = discount;
        testData.pmcId = pmcId;
        testData.active = false;
        testData.pmsUnitId = $(this).attr("id");
        discountId.push(testData);

    });

    $.ajax({
        type: 'POST',
        //data: person,
        data: JSON.stringify(discountId),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/discount/apply',
        success: function (result) {
            document.getElementById("main-body").innerHTML = "Discount applied successfully!";
            $('#Tax_Message').modal('show');
        },
        error: function (xhr, textStatus, errorThrown) {
            document.getElementById("main-body").innerHTML = " Ooops! something went wrong, please try again later";
            $('#Tax_Message').modal('show');
        }
    });
});


//------------------------------------click on Next in edit flow----------------------------------------------------------
$('#editDiscount').click(function () {

    $('#discountTName1').empty();
    $('#discountPer1').empty();

    var discountTName = document.getElementById("discountTName").value;
    if (discountTName == "") {
        document.getElementById("discountTName1").innerHTML = 'Please enter Discount Template Name.';
        document.getElementById("discountTName").focus();
        return false;
    }
    else {
        document.getElementById("discountTName1").innerHTML = "";
    }

    var discountPer = document.getElementById("discountPer").value;
    if (discountPer == "") {
        document.getElementById("discountPer1").innerHTML = 'Please enter the discount Percentage.';
        document.getElementById("discountPer").focus();
        return false;
    } else if (discountPer < 5) {
        document.getElementById("discountPer1").innerHTML = 'The discount must be at least 5%.';
        document.getElementById("discountPer").focus();
        return false;
    } else if (discountPer > 100) {
        document.getElementById("discountPer1").innerHTML = 'The discount must be greater than 100%.';
        document.getElementById("discountPer").focus();
        return false;
    }
    else {
        document.getElementById("discountPer1").innerHTML = "";
    }

    var UpdateDiscTemplate = new Object();
    UpdateDiscTemplate.discountTemplateId = document.getElementById("discountTempId").value;
    UpdateDiscTemplate.discountTemplateName = document.getElementById("discountTName").value;
    UpdateDiscTemplate.discountPercent = document.getElementById("discountPer").value;
    UpdateDiscTemplate.active = true;
    UpdateDiscTemplate.pmcId = pmcId;
    // console.log(JSON.stringify(UpdateTemplate));

    //------------------------------------------save API call in edit flow----------------------------------------------------------
    $.ajax({
        type: 'PUT',
        //data: person,
        data: JSON.stringify(UpdateDiscTemplate),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/discount',
        success: function (result) {

            // var discountTemplId = result.discountTemplateId;
            // discountTemplateId = result.discountTemplateId;
            //console.log(result)
            discount = result.discountPercent;
            var rows_selected = [];
            // var item_Arry=[];
            // propertyTaxTemplateId = result.propertyTaxTemplates[0].propertyTaxTemplateId;
            $('#discDisplay').append('Apply ' + document.getElementById("discountTName").value + ' template to Properties');
            //-----------------------------------display properties in edit flow-------------------------------------------
            $.ajax({
                url: newurl + 'property/discount/apply/pmcId/' + pmcId + '/discountTemplateId/' + document.getElementById("discountTempId").value,
                type: 'GET',
                dataType: "json",
                'headers': {
                    Authorization: localStorage.getItem('token') || '',
                },
                success: function (result, textStatus, xhr) {
                    if((JSON.stringify(result)) == "[]"){
                        $("#updateDiscount").hide();
                        //document.getElementById("updateDiscount").disabled = true;
                    }
                    // console.log(JSON.stringify(result));
                    $.each(result, function (i, item) {

                        if (item.propertyName == undefined || item.propertyName == "" || item.propertyName == null) {
                            item.propertyName = "Untitled Property";

                        } else {
                            item.propertyName = item.propertyName;
                        }
                        if (item.discountTemplateId == "0") {
                            $('<tr>').html('<td class="text-center"><input class=chk type="checkbox" id="' + item.pmsUnitId + '" name="propertySelect"></td><td>' + item.propertyName + "</td><td>" + item.address + "</td>").appendTo('#discUpdate_table');
                        } else {
                            $('<tr>').html('<td class="text-center"><input class=chk type="checkbox" id="' + item.pmsUnitId + '" name="propertySelect" checked></td><td>' + item.propertyName + "</td><td>" + item.address + "</td>").appendTo('#discUpdate_table');
                        }


                    });

                    $("#discUpdate_table").dataTable().fnDestroy();
                    $('#discUpdate_table').DataTable({
                        "language": {
                            "info": "Showing _END_ of _TOTAL_ Properties",
                            "infoFiltered": ""
                        },
                        "bLengthChange": false,
                        "bSort": false,
                        'order': [0, 'asc'],
                        'rowCallback': function (row, data, dataIndex) {
                            // var rowId = data;
                            var oTable = $('#discUpdate_table').dataTable();
                            var rowcollection = oTable.$(".chk", { "page": "current" });
                            if (rowcollection.filter(':checked').length == rowcollection.length) {
                                $('#updatedDiscountCheckAll').prop('checked', true);
                            } else {
                                $('#updatedDiscountCheckAll').prop('checked', false);
                            }
                        }
                    });


                    // Updates "Select all" control in a data table
                    function updateDataTableSelectAllCtrl(table) {
                        var $table = $('#discUpdate_table').dataTable();
                        var $chkbox_all = $('tbody input[type="checkbox"]', $table);
                        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
                        var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

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
                    $('#discUpdate_table tbody').on('click', 'input[type="checkbox"]', function (e) {
                        var $row = $(this).closest('tr');

                        // Get row data
                        var data = $('#discUpdate_table').dataTable();

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
                    $('#discUpdate_table').on('click', 'tbody td, thead th:first-child', function (e) {

                        $(this).parent().find('input[type="checkbox"]').trigger('click');
                    });

                    // Handle click on "Select all" control
                    $('thead input[name="select_all"]').on('click', function (e) {
                        if (this.checked) {
                            $('#discUpdate_table tbody input[type="checkbox"]:not(:checked)').trigger('click');
                        } else {
                            $('#discUpdate_table tbody input[type="checkbox"]:checked').trigger('click');
                        }

                        // Prevent click event from propagating to parent
                        e.stopPropagation();
                    });

                    // Handle table draw event
                    $('#discUpdate_table').on('draw', function () {
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
$('#updateDiscount').click(function () {
    var discountInput = [];

    // var checkTable = $('#discUpdate_table').dataTable();
    // var checkboxs = checkTable.$("input:checkbox[class=chk]:checked", { "page": "all" })
    // var okay = false;
    // for (var i = 0, l = checkboxs.length; i < l; i++) {
    //     if (checkboxs[i].checked) {
    //         okay = true;
    //         break;
    //     }
    // }
    // if (okay) {

    // }
    // else {
    //     window.location.reload();
    // }
    $("#discUpdate_table").dataTable().fnDestroy();
    var getTable = $('#discUpdate_table').dataTable();

    //var getUpdatedData =  getTable.$(".call-checkbox:checked", {"page": "all"});
    var getUpdatedData = getTable.$("input:checkbox[class=chk]:checked", { "page": "all" });
    $(getUpdatedData).each(function () {

        var TestData1 = new Object();
        TestData1.pmcId = pmcId;
        TestData1.pmsUnitId = $(this).attr("id");
        TestData1.discountTemplateId = document.getElementById("discountTempId").value;
        TestData1.discPer = discount;
        TestData1.active = true;
        discountInput.push(TestData1);

    });

    var getUncheckedData = getTable.$("input:checkbox[class=chk]:not(:checked)", { "page": "all" });
    $(getUncheckedData).each(function () {

        var TestData1 = new Object();
        TestData1.pmcId = pmcId;
        TestData1.pmsUnitId = $(this).attr("id");
        TestData1.active = false;
        TestData1.discountTemplateId = document.getElementById("discountTempId").value;
        TestData1.discPer = discount;
        discountInput.push(TestData1);

    });
    console.log(JSON.stringify(discountInput))
    //  window.location.reload();
    $.ajax({
        type: 'PUT',
        //data: person,
        data: JSON.stringify(discountInput),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/discount/apply',
        success: function (result) {
            document.getElementById("main-body").innerHTML = "Discount updated successfully!";
            $('#Tax_Message').modal('show');
        },
        error: function (xhr, textStatus, errorThrown) {
            document.getElementById("main-body").innerHTML = " Ooops! something went wrong, please try again later";
            $('#Tax_Message').modal('show');

        },


    });
});
