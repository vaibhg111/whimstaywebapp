var newurl = document.getElementById("globalUrl").value;
var userId = document.getElementById("userId").value;
var pmcId = document.getElementById("pmcId").value;
var currentUrl = $(location).attr('href');
var pmsUnitId = sessionStorage.getItem("pmsUnitId");

$(document).ready(function () {
    var pageCount;
    newurl = document.getElementById("globalUrl").value;
    $('#location').empty();
    $('#pagin').empty();
    // this code only working in production....

    if (currentUrl == hostUrl + "properties#tabinprogress") {
        $('#inProgressTabApi').trigger('click');

    } else {

        $.ajax({
            dataType: "json",
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            type: "GET",
            url: newurl + 'property/pmcId/' + pmcId + '/active/true/isHide/false/host',
            success: function (result) {

                if (result[0] == undefined) {
                    $('#inProgressTabApi').trigger('click');
                } else {
                    $('#activeTabApi').trigger('click');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('update Stock error: ' + textStatus);
            }

        });
    }

});

function activeTabApi() {

    $('#location').empty();
    $('#pagin').empty();
    $.ajax({

        dataType: "json",
        // headers: { "Content-Type": "application/json" },
        type: "GET",
        headers: { Authorization: localStorage.getItem('token') || '' },
        // url: 'http://13.59.91.130:8083/v1/user/1/property',
        url: newurl + 'property/pmcId/' + pmcId + '/active/true/isHide/false/host',
        success: function (result) {
            // console.log(JSON.stringify(result));

            var trHTML = '';
            $.each(result, function (i, item) {

                var str = item.propertyDesc;
                // console.log(JSON.stringify(str));
                var res = "";
                if (str == null) {
                }

                else if (str.length > 150) {
                    res = str.substring(0, 144);
                    res = res + "...";

                } else {
                    if (str != null) {
                        res = str + " ";

                    } else {
                        res = '';
                    }

                    // console.log("res="+res)selectedindex jquery

                }

                if (item.discPercent == null) {
                    item.discPercent = 0;
                }

                // var PriceDisplay = new Object();
                // PriceDisplay.basePrice = item.basePrice;
                // PriceDisplay.discPercent = item.discPercent;
                // PriceDisplay.minPrice = item.minPrice;
                // PriceDisplay.propertyId = item.propertyId;
                // PriceDisplay.unitId = item.unitId;

                // if (item.externalId == null) {
                //     PriceDisplay.isexternalId = 0;
                // }
                // else {
                //     if (item.externalId.length == 0) {
                //         PriceDisplay.isexternalId = 0;
                //     } else {
                //         PriceDisplay.isexternalId = 1;
                //     }
                // }


                // PriceDisplay = JSON.stringify(PriceDisplay);
                var discountedPrice = Math.round(item.discountedPrice)

                if (item.noOfBedroom == "999") {
                    item.noOfBedroom = "0";
                } else {
                    item.noOfBedroom = item.noOfBedroom;
                }

                var coverImage, basePrice, whimstayPrice;

                if (item.hostPropertyAttachment.length == 0) {
                    coverImage = '';
                } else {
                    if(item.hostPropertyAttachment[0].imageFullUrl == null){
                        coverImage = '';
                    }else{
                        var str = item.hostPropertyAttachment[0].imageFullUrl
                        coverImage = str.replace(" ", '%20');
                    }
                }
                if (item.propertyUnitCalendarRate == null) {
                    basePrice = 0;
                    whimstayPrice = 0;
                } else {
                    basePrice = item.propertyUnitCalendarRate.basePrice;
                    whimstayPrice = item.propertyUnitCalendarRate.discPrice;
                }
                // item.propertyAttachments.forEach(element => {
                //     if (element.isCoverImg == 1) {
                //         coverImage = element.fullFilePath;
                //     }
                // });

                // if (!coverImage) {
                //     if (item.propertyAttachments.length != 0) {
                //         coverImage = item.propertyAttachments[0].fullFilePath;
                //     } else {
                //         coverImage = " ";
                //     }
                // }

                if (item.property.maxNoGuest <= 1) {
                    guest = item.property.maxNoGuest + ' Guest';
                } else {
                    guest = item.property.maxNoGuest + ' Guests';
                }

                if (item.property.noOfBedroom <= 1) {
                    bedroom = item.property.noOfBedroom + ' Bedroom';
                } else {
                    bedroom = item.property.noOfBedroom + ' Bedrooms';
                }

                if (item.property.noOfBathroom <= 1) {
                    bathroom = item.property.noOfBathroom + ' Bathroom';
                } else {
                    bathroom = item.property.noOfBathroom + ' Bathrooms';
                }
                var address = item.property.addressline1 + ', ' + item.property.city + ', ' + item.property.state + ' ' + item.property.postalCode + ' ' + item.property.countryCode;

                var PriceDisplay = new Object();
                PriceDisplay.basePrice = basePrice;
                PriceDisplay.discPercent = item.property.discPer;
                PriceDisplay.minPrice = item.property.minPrice;
                PriceDisplay.pmcId = item.property.pmcId;
                var pmsUnitId = item.property.pmsUnitId;
                pmsUnitId = pmsUnitId.replace(" ", '%%%&&&');
                PriceDisplay.pmsUnitId =pmsUnitId;

                if (item.property.pulledProperty == true) {
                    PriceDisplay.pulledProperty = 1;
                }
                else {
                    PriceDisplay.pulledProperty = 0;
                }

                PriceDisplay = JSON.stringify(PriceDisplay);

                if (item.property.propertyName == undefined || item.property.propertyName == "") {
                    // add href="#" id=' + PriceDisplay + ' onclick="priceEdit(this)" data-toggle="modal" data-target="#myModal-Price" to anchor tag
                    trHTML +=
                        '<div id="tabpublished" class="tab-pane fade in active padding-20px-top tabpublished"><div class="panel panel-default"><div class="panel-heading"><h6> Untitled-Property </h6></div><div class="panel-body"><div class="row"><div class="col-sm-12"><p class="no-margin-bottom"><strong>' + address + '</strong></p></div><div class="col-sm-3"><img src=' + coverImage + '></div><div class="col-sm-3"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-users"></i> ' + guest + '</a><br/><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-bed"></i> ' + bedroom + '</a><br/><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-bath"></i> ' + bathroom + '</a></div>' +
                        '<div class="col-md-6"> <strong>Current Price:</strong> $' + basePrice + ' <br/><strong>Discount:</strong> ' + item.property.discPer + '%<br/><strong>Whimstay Price:</strong> $' + whimstayPrice + '<br/><a href="#" id=' + PriceDisplay + ' onclick="priceEdit(this)" data-toggle="modal" data-target="#myModal-Price"><i class="fas fa-edit"></i> Edit Price</a></a></div></div></div>' +
                        '<div class="panel-footer"><div class="row"><div class="col-md-8">   <a href="#"   id="' + item.property.pmsUnitId + '"  ><i class="fas fa-calendar-alt"></i> Calendar</a>  <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-edit"></i> Edit</a></span> <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewPreviewApi(this)"<i class="fas fa-sticky-note"></i> Preview</a></span><span class="margin-20px-right"><a><input type="checkbox" id="' + item.property.pmsUnitId + '" onclick="PreviewDeactiveApi(this)"> Hide </a></span></div> <div class="col-md-4 pull-right">' +
                        '</div> </div> </div></div></div></div>'

                } else {

                    trHTML +=
                        '<div id="tabpublished" class="tab-pane fade in active padding-20px-top tabpublished"><div class="panel panel-default"><div class="panel-heading"><h6>' + item.property.propertyName + '</h6></div><div class="panel-body"><div class="row"><div class="col-sm-12"><p class="no-margin-bottom"><strong>' + address + '</strong></p></div><div class="col-sm-3"><img src=' + coverImage + '></div><div class="col-sm-3"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-users"></i> ' + guest + '</a><br/><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-bed"></i> ' + bedroom + '</a><br/><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-bath"></i> ' + bathroom + '</a></div>' +
                        '<div class="col-md-6"> <strong>Current Price:</strong> $' + basePrice + ' <br/><strong>Discount:</strong> ' + item.property.discPer + '%<br/><strong>Whimstay Price:</strong> $' + whimstayPrice + '<br/><a href="#" id=' + PriceDisplay + ' onclick="priceEdit(this)" data-toggle="modal" data-target="#myModal-Price"><i class="fas fa-edit"></i> Edit Price</a></a></div></div></div>' +
                        '<div class="panel-footer"><div class="row"><div class="col-md-8">   <span class="margin-20px-right"> <a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)"  <i class="fas fa-edit"></i> Edit</a></span> <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewPreviewApi(this)"<i class="fas fa-sticky-note"></i> Preview</a></span><span class="margin-20px-right"> <a href="#"   id="' + item.property.pmsUnitId + '"  ><i class="fas fa-calendar-alt"></i> Calendar</a> </span> <span class="margin-20px-right"> <a><input type="checkbox" id="' + item.property.pmsUnitId + '" onclick="PreviewDeactiveApi(this)"> Hide </a></span></div> <div class="col-md-4 pull-right">' +
                        '</div> </div> </div></div></div></div>'
                }
            });
            pageSize = 10;
            var pageCount = $(trHTML).length / pageSize;
            // for (var i = 0; i < pageCount; i++) {

            //     $("#pagin").append('<li><a href="#">' + (i + 1) + '</a></li> ');
            // }
            $("#pagin").empty();
            if (pageCount > 1) {

                for (var i = 0; i < pageCount; i++) {

                    $("#pagin").append('<li><a href="#">' + (i + 1) + '</a></li> ');

                    // $("#pagin .current").append('');

                }
            }



            $("#pagin li").first().find("a").addClass("current")
            showPage = function (page) {
                jQuery('#location').html('');
                $("line-content").hide();
                $(trHTML).each(function (n) {

                    if (n >= pageSize * (page - 1) && n < pageSize * page)
                        $('#location').append(this);
                    $(this).show();
                });
            }
            showPage(1);
            $("#pagin li a").click(function () {
                $("#pagin li a").removeClass("current");
                $(this).addClass("current");
                showPage(parseInt($(this).text()))
            });
            $("table").addClass("table");
            displayTemplates();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('update Stock error: ' + textStatus);
        }

    });

}

function deactiveTabApi() {
    $('#location').empty();
    $('#pagin').empty();

    $.ajax({

        dataType: "json",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        type: "GET",
        // url: 'http://13.59.91.130:8083/v1/user/1/property',
        url: newurl + 'property/pmcId/' + pmcId + '/active/false/isHide/true/host',
        success: function (result) {
            // console.log(result);
            var trHTML = '';
            $.each(result, function (i, item) {

                var str = item.propertyDesc;
                // console.log(JSON.stringify(str));
                var res = "";
                if (str == null) {
                }

                else if (str.length > 150) {
                    res = str.substring(0, 144);
                    res = res + "...";

                } else {
                    if (str != null) {
                        res = str + " ";

                    } else {
                        res = '';
                    }

                    // console.log("res="+res)

                }

                if (item.property.discPer == null) {
                    item.property.discPer = 0;
                }

                var discountedPrice = Math.round(item.discountedPrice)

                if (item.noOfBedroom == "999") {
                    item.noOfBedroom = "0";
                } else {
                    item.noOfBedroom = item.noOfBedroom;
                }


                var coverImage;
                var coverImage, basePrice, whimstayPrice;

                if (item.hostPropertyAttachment.length == 0) {
                    coverImage = '';
                } else {
                    if(item.hostPropertyAttachment[0].imageFullUrl == null){
                        coverImage = '';
                    }else{
                        var str = item.hostPropertyAttachment[0].imageFullUrl
                        coverImage = str.replace(" ", '%20');
                    }
                }
                if (item.propertyUnitCalendarRate == null) {
                    basePrice = 0;
                    whimstayPrice = 0;
                } else {
                    basePrice = item.propertyUnitCalendarRate.basePrice;
                    whimstayPrice = item.propertyUnitCalendarRate.discPrice;
                }
                // item.propertyAttachments.forEach(element => {
                //     if (element.isCoverImg == 1) {
                //         coverImage = element.fullFilePath;
                //     }
                // });

                // if (!coverImage) {
                //     if (item.propertyAttachments.length != 0) {
                //         coverImage = item.propertyAttachments[0].fullFilePath;
                //     } else {
                //         coverImage = "";
                //     }
                // }


                if (item.property.maxNoGuest <= 1) {
                    guest = item.property.maxNoGuest + ' Guest';
                } else {
                    guest = item.property.maxNoGuest + ' Guests';
                }

                if (item.property.noOfBedroom <= 1) {
                    bedroom = item.property.noOfBedroom + ' Bedroom';
                } else {
                    bedroom = item.property.noOfBedroom + ' Bedrooms';
                }

                if (item.property.noOfBathroom <= 1) {
                    bathroom = item.property.noOfBathroom + ' Bathroom';
                } else {
                    bathroom = item.property.noOfBathroom + ' Bathrooms';
                }
                var address1;
                if (item.property.addressline1 == null) {
                    address1 = '';
                } else {
                    address1 = item.property.addressline1 + ', ';
                }

                var address = address1 + item.property.city + ', ' + item.property.state + ' ' + item.property.postalCode + ' ' + item.property.countryCode

                var PriceDisplay = new Object();
                PriceDisplay.basePrice = basePrice;
                PriceDisplay.discPercent = item.property.discPer;
                PriceDisplay.minPrice = item.property.minPrice;
                PriceDisplay.pmcId = item.property.pmcId;
                var pmsUnitId = item.property.pmsUnitId;
                pmsUnitId = pmsUnitId.replace(" ", '%%%&&&');
                PriceDisplay.pmsUnitId =pmsUnitId;

                if (item.property.pulledProperty == true) {
                    PriceDisplay.pulledProperty = 1;
                }
                else {
                    PriceDisplay.pulledProperty = 0;
                }

                PriceDisplay = JSON.stringify(PriceDisplay);

                if (item.property.propertyName == undefined || item.property.propertyName == "") {
                    trHTML +=
                        '<div class="padding-20px-top"><div class="panel panel-default"><div class="panel-heading"><h6> Untitled-Property </h6></div><div class="panel-body"><div class="row"><div class="col-sm-12"><p class="no-margin-bottom"><strong>' + address + '</strong></p></div><div class="col-sm-3"><img src=' + coverImage + ' ></div><div class="col-sm-3"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-users"></i> ' + guest + '</a><br/><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)"<i class="fas fa-bed"></i> ' + bedroom + '</a><br/><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-bath"></i> ' + bathroom + '</a></div>' +
                        '<div class="col-md-6"> <strong>Current Price:</strong> $' + basePrice + ' <br/><strong>Discount:</strong> ' + item.property.discPer + '%<br/><strong>Whimstay Price:</strong> $' + whimstayPrice + '<br/><a href="#" id=' + PriceDisplay + ' onclick="priceEdit(this)" data-toggle="modal" data-target="#myModal-Price"><i class="fas fa-edit"></i> Edit Price</a></a></div></div></div>' +
                        '<div class="panel-footer"><div class="row"><div class="col-md-8">    <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)"<i class="fas fa-edit"></i> Edit</a></span>     <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewPreviewApi(this)"<i class="fas fa-sticky-note"></i> Preview</a></span> <span class="margin-20px-right"> <a href="#"   id="' + item.property.pmsUnitId + '"  ><i class="fas fa-calendar-alt"></i> Calendar</a> </span><span class="margin-20px-right"><a><input type="checkbox" checked id="' + item.property.pmsUnitId + '" onclick="PreviewActiveApi(this)"> Hide</a></span></div><div class="col-md-4 pull-right">' +
                        '</div></div> </div></div></div></div>'

                } else {

                    trHTML +=
                        '<div class="padding-20px-top"><div class="panel panel-default"><div class="panel-heading"><h6>' + item.property.propertyName + '</h6></div><div class="panel-body"><div class="row"><div class="col-sm-12"><p class="no-margin-bottom"><strong>' + address + '</strong></p></div><div class="col-sm-3"><img src=' + coverImage + ' ></div><div class="col-sm-3"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)"  <i class="fas fa-users"></i> ' + guest + '</a><br/><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-bed"></i> ' + bedroom + '</a><br/><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-bath"></i> ' + bathroom + '</a></div>' +
                        '<div class="col-md-6"> <strong>Current Price:</strong> $' + basePrice + ' <br/><strong>Discount:</strong> ' + item.property.discPer + '%<br/><strong>Whimstay Price:</strong> $' + whimstayPrice + '<br/><a href="#" id=' + PriceDisplay + ' onclick="priceEdit(this)" data-toggle="modal" data-target="#myModal-Price"><i class="fas fa-edit"></i> Edit Price</a></a></div></div></div>' +
                        '<div class="panel-footer"><div class="row"><div class="col-md-8">    <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)"<i class="fas fa-edit"></i> Edit</a></span>     <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewPreviewApi(this)"<i class="fas fa-sticky-note"></i> Preview</a></span><span class="margin-20px-right"> <a href="#"   id="' + item.property.pmsUnitId + '"  ><i class="fas fa-calendar-alt"></i> Calendar</a> </span><span class="margin-20px-right"><a><input type="checkbox" checked id="' + item.property.pmsUnitId + '" onclick="PreviewActiveApi(this)"> Hide</a></span></div><div class="col-md-4 pull-right">' +
                        '</div></div> </div></div></div></div>'
                }



            });
            pageSize = 10;
            var pageCount = $(trHTML).length / pageSize;
            $("#pagin").empty();
            if (pageCount > 1) {
                for (var i = 0; i < pageCount; i++) {

                    $("#pagin").append('<li><a href="#">' + (i + 1) + '</a></li> ');
                }
            }
            $("#pagin li").first().find("a").addClass("current")
            showPage = function (page) {
                jQuery('#location').html('');
                $("line-content").hide();
                $(trHTML).each(function (n) {
                    if (n >= pageSize * (page - 1) && n < pageSize * page)
                        $('#location').append(this);
                    $(this).show();
                });
            }
            showPage(1);
            $("#pagin li a").click(function () {
                $("#pagin li a").removeClass("current");
                $(this).addClass("current");
                showPage(parseInt($(this).text()))
            });
            $("table").addClass("table");
            displayTemplates();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('update Stock error: ' + textStatus);
        }

    });

}

function inProgressTabApi() {
    $('#location').empty();
    $('#pagin').empty();

    $.ajax({

        dataType: "json",
        // headers: { "Content-Type": "application/json" },
        type: "GET",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },

        url: newurl + 'property/pmcId/' + pmcId + '/active/false/isHide/false/host',
        success: function (result) {
            // console.log(JSON.stringify(result));

            var trHTML = '';
            $.each(result, function (i, item) {

                var str = item.propertyDesc;
                // console.log(JSON.stringify(str));
                var res = "";
                if (str == null) {
                }

                else if (str.length > 150) {
                    res = str.substring(0, 144);
                    res = res + "...";

                } else {
                    if (str != null) {
                        res = str + " ";

                    } else {
                        res = '';
                    }

                    // console.log("res="+res)

                }
                if (item.property.discPer == null) {
                    item.property.discPer = 0;
                }

                var discountedPrice = Math.round(item.discountedPrice)

                if (item.noOfBedroom == "999") {
                    item.noOfBedroom = "0";
                } else {
                    item.noOfBedroom = item.noOfBedroom;
                }

                var coverImage, basePrice, whimstayPrice;

                if (item.hostPropertyAttachment.length == 0) {
                    coverImage = '';
                } else {
                    coverImage = item.hostPropertyAttachment[0].imageFullUrl
                    // coverImage = str.replace(" ", '%20');
                }
                if (item.propertyUnitCalendarRate == null) {
                    basePrice = 0;
                    whimstayPrice = 0;
                } else {
                    basePrice = item.propertyUnitCalendarRate.basePrice;
                    whimstayPrice = item.propertyUnitCalendarRate.discPrice;
                }


                // item.propertyAttachments.forEach(element => {
                //     // convertedStartDate.push(moment(element.startDate).format("YYYY,MM,DD"));
                //     if (element.isCoverImg == 1) {
                //         coverImage = element.fullFilePath;
                //     }

                // });

                // if (!coverImage) {

                //     if (item.propertyAttachments.length != 0) {
                //         coverImage = item.propertyAttachments[0].fullFilePath;
                //     } else {
                //         coverImage = "";
                //     }
                // }

                if (item.property.maxNoGuest <= 1) {
                    guest = item.property.maxNoGuest + ' Guest';
                } else {
                    guest = item.property.maxNoGuest + ' Guests';
                }

                if (item.property.noOfBedroom <= 1) {
                    bedroom = item.property.noOfBedroom + ' Bedroom';
                } else {
                    bedroom = item.property.noOfBedroom + ' Bedrooms';
                }

                if (item.property.noOfBathroom <= 1) {
                    bathroom = item.property.noOfBathroom + ' Bathroom';
                } else {
                    bathroom = item.property.noOfBathroom + ' Bathrooms';
                }
                var address1;
                if (item.property.addressline1 == null) {
                    address1 = '';
                } else {
                    address1 = item.property.addressline1 + ', ';
                }

                var address = address1 + item.property.city + ', ' + item.property.state + ' ' + item.property.postalCode + ' ' + item.property.countryCode

                var PriceDisplay = new Object();
                PriceDisplay.basePrice = basePrice;
                PriceDisplay.discPercent = item.property.discPer;
                PriceDisplay.minPrice = item.property.minPrice;
                PriceDisplay.pmcId = item.property.pmcId;
                var pmsUnit_Id = item.property.pmsUnitId;
                pmsUnit_Id = pmsUnit_Id.replace(" ", '%%%&&&');
                PriceDisplay.pmsUnitId =pmsUnit_Id;


                if (item.property.pulledProperty == true) {
                    PriceDisplay.pulledProperty = 1;
                }
                else {
                    PriceDisplay.pulledProperty = 0;
                }
                //  console.info(PriceDisplay);

                PriceDisplay = JSON.stringify(PriceDisplay);

                if (item.property.propertyName == undefined || item.property.propertyName == "") {
                    trHTML +=
                        '<div class="padding-20px-top"><div class="panel panel-default"><div class="panel-heading"><h6> Untitled-Property </h6></div><div class="panel-body"><div class="row"><div class="col-sm-12"><p class="no-margin-bottom"><strong>' + address + '</strong></p></div><div class="col-sm-3"><img src="' + coverImage + '"></div><div class="col-sm-3"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-users"></i> ' + guest + '</a><br/><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-bed"></i> ' + bedroom + '</a><br/><a href="#" id=' + item.property.pmsUnitId + ' onclick="PreviewEditApi(this)" <i class="fas fa-bath"></i> ' + bathroom + '</a></div>' +
                        '<div class="col-md-6"> <strong>Current Price:</strong> $' + basePrice + ' <br/><strong>Discount:</strong><span id="discount' + item.property.pmsUnitId + '">' + item.property.discPer + '</span>%<br/><strong>Whimstay Price:</strong>$' + whimstayPrice + '<br/><a href="#" id=' + PriceDisplay + ' onclick="priceEdit(this)" data-toggle="modal" data-target="#myModal-Price"><i class="fas fa-edit"></i> Edit Price</a></a></div></div></div>' +
                        '<div class="panel-footer"><div class="row"><div class="col-md-8">    <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)"<i class="fas fa-edit"></i> Edit</a></span>     <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewPreviewApi(this)"<i class="fas fa-sticky-note"></i> Preview</a></span> <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PublishApi(this)"<i class="fas fa-upload"></i> Publish</a></span> <span class="margin-20px-right"> <a href="#"   id="' + item.property.pmsUnitId + '"  ><i class="fas fa-calendar-alt"></i> Calendar</a> </span>   </div> <div class="col-md-4 pull-right">' +
                        '</div></div> </div></div></div></div>'
                } else {
                    trHTML +=
                        '<div class="padding-20px-top"><div class="panel panel-default"><div class="panel-heading"><h6>' + item.property.propertyName + '</h6></div><div class="panel-body"><div class="row"><div class="col-sm-12"><p class="no-margin-bottom"><strong>' + address + '</strong></p></div><div class="col-sm-3"><img src="' + coverImage + '"></div><div class="col-sm-3"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-users"></i> ' + guest + '</a><br/><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)" <i class="fas fa-bed"></i> ' + bedroom + '</a><br/><a href="#" id=' + item.property.pmsUnitId + ' onclick="PreviewEditApi(this)" <i class="fas fa-bath"></i> ' + bathroom + '</a></div>' +
                        '<div class="col-md-6"> <strong>Current Price:</strong>  $' + basePrice + '<br/><strong>Discount:</strong><span id="discount' + item.property.pmsUnitId + '">' + item.property.discPer + '</span>%<br/><strong>Whimstay Price:</strong> $' + whimstayPrice + '<br/><a href="#" id=' + PriceDisplay + ' onclick="priceEdit(this)" data-toggle="modal" data-target="#myModal-Price"><i class="fas fa-edit"></i> Edit Price</a></a></div></div></div>' +
                        '<div class="panel-footer"><div class="row"><div class="col-md-8">    <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewEditApi(this)"<i class="fas fa-edit"></i> Edit</a></span>     <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PreviewPreviewApi(this)"<i class="fas fa-sticky-note"></i> Preview</a></span> <span class="margin-20px-right"><a href="#" id="' + item.property.pmsUnitId + '" onclick="PublishApi(this)"<i class="fas fa-upload"></i> Publish</a></span>  <span class="margin-20px-right"> <a href="#"   id="' + item.property.pmsUnitId + '"  ><i class="fas fa-calendar-alt"></i> Calendar</a> </span>   </div> <div class="col-md-4 pull-right">' +
                        '</div></div> </div></div></div></div>'

                }

            });
            pageSize = 10;
            var pageCount = $(trHTML).length / pageSize;
            $("#pagin").empty();
            if (pageCount > 1) {
                for (var i = 0; i < pageCount; i++) {

                    $("#pagin").append('<li><a href="#">' + (i + 1) + '</a></li> ');
                }
            }

            $("#pagin li").first().find("a").addClass("current")
            showPage = function (page) {
                jQuery('#location').html('');
                $("line-content").hide();
                $(trHTML).each(function (n) {
                    if (n >= pageSize * (page - 1) && n < pageSize * page)
                        $('#location').append(this);
                    $(this).show();
                });
            }
            showPage(1);
            $("#pagin li a").click(function () {
                $("#pagin li a").removeClass("current");
                $(this).addClass("current");
                showPage(parseInt($(this).text()))
            });
            $("table").addClass("table");
            displayTemplates();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('update Stock error: ' + textStatus); 
        }

    });

}

function activeEditApi(obj) {
    //alert(obj.id);
    // alert("activeEditApi");
    var iRow = 0;
    $('#location').empty();
    $('#pagin').empty();
    $.ajax({
        url: newurl + 'property/user/0/pmcId/' + pmcId + '/pmsUnitId/' + obj.id,
        type: 'GET',
        dataType: "json",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (result, textStatus, xhr) {
            console.log(JSON.stringify(result));
            sessionStorage.setItem("pmsUnitId", result.property.pmsUnitId);
            //console.log(JSON.stringify(result.propertyHostUnit.propertyAttachments));
            // sessionStorage.setItem("externalId", result.externalProperty);
            // sessionStorage.setItem("unitId", result.propertyHostUnit.unitId);
            // sessionStorage.setItem("myMainKey", result.property.addressline1);
            // sessionStorage.setItem("route", result.property.addressFull);
            // sessionStorage.setItem("city", result.property.city);
            // sessionStorage.setItem("state", result.property.state);
            // sessionStorage.setItem("country", result.property.countryCode);
            // sessionStorage.setItem("postalCode", result.property.postalCode);
            // sessionStorage.setItem("latitude", result.property.latitude);
            // sessionStorage.setItem("longitude", result.property.longitude);
            // sessionStorage.setItem("propertyTypeId", result.property.propertyTypeId);
            // sessionStorage.setItem("propertySubTypeId", result.property.propertySubTypeId);
            // sessionStorage.setItem("optradio", result.pproperty.propertyAccId);
            // sessionStorage.setItem("noBeds", result.property.maxNoGuest);
            // sessionStorage.setItem("my_select", result.property.noOfBedroom);
            // sessionStorage.setItem("noBed", result.property.noOfBeds);
            // sessionStorage.setItem("noBaths", result.property.noOfBathroom);
            // sessionStorage.setItem("propertyName", result.property.propertyName);
            // sessionStorage.setItem("propertyDesc", result.property.propertyDesc);
            // sessionStorage.setItem("pmsUnitId", result.property.pmsUnitId);
            // // sessionStorage.setItem("active", result.active);
            // // sessionStorage.setItem("isHide", result.isHide);


            // //    Code change //
            // var bedroomIdarr = [];
            // var bedroomIdarrsort = [];
            // var bedroomIdarrBfrSort = [];
            // var bedroomAmenitiesarr = [];
            // var bedCntAmenitiesarr = [];
            // var iunitBedroomsCnt = result.propertyHostUnit.unitBedRooms.length;
            // var ir = 0;
            // var k = 0;
            // var chkComm = "N";
            // var BedroomType;

            // if (result.propertyHostUnit.unitBedRooms.length == 0) {
            //     bedroomIdarr[k] = 0;
            //     bedroomAmenitiesarr[k] = "6,8,9,";
            //     bedCntAmenitiesarr[k] = "6 : 0,8 : 0,9 : 0,";

            //     k = k + 1;
            //     for (var iCheckCount = 0; iCheckCount < result.propertyHostUnit.noOfBedroom; iCheckCount++) {
            //         bedroomIdarr[k] = 0;
            //         bedamen = "1,2,3,4,";
            //         bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
            //         bedroomAmenitiesarr[k] = bedamen;
            //         bedCntAmenitiesarr[k] = bedCntamen;
            //         k = k + 1;
            //     }

            //     sessionStorage.setItem("BedType", 2);

            // }
            // else {
            //     if (result.propertyHostUnit.unitBedRooms.length > 0) {
            //         for (var iCheckCount = 0; iCheckCount < result.propertyHostUnit.unitBedRooms.length; iCheckCount++) {
            //             var typeofbed0 = result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomType.bedroomTypeId;
            //             BedroomType = typeofbed0;
            //             if (typeofbed0 == "2") {
            //                 chkComm = "Y";
            //                 var ibedroomId = result.propertyHostUnit.unitBedRooms[iCheckCount].bedroomId;
            //                 bedroomIdarr[k] = ibedroomId;
            //                 var bedamen = "";
            //                 var BedAmenitiesId = "";
            //                 var bedCntamen = "";
            //                 var flag6 = false;
            //                 var flag8 = false;
            //                 var flag9 = false;
            //                 // var flag4=false;

            //                 var ibedroomamenitiesCnt = result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities.length;
            //                 if (ibedroomamenitiesCnt > 0) {
            //                     for (j = 0; j < ibedroomamenitiesCnt; j++) {
            //                         // alert("Amminites"+result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId);
            //                         bedamenCnt = result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].bedCount;
            //                         bedCntamen = bedCntamen + result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + " : " + bedamenCnt + ",";
            //                         bedamen = bedamen + result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + ",";

            //                         if (result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "6") {
            //                             //alert("Single");
            //                             flag6 = true;
            //                         }
            //                         if (result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "8") {
            //                             //alert("Double");
            //                             flag8 = true;
            //                         }
            //                         if (result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "9") {
            //                             //alert("flag 3");
            //                             flag9 = true;
            //                         }

            //                     }
            //                     if (flag9 == false) {
            //                         bedamen = "9," + bedamen;
            //                         bedCntamen = "9 : 0," + bedCntamen;
            //                     }
            //                     if (flag8 == false) {
            //                         bedamen = "8," + bedamen;
            //                         bedCntamen = "8 : 0," + bedCntamen;
            //                     }
            //                     if (flag6 == false) {
            //                         bedamen = "6," + bedamen;
            //                         bedCntamen = "6 : 0," + bedCntamen;
            //                     }


            //                 }
            //                 else {
            //                     bedroomAmenitiesarr[k] = "6,8,9,";
            //                     bedCntAmenitiesarr[k] = "6 : 0,8 : 0,9 : 0,";
            //                 }

            //                 bedroomAmenitiesarr[k] = bedamen;
            //                 bedCntAmenitiesarr[k] = bedCntamen;
            //                 k = k + 1;
            //             }
            //         }
            //         if (chkComm = "N") {
            //             bedroomIdarr[k] = null;
            //             bedroomAmenitiesarr[k] = "6,8,9,";
            //             bedCntAmenitiesarr[k] = "6 : 0,8 : 0,9 : 0,";
            //             ir = 1;
            //             k = 1;
            //             BedroomType = "2";
            //         }

            //     }
            //     else {
            //         ir = 0;
            //     }

            //     var v = 0;

            //     var itotBedCnt = result.propertyHostUnit.noOfBedroom;

            //     for (i = 0; i < iunitBedroomsCnt; i++) {

            //         var typeofbed0 = result.propertyHostUnit.unitBedRooms[i].propertyBedroomType.bedroomTypeId;
            //         if (typeofbed0 == "1") {
            //             var ibedroomId = result.propertyHostUnit.unitBedRooms[i].bedroomId;
            //             bedroomIdarrBfrSort[v] = ibedroomId;
            //             v = v + 1;
            //         }
            //     }

            //     bedroomIdarrsort = bedroomIdarrBfrSort.sort();

            //     for (b = 0; b < bedroomIdarrsort.length; b++) {
            //         var ibedroomId = bedroomIdarrsort[b];

            //         for (i = 0; i < iunitBedroomsCnt; i++) {
            //             var typeofbed0 = result.propertyHostUnit.unitBedRooms[i].propertyBedroomType.bedroomTypeId;
            //             if (typeofbed0 == "1" && ibedroomId == result.propertyHostUnit.unitBedRooms[i].bedroomId) {

            //                 var pos = 0;
            //                 var poslen = 0;
            //                 if (result.propertyHostUnit.unitBedRooms[i].bedroomName.indexOf('Bedroom ') == 0) {
            //                     pos = result.propertyHostUnit.unitBedRooms[i].bedroomName.indexOf('Bedroom ');
            //                     poslen = 8;
            //                 }
            //                 else {
            //                     pos = result.propertyHostUnit.unitBedRooms[i].bedroomName.indexOf('Bedroom');
            //                     poslen = 7;
            //                 }
            //                 var kt = result.propertyHostUnit.unitBedRooms[i].bedroomName.substring(pos + poslen, result.propertyHostUnit.unitBedRooms[i].bedroomName.length);
            //                 var kt1 = parseInt(kt);
            //                 if (kt1 == k) {
            //                     bedroomIdarr[k] = ibedroomId;


            //                     var bedamen = "";
            //                     var BedAmenitiesId = "";
            //                     var bedCntamen = "";

            //                     var flag1 = false;
            //                     var flag2 = false;
            //                     var flag3 = false;
            //                     var flag4 = false;

            //                     var ibedroomamenitiesCnt = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities.length;
            //                     if (ibedroomamenitiesCnt > 0) {
            //                         for (j = 0; j < ibedroomamenitiesCnt; j++) {
            //                             // alert("Amminiies "+result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId);
            //                             bedamenCnt = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].bedCount;
            //                             bedCntamen = bedCntamen + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + " : " + bedamenCnt + ",";
            //                             bedamen = bedamen + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + ",";
            //                             if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "1") {
            //                                 // alert("Single");
            //                                 flag1 = true;
            //                             }
            //                             if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "2") {
            //                                 // alert("Double");
            //                                 flag2 = true;
            //                             }
            //                             if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "3") {
            //                                 // alert("flag 3");
            //                                 flag3 = true;
            //                             }
            //                             if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "4") {
            //                                 // alert("falg 4");
            //                                 flag4 = true;
            //                             }

            //                         }
            //                         if (flag4 == false) {
            //                             bedamen = "4," + bedamen;
            //                             bedCntamen = "4 : 0," + bedCntamen;
            //                         }
            //                         if (flag3 == false) {
            //                             bedamen = "3," + bedamen;
            //                             bedCntamen = "3 : 0," + bedCntamen;
            //                         }
            //                         if (flag2 == false) {
            //                             bedamen = "2," + bedamen;
            //                             bedCntamen = "2 : 0," + bedCntamen;
            //                         }
            //                         if (flag1 == false) {
            //                             bedamen = "1," + bedamen;
            //                             bedCntamen = "1 : 0," + bedCntamen;
            //                         }
            //                     }
            //                     else {
            //                         bedamen = "1,2,3,4,";
            //                         bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
            //                     }

            //                     bedroomAmenitiesarr[k] = bedamen;
            //                     bedCntAmenitiesarr[k] = bedCntamen;
            //                     k = k + 1;
            //                     break;
            //                 }
            //                 else {
            //                     for (var l = k; l <= kt1; l++) {
            //                         if (l == kt1) {
            //                             bedroomIdarr[l] = ibedroomId;


            //                             var bedamen = "";
            //                             var BedAmenitiesId = "";
            //                             var bedCntamen = "";

            //                             var flag1 = false;
            //                             var flag2 = false;
            //                             var flag3 = false;
            //                             var flag4 = false;

            //                             var ibedroomamenitiesCnt = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities.length;
            //                             if (ibedroomamenitiesCnt > 0) {
            //                                 for (j = 0; j < ibedroomamenitiesCnt; j++) {
            //                                     // alert("am 3"+result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId);
            //                                     bedamenCnt = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].bedCount;
            //                                     bedCntamen = bedCntamen + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + " : " + bedamenCnt + ",";
            //                                     bedamen = bedamen + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + ",";


            //                                     if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "1") {
            //                                         // alert("Single");
            //                                         flag1 = true;
            //                                     }
            //                                     if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "2") {
            //                                         // alert("Single");
            //                                         flag2 = true;
            //                                     }
            //                                     if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "3") {
            //                                         // alert("Single");
            //                                         flag3 = true;
            //                                     }
            //                                     if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "4") {
            //                                         //alert("Flag 4");
            //                                         flag4 = true;
            //                                     }

            //                                 }



            //                                 if (flag4 == false) {
            //                                     bedamen = "4," + bedamen;
            //                                     bedCntamen = "4 : 0," + bedCntamen;
            //                                 }
            //                                 if (flag3 == false) {
            //                                     bedamen = "3," + bedamen;
            //                                     bedCntamen = "3 : 0," + bedCntamen;
            //                                 }
            //                                 if (flag2 == false) {
            //                                     bedamen = "2," + bedamen;
            //                                     bedCntamen = "2 : 0," + bedCntamen;
            //                                 }
            //                                 if (flag1 == false) {
            //                                     bedamen = "1," + bedamen;
            //                                     bedCntamen = "1 : 0," + bedCntamen;
            //                                 }

            //                             }
            //                             else {
            //                                 bedamen = "1,2,3,4,";
            //                                 bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
            //                             }

            //                             bedroomAmenitiesarr[l] = bedamen;
            //                             bedCntAmenitiesarr[l] = bedCntamen;
            //                             l = l + 1;
            //                             k = kt1 + 1;
            //                             break;
            //                         }
            //                         else {
            //                             bedroomIdarr[l] = 0;
            //                             // bedroomNamearr[l] = "Bedroom "+l;
            //                             bedamen = "1,2,3,4,";
            //                             bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
            //                             bedroomAmenitiesarr[l] = bedamen;
            //                             bedCntAmenitiesarr[l] = bedCntamen;
            //                             k = l + 1;
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }

            //     if (BedroomType != undefined) {
            //         sessionStorage.setItem("BedType", BedroomType);
            //     }
            // }

            // if (bedroomIdarrsort.length < result.propertyHostUnit.noOfBedroom) {
            //     for (var iCheckCount = bedroomIdarrsort.length; iCheckCount < result.propertyHostUnit.noOfBedroom; iCheckCount++) {
            //         bedroomIdarr[k] = 0;
            //         bedamen = "1,2,3,4,";
            //         bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
            //         bedroomAmenitiesarr[k] = bedamen;
            //         bedCntAmenitiesarr[k] = bedCntamen;
            //         k = k + 1;
            //     }
            // }


            // sessionStorage.setItem("bedroomAmenities", JSON.stringify(bedroomAmenitiesarr));
            // sessionStorage.setItem("bedCntAmenitiesarr", JSON.stringify(bedCntAmenitiesarr));
            // sessionStorage.setItem("bedroomID", JSON.stringify(bedroomIdarr));


            // var iunitBathroomsCnt = result.propertyHostUnit.unitBathrooms.length;
            // var bathroomIdarr = [];
            // var bathroomIdarrsort = [];
            // var bathroomIdarrbfrsort = [];
            // var bathroomAmenitiesarr = [];
            // var bathroomTypeID = [];

            // var v = 0;
            // for (i = 0; i < iunitBathroomsCnt; i++) {

            //     var ibathroomId = result.propertyHostUnit.unitBathrooms[i].bathroomId;
            //     bathroomIdarrbfrsort[v] = ibathroomId;
            //     v = v + 1;
            // }

            // bathroomIdarrsort = bathroomIdarrbfrsort.sort();
            // k = 0;
            // for (b = 0; b < bathroomIdarrsort.length; b++) {
            //     var ibathroomId = bathroomIdarrsort[b];

            //     for (i = 0; i < iunitBathroomsCnt; i++) {
            //         if (ibathroomId == result.propertyHostUnit.unitBathrooms[i].bathroomId) {
            //             // var ibathroomId = result.propertyHostUnit.unitBathrooms[i].bathroomId;
            //             bathroomIdarr[k] = ibathroomId;
            //             bathroomTypeID[k] = (result.propertyHostUnit.unitBathrooms[i].propertyBathroomType.bathroomTypeId);
            //             var bathamen = "";
            //             var ibathroomamenitiesCnt = result.propertyHostUnit.unitBathrooms[i].propertyBathroomWiseAminities.length;
            //             for (j = 0; j < ibathroomamenitiesCnt; j++) {
            //                 bathamen = bathamen + result.propertyHostUnit.unitBathrooms[i].propertyBathroomWiseAminities[j].propertyAmenity.amenitiesId + ",";
            //             }
            //             bathroomAmenitiesarr[k] = bathamen;
            //             k = k + 1;
            //             break;
            //         }
            //     }
            // }
            // sessionStorage.setItem("bathroomAmenities", JSON.stringify(bathroomAmenitiesarr));
            // sessionStorage.setItem("bathroomID", JSON.stringify(bathroomIdarr));
            // sessionStorage.setItem("bathroomTypeID", JSON.stringify(bathroomTypeID));



            // if (result.propertyHostUnit.propertyFeaturesHosts.length > 0) {

            //     for (var l = 0; l <= 40; l++) {
            //         sessionStorage.setItem("Feature_" + (l), "0");
            //     }
            //     for (var i = 0; i < result.propertyHostUnit.propertyFeaturesHosts.length; i++) {
            //         var x = parseInt(result.propertyHostUnit.propertyFeaturesHosts[i].propertyFeatures.propertyFeatureId);
            //         sessionStorage.setItem("Feature_" + (x), "1");
            //     }

            // }

            // var iYogiQueAns = result.propertyHostUnit.yogiAnswers.length;

            // var YogiQuesAnsArr = [];
            // var QuesAnsArr = [];

            // for (i = 0; i < iYogiQueAns; i++) {

            //     var sansDesc = result.propertyHostUnit.yogiAnswers[i].ansDesc;
            //     YogiQuesAnsArr[i] = sansDesc;
            //     QuesAnsArr[i] = result.propertyHostUnit.yogiAnswers[i].yogiQuestion.queId;

            // }

            // sessionStorage.setItem("YogiQuesAnsArr", JSON.stringify(YogiQuesAnsArr));
            // sessionStorage.setItem("QuesAnsArr", JSON.stringify(QuesAnsArr));

            // var iUnitCalender = (result.propertyHostUnit.unitCalenderRate != null) ? 1 : 0;
            // if (iUnitCalender > 0) {

            //     sessionStorage.setItem("basePrice", result.propertyHostUnit.unitCalenderRate.basePrice);
            //     sessionStorage.setItem("discPer", result.propertyHostUnit.unitCalenderRate.discPer);
            //     sessionStorage.setItem("minPrice", result.propertyHostUnit.unitCalenderRate.minPrice);
            //     sessionStorage.setItem("depositAmount", result.propertyHostUnit.unitCalenderRate.depositAmount);
            //     sessionStorage.setItem("depositType", result.propertyHostUnit.unitCalenderRate.depositType);

            //     sessionStorage.setItem("petFee", result.propertyHostUnit.unitCalenderRate.petFee);
            //     sessionStorage.setItem("serviceTaxCleaning", result.propertyHostUnit.unitCalenderRate.serviceTaxCleaning);
            //     sessionStorage.setItem("serviceTaxPet", result.propertyHostUnit.unitCalenderRate.serviceTaxPet);
            //     sessionStorage.setItem("serviceTaxOther", result.propertyHostUnit.unitCalenderRate.serviceTaxOther);
            //     sessionStorage.setItem("otherFee", result.propertyHostUnit.unitCalenderRate.otherFee);

            //     sessionStorage.setItem("otherFeeName", result.propertyHostUnit.unitCalenderRate.otherFeeName);
            //     sessionStorage.setItem("depositeBasicType", result.propertyHostUnit.unitCalenderRate.depositeBasicType);
            //     sessionStorage.setItem("serviceTaxDeposite", result.propertyHostUnit.unitCalenderRate.serviceTaxDeposite);

            //     sessionStorage.setItem("cleaningFee", result.propertyHostUnit.unitCalenderRate.cleaningFee);
            //     sessionStorage.setItem("status", result.propertyHostUnit.unitCalenderRate.status);
            //     sessionStorage.setItem("minStayDays", result.propertyHostUnit.unitCalenderRate.minStayDays);
            // } else {
            //     sessionStorage.setItem("basePrice", ' ');
            //     sessionStorage.setItem("discPer", ' ');
            //     sessionStorage.setItem("minPrice", ' ');
            //     sessionStorage.setItem("depositAmount", ' ');
            //     sessionStorage.setItem("depositType", ' ');

            //     sessionStorage.setItem("petFee", ' ');
            //     sessionStorage.setItem("serviceTaxCleaning", ' ');
            //     sessionStorage.setItem("serviceTaxPet", ' ');
            //     sessionStorage.setItem("serviceTaxOther", ' ');
            //     sessionStorage.setItem("otherFee", ' ');

            //     sessionStorage.setItem("otherFeeName", ' ');
            //     sessionStorage.setItem("depositeBasicType", ' ');
            //     sessionStorage.setItem("serviceTaxDeposite", ' ');

            //     sessionStorage.setItem("cleaningFee", ' ');

            // }

            //yogiAnswer // 15.09.2018

            // sessionStorage.setItem("suitableChild", result.propertyHostUnit.suitableChild);
            // sessionStorage.setItem("suitableInfant", result.propertyHostUnit.suitableInfant);
            // sessionStorage.setItem("suitablePet", result.propertyHostUnit.suitablePet);
            // sessionStorage.setItem("smokeAllowed", result.propertyHostUnit.smokeAllowed);
            // sessionStorage.setItem("partyAllowed", result.propertyHostUnit.partyAllowed);
            // sessionStorage.setItem("depositeAllowed", result.propertyHostUnit.depositeAllowed);
            // sessionStorage.setItem("optWheelChair", result.propertyHostUnit.wheelchairAccessable);
            // sessionStorage.setItem("addHouseRule", result.propertyHostUnit.addHouseRule);

            // function relocateToProperty(callback) {
            $.ajax({
                type: "GET",
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                //url: newurl + "v1/user/" + userId + "/template/tax",
                url: newurl + 'property/tax/pmsUnitId/' + result.property.pmsUnitId + '/pmcId/' + pmcId,
                //url: newurl + "v1/user/" + userId + "/template/tax/property/" + obj.id
                // success: function (result) {

                //     var taxTemplateArray = [];
                //     taxTemplateArray.push(result);
                //     sessionStorage.setItem('taxTemplateArray', JSON.stringify(taxTemplateArray));
                // }, 
            })
                .done(function (data) {
                    var taxTemplateArray = [];
                    taxTemplateArray.push(data);
                    sessionStorage.setItem('taxTemplateArray', JSON.stringify(taxTemplateArray));
                    console.log('success', data);


                    location.href = "/newProperty";



                    //         if (obj.classList[1] == "fa-bath") {
                    //             location.href = '/newProperty#step2';
                    //             sessionStorage.setItem('setStepId3', 'step2');

                    //         } else if (obj.classList[1] == "fa-bed" || obj.classList[1] == "fa-bed") {
                    //             location.href = '/newProperty#step2';
                    //             sessionStorage.setItem('setStepId2', 'step2');

                    //         } else if (obj.classList[1] == "fa-users") {
                    //             location.href = '/newProperty';
                    //         }

                })
                .fail(function (xhr) {
                    console.log('Property API error', xhr);
                });



            //  callback();
        }

        //   relocateToProperty(function() {


        //     location.href = "/newProperty";


        //     if (obj.classList[1] == "fa-bath") {
        //         location.href = '/newProperty#step2';
        //         sessionStorage.setItem('setStepId3', 'step2');

        //     } else if (obj.classList[1] == "fa-bed" || obj.classList[1] == "fa-bed") {
        //         location.href = '/newProperty#step2';
        //         sessionStorage.setItem('setStepId2', 'step2');

        //     } else if (obj.classList[1] == "fa-users") {
        //         location.href = '/newProperty';
        //     }
        //   });


        // },
        // error: function (xhr, textStatus, errorThrown) {
        //     console.log('Error in Database');
        //     // console.log(errorThrown);
        // }

    });
}

function activeEditApi1(obj) {

    var iRow = 0;

    $('#location').empty();
    $('#pagin').empty();
    var userId = document.getElementById("userId").value;
    // console.log(userId);
    $.ajax({
        url: newurl + 'v1/user/' + userId + '/property/' + obj.id,
        type: 'GET',
        dataType: "json",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (result, textStatus, xhr) {

            sessionStorage.setItem("unitId", result.propertyHostUnit.unitId);
            sessionStorage.setItem("myMainKey", result.propertyLocations[0].addressLine1);
            sessionStorage.setItem("route", result.propertyLocations[0].addressLine2);
            sessionStorage.setItem("city", result.propertyLocations[0].city);
            sessionStorage.setItem("state", result.propertyLocations[0].state);
            sessionStorage.setItem("postalCode", result.propertyLocations[0].postalCode);
            sessionStorage.setItem("propertyTypeId", result.propertyType.propertyTypeId);
            sessionStorage.setItem("propertySubTypeId", result.propertyHostUnit.propertySubType.propertySubTypeId);
            sessionStorage.setItem("guestRoom", result.propertyHostUnit.propertyAccess.propertyAccId);
            sessionStorage.setItem("noBeds", result.propertyHostUnit.maxNoGuest);
            sessionStorage.setItem("my_select", result.propertyHostUnit.noOfBedroom);
            sessionStorage.setItem("noBed", result.propertyHostUnit.noOfBeds);
            sessionStorage.setItem("noBaths", result.propertyHostUnit.noOfBathroom);
            sessionStorage.setItem("propertyName", result.propertyName);
            sessionStorage.setItem("propertyDesc", result.propertyDesc);
            sessionStorage.setItem("propertyId", result.propertyId);
            sessionStorage.setItem("active", result.active);
            sessionStorage.setItem("isHide", result.isHide);


            var bedroomIdarr = [];
            var bedroomAmenitiesarr = [];
            var bedCntAmenitiesarr = [];
            var iunitBedroomsCnt = result.propertyHostUnit.unitBedRooms.length;
            if (result.propertyHostUnit.unitBedRooms.length == 0) {

                bedroomIdarr[k] = 0;
                bedroomAmenitiesarr[k] = "6,8,9,";
                bedCntAmenitiesarr[k] = "6 : 0,8 : 0,9 : 0,";

                bedroomAmenitiesarr[k] = bedamen;
                bedCntAmenitiesarr[k] = bedCntamen;

                k = k + 1;
                for (var iCheckCount = 0; iCheckCount < result.propertyHostUnit.noOfBedroom; iCheckCount++) {
                    bedroomIdarr[k] = 0;
                    bedamen = "1,2,3,4,";
                    bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
                    k = k + 1;
                }

                sessionStorage.setItem("BedType", 2);

            }
            else {
                if (result.propertyHostUnit.unitBedRooms.length > 0) {
                    var typeofbed0 = result.propertyHostUnit.unitBedRooms[0].bedroomTypeId;
                    var ir = 0;
                    if (typeofbed0 == "1") {
                        bedroomIdarr[ir] = 0;
                        bedroomAmenitiesarr[ir] = ",6,8,9,";
                        bedCntAmenitiesarr[ir] = ",6 : 0,8 : 0,9 : 0,";
                        ir = 1;
                    }
                }
                else {
                    ir = 1;
                }

                for (i = ir; ((ir == 1) ? i <= iunitBedroomsCnt : i < iunitBedroomsCnt); i++) {
                    var ibedroomId = result.propertyHostUnit.unitBedRooms[i].bedroomId;
                    bedroomIdarr[i] = ibedroomId;
                    var bedamen = "";
                    var BedAmenitiesId = "";
                    var bedCntamen = "";
                    var ibedroomamenitiesCnt = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities.length;
                    for (j = ir; ((ir == 1) ? j <= ibedroomamenitiesCnt : j < ibedroomamenitiesCnt); j++) {
                        bedamenCnt = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].bedCount;
                        bedCntamen = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + " : " + bedamenCnt + ",";
                        bedamen = bedamen + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + ",";

                    }
                    bedroomAmenitiesarr[i] = bedamen;
                    bedCntAmenitiesarr[i] = bedCntamen;
                }
                sessionStorage.setItem("bedroomAmenities", JSON.stringify(bedroomAmenitiesarr));
                sessionStorage.setItem("bedCntAmenitiesarr", JSON.stringify(bedCntAmenitiesarr));
                sessionStorage.setItem("bedroomID", JSON.stringify(bedroomIdarr));


                var iunitBathroomsCnt = result.propertyHostUnit.unitBathrooms.length;
                var bathroomIdarr = [];
                var bathroomAmenitiesarr = [];
                var bathroomTypeID = [];
                for (i = 0; i < iunitBathroomsCnt; i++) {
                    var ibathroomId = result.propertyHostUnit.unitBathrooms[i].bathroomId;
                    bathroomIdarr[i] = ibathroomId;
                    bathroomTypeID[i] = 1; // (result.propertyHostUnit.unitBathrooms[i].bathroomTypeId);
                    var bathamen = "";
                    var ibathroomamenitiesCnt = result.propertyHostUnit.unitBathrooms[i].propertyBathroomWiseAminities.length;
                    for (j = 0; j < ibathroomamenitiesCnt; j++) {
                        bathamen = bathamen + result.propertyHostUnit.unitBathrooms[i].propertyBathroomWiseAminities[j].propertyAmenity.amenitiesId + ",";
                    }
                    bathroomAmenitiesarr[i] = bathamen;

                }
            }
            sessionStorage.setItem("bathroomAmenities", JSON.stringify(bathroomAmenitiesarr));
            sessionStorage.setItem("bathroomID", JSON.stringify(bathroomIdarr));
            sessionStorage.setItem("bathroomTypeID", JSON.stringify(bathroomTypeID));


            //    console.log(arr1);
            //    console.log('d');
            //    var a =result.propertyHostUnit.unitBathrooms[0].propertyBathroomWiseAminities[0].propertyAmenity.amenitiesId;
            //   console.log(a);

            //    var a =result.propertyHostUnit.unitBathrooms[0].propertyBathroomWiseAminities[0].propertyAmenity.amenitiesId;
            //    console.log(a);

            //    console.log( document.getElementById("Essentials").id);
            if (result.propertyHostUnit.propertyFeaturesHosts.length > 0) {
                var k = parseInt(result.propertyHostUnit.propertyFeaturesHosts[parseInt(result.propertyHostUnit.propertyFeaturesHosts.length) - 1].propertyFeatures.propertyFeatureId) + 1;
                var x = 0;
                var w = 0;
                for (var i = 0; i < result.propertyHostUnit.propertyFeaturesHosts.length; i++) {
                    j = w + 1;
                    var x = parseInt(result.propertyHostUnit.propertyFeaturesHosts[i].propertyFeatures.propertyFeatureId);
                    if (j < x) {
                        for (j = w + 1; j < x; j++) {
                            sessionStorage.setItem("Feature_" + (j), "0");
                        }
                        sessionStorage.setItem("Feature_" + (x), "1");
                        w = x;
                    }
                    else {
                        sessionStorage.setItem("Feature_" + (w + 1), "1");
                        w = w + 1;
                    }


                }
                if (k < 34) {
                    for (var i = k; i <= 34; i++) {
                        sessionStorage.setItem("Feature_" + (i), "0");
                    }
                }

            }
            //yogiAnswers // 15.09.2018
            var iYogiQueAns = result.propertyHostUnit.yogiAnswers.length;

            var YogiQuesAnsArr = [];

            for (i = 0; i < iYogiQueAns; i++) {

                var sansDesc = result.propertyHostUnit.yogiAnswers[i].ansDesc;
                YogiQuesAnsArr[i] = sansDesc;

            }

            sessionStorage.setItem("YogiQuesAnsArr", JSON.stringify(YogiQuesAnsArr));

            var iUnitCalender = (result.propertyHostUnit.unitCalenderRate != null) ? 1 : 0;
            if (iUnitCalender > 0) {
                sessionStorage.setItem("basePrice", result.propertyHostUnit.unitCalenderRate.basePrice);
                sessionStorage.setItem("discPer", result.propertyHostUnit.unitCalenderRate.discPer);

                sessionStorage.setItem("petFee", result.propertyHostUnit.unitCalenderRate.petFee);
                sessionStorage.setItem("petFeeType", result.propertyHostUnit.unitCalenderRate.petFeeType);

                sessionStorage.setItem("cleaningFee", result.propertyHostUnit.unitCalenderRate.cleaningFee);
                sessionStorage.setItem("cleaningFeeType", result.propertyHostUnit.unitCalenderRate.cleaningFeeType);
                sessionStorage.setItem("status", result.propertyHostUnit.unitCalenderRate.status);
            }

            //yogiAnswer // 15.09.2018

            sessionStorage.setItem("suitableChild", result.propertyHostUnit.suitableChild);
            sessionStorage.setItem("suitableInfant", result.propertyHostUnit.suitableInfant);
            sessionStorage.setItem("suitablePet", result.propertyHostUnit.suitablePet);
            sessionStorage.setItem("smokeAllowed", result.propertyHostUnit.smokeAllowed);
            sessionStorage.setItem("partyAllowed", result.propertyHostUnit.partyAllowed);
            sessionStorage.setItem("addHouseRule", result.propertyHostUnit.addHouseRule);


            // location.href = "/newListings";
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Update Stock error');
            // console.log(errorThrown);
        }
    });
}


function PreviewActiveApi(obj) {
    var pmcId = document.getElementById('pmcId').value;
    var pmsUnitId = obj.id;
    $.ajax({
        type: 'GET',
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/discrepancy/pmcid/' + pmcId + '/pmsunitid/' + pmsUnitId,
        success: function (result) {
            //console.log(result)
            var local = result.location;
            var bedrooms = result.bedroom;
            var bathrooms = result.bathroom;
            var amenities = result.amenities;
            var propertyName = result.propertyName;
            var propertyDesc = result.propertyDesc;
            var photo = result.photo;
            var propertyRequirement = result.propertyRequirement;
            var checkInOutAns = result.checkInOutAns;
            var pricing = result.pricing;

            var checkItems = "";

            if (local == false) {
                checkItems += " * Property Details <br/>";
            }
            if (bedrooms == false) {
                checkItems += "* Number of Bedrooms<br/>";
            }
            if (bathrooms == false) {
                checkItems += " * Number of Bathrooms <br/>";
            }
            // if (amenities == 0) {
            //     checkItems += " * Amenities Details. <br/>";
            // }
            if (propertyName == false) {
                checkItems += " * Property Title <br/>";
            }
            if (propertyDesc == false) {
                checkItems += " * Property Description <br/>";
            }
            if (photo == false) {
                checkItems += " * Property Photos <br/>";
            }
            // if (propertyRequirement == 0) {
            //     checkItems += " * Property Requirment. <br/>";
            // }
            if (checkInOutAns == false) {
                checkItems += " * Check-In Time <br/> * Check-Out Time <br/>";
            }
            if (pricing == false) {
                checkItems += " * Pricing Details <br/>";
            }
            if (result.taxTemplate == false || result.taxTemplate == null) {
                checkItems += " * Tax template details <br/>";
            }

            if (result.payoutSetting == false || result.payoutSetting == null) {
                checkItems += " * Payout setting details needed  <br/>";
            }
            if (result.propertyDiscount == false) {
                checkItems += " * Discount needed  <br/>";
            }

            if (checkItems != "") {
                document.getElementById("msg-body").innerHTML = "Following information is required to publish property. </br>" + checkItems;
                $('#propertyLogs_model').modal('show');
            } else {
                $.ajax({
                    type: 'PUT',
                    //data: JSON.stringify(publishProperty),
                    contentType: "application/json",
                    dataType: "json",
                    'headers': {
                        Authorization: localStorage.getItem('token') || '',
                    },
                    url: newurl + 'property/publish/pmcId/' + pmcId + '/pmsUnitId/' + pmsUnitId + '/isPublishProperty/true',
                    success: function (result) {
                        //console.log(result)
                        location.href = "/properties";

                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                });
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            // console.log("Record active not Saved");
            // console.log(JSON.stringify(data));
        },
    });


}



function PreviewEditApi(obj) {

    sessionStorage.setItem("isAddFlag", false);
    sessionStorage.setItem("isBackFlag", false);
    sessionStorage.setItem("isEditableFlag", true);
    activeEditApi(obj);
}

function PreviewPreviewApi(obj) {
    sessionStorage.setItem("Preview_ID", obj.id);
    location.href = "/Preview";
}


function PreviewDeactiveApi(obj) {

    var pmcId = document.getElementById('pmcId').value;
    var pmsUnitId = obj.id;

    // console.log(JSON.stringify(data));
    $.ajax({
        type: 'PUT',
        //data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/hide/pmcId/' + pmcId + '/pmsUnitId/' + pmsUnitId + '/isHideProperty/true',
        success: function (result) {

            window.location.reload();
        },
        error: function (xhr, textStatus, errorThrown) {
            //   console.log("Record active not Saved");
            // console.log(JSON.stringify(data));
        },
    });
}

function PublishApi(obj) {

    var pmcId = document.getElementById('pmcId').value;
    var pmsUnitId = obj.id;
    sessionStorage.setItem('pms_unit_id',pmsUnitId)
    $.ajax({
        type: 'GET',
        contentType: "application/json",
        dataType: "json",
        'headers': {
            Authorization: localStorage.getItem('token') || '',
        },
        url: newurl + 'property/discrepancy/pmcid/' + pmcId + '/pmsunitid/' + pmsUnitId,
        success: function (result) {
            //console.log(result)
            var local = result.location;
            var bedrooms = result.bedroom;
            var bathrooms = result.bathroom;
            var amenities = result.amenities;
            var propertyName = result.propertyName;
            var propertyDesc = result.propertyDesc;
            var photo = result.photo;
            var propertyRequirement = result.propertyRequirement;
            var checkInOutAns = result.checkInOutAns;
            var pricing = result.pricing;
            var discount = +document.getElementById('discount' + pmsUnitId).innerText;

            var checkItems = "";

            if (local == false) {
                checkItems += " * Property Details <br/>";
            }
            if (bedrooms == false) {
                checkItems += "* Number of Bedrooms<br/>";
            }
            if (bathrooms == false) {
                checkItems += " * Number of Bathrooms <br/>";
            }
            // if (amenities == 0) {
            //     checkItems += " * Amenities Details. <br/>";
            // }
            if (propertyName == false) {
                checkItems += " * Property Title <br/>";
            }
            if (propertyDesc == false) {
                checkItems += " * Property Description <br/>";
            }
            if (photo == false) {
                checkItems += " * Property Photos <br/>";
            }
            // if (propertyRequirement == 0) {
            //     checkItems += " * Property Requirment. <br/>";
            // }
            if (checkInOutAns == false) {
                checkItems += " * Check-In Time <br/> * Check-Out Time <br/>";
            }
            if (pricing == false) {
                checkItems += " * Pricing Details <br/>";
            }
            if (result.taxTemplate == false || result.taxTemplate == null) {
                checkItems += " * Tax template details <br/>";
            }

            if (result.payoutSetting == false || result.payoutSetting == null) {
                checkItems += " * Payout setting details needed  <br/>";
            }
            if (discount < 5) {
                checkItems += " * The discount must be at least 5% <br/>";
            }

            if (checkItems != "") {
                document.getElementById("msg-body").innerHTML = "Following information is required to publish property. </br>" + checkItems;
                $('#propertyLogs_model').modal('show');
            } else {
                $.ajax({
                    type: 'PUT',
                    //data: JSON.stringify(publishProperty),
                    contentType: "application/json",
                    dataType: "json",
                    'headers': {
                        Authorization: localStorage.getItem('token') || '',
                    },
                    url: newurl + 'property/publish/pmcId/' + pmcId + '/pmsUnitId/' + pmsUnitId + '/isPublishProperty/true',
                    success: function (result) {
                        //console.log(result)
                        location.href = "/properties";

                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                });
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            // console.log("Record active not Saved");
            // console.log(JSON.stringify(data));
        },
    });
}

function HandleSession(obj) {

    $.ajax({
        url: newurl + 'v1/user/' + userId + '/property/' + obj,
        type: 'GET',
        dataType: "json",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (result, textStatus, xhr) {

            sessionStorage.setItem("unitId", result.propertyHostUnit.unitId);
            sessionStorage.setItem("myMainKey", result.propertyLocations[0].addressLine1);
            sessionStorage.setItem("route", result.propertyLocations[0].addressLine2);
            sessionStorage.setItem("propertyTypeId", result.propertyType.propertyTypeId);
            sessionStorage.setItem("propertySubTypeId", result.propertyHostUnit.propertySubType.propertySubTypeId);
            sessionStorage.setItem("guestRoom", result.propertyHostUnit.propertyAccess.propertyAccId);
            sessionStorage.setItem("noBeds", result.propertyHostUnit.maxNoGuest);
            sessionStorage.setItem("my_select", result.propertyHostUnit.noOfBedroom);
            sessionStorage.setItem("noBed", result.propertyHostUnit.noOfBeds);
            sessionStorage.setItem("noBaths", result.propertyHostUnit.noOfBathroom);
            sessionStorage.setItem("propertyName", result.propertyName);
            sessionStorage.setItem("propertyDesc", result.propertyDesc);
            sessionStorage.setItem("propertyId", result.propertyId);
            sessionStorage.setItem("active", result.active);
            sessionStorage.setItem("isHide", result.isHide);
        }
    });

}

function calendarViewApi(obj) {
    // alert(obj);
    sessionStorage.setItem("Prop_ID", obj.id);
    location.href = "/newCalender";
}





function imagesOrderSorting() {
    // var data ImageOrderSortingList = new Object();

    var hostPopertyAttachmentIdList = JSON.parse(sessionStorage.getItem("host-attachment-id-list"));
    var imageOrderList = JSON.parse(sessionStorage.getItem("order-list"));
    var FinalList = new Array();
    // var isCover=JSON.parse(sessionStorage.getItem("order-array"));
    // console.log("hostPopertyAttachmentIdList" + JSON.stringify(hostPopertyAttachmentIdList));
    // console.log("imageOrderList" + JSON.stringify(imageOrderList));

    for (var i = 0; i < hostPopertyAttachmentIdList.length; i++) {
        var ImageOrderSortingList = {};
        ImageOrderSortingList = {
            "hostPopertyAttachmentId": hostPopertyAttachmentIdList[i],
            "imageOrder": imageOrderList[i],
            "isCoverImage": 0,
        }
        FinalList.push(ImageOrderSortingList);

    }
    console.log("ImageOrderSortingList" + ImageOrderSortingList);

    $.ajax({
        url: newurl + 'v1/user/' + userId + '/property/' + propertyId + '/unit/' + unitId + '/attachment/order',
        type: 'PUT',
        data: JSON.stringify(ImageOrderSortingList),
        contentType: "application/json",
        dataType: "json",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        url: newurl + 'v1/user/' + userId + '/property',
        success: function (result) {
            //  console.log(JSON.stringify(result));
            // console.log("save");
            window.location.reload();

        },
        error: function (xhr, textStatus, errorThrown) {
            //console.log("Record not Saved");
            // console.log(JSON.stringify(data));

        },
    });
}




$('#editPrice').click(function () {

    /* For Current Price field validation*/
    if (document.getElementById('lisitngPrice').value == "") {
        document.getElementById("lisitngPrice1").innerHTML = 'Please enter the Price.';
        document.getElementById("lisitngPrice").focus();
        return false;
    } else if (document.getElementById('lisitngPrice').value == 0) {
        document.getElementById("lisitngPrice1").innerHTML = 'Nightly Rate should not be zero.';
        document.getElementById("lisitngPrice").focus();
        return false;
    } else {
        document.getElementById("lisitngPrice1").innerHTML = '';
    }

    /* For price discount field validation*/
    if (document.getElementById('lisitngDiscount').value == "") {
        document.getElementById("lisitngDiscount1").innerHTML = 'Please enter the discount.';
        document.getElementById("lisitngDiscount").focus();
        return false;
    } else if (document.getElementById('lisitngDiscount').value < 5) {
        document.getElementById("lisitngDiscount1").innerHTML = 'The discount must be at least 5%.';
        document.getElementById("lisitngDiscount").focus();
        return false;
    } else if (document.getElementById('lisitngDiscount').value > 100) {
        document.getElementById("lisitngDiscount1").innerHTML = 'The discount is not more than 100%.';
        document.getElementById("lisitngDiscount").focus();
        return false;
    }
    else {
        document.getElementById("lisitngDiscount1").innerHTML = "";
    }

    var Price = new Object();

    Price.pmcId = pmcId;
    Price.pmsUnitId = sessionStorage.getItem('pmsUnitId');
    Price.discPer = document.getElementById("lisitngDiscount").value;
    Price.minPrice = document.getElementById("minPrice").value;
    // Price.basePrice = document.getElementById("lisitngPrice").value;
    console.log(JSON.stringify(Price));
    $.ajax({
        type: 'PUT',
        data: JSON.stringify(Price),
        contentType: "application/json",
        dataType: "json",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        url: newurl + 'property/rate/changeDisc',
        success: function (result) {
            // document.getElementById("message-body").innerHTML = "Price is updated successfully.";
            // $('#Share_model').modal('show');
            window.location.reload();
            // console.log("Price Updated");
        },
        error: function (xhr, textStatus, errorThrown) {
            document.getElementById("message-body").innerHTML = "opps! price is not updated will you please try again.";
            $('#Share_model').modal('show');
            // console.log("bathroom Put-Api not saved");
        },
    });


});
$('#editProperty').click(function () {

    sessionStorage.setItem("isEditableFlag", true);
    var pms_unit_id = sessionStorage.getItem('pms_unit_id');

    $.ajax({
        url: newurl + 'property/user/0/pmcId/' + pmcId + '/pmsUnitId/' + pms_unit_id,
        type: 'GET',
        dataType: "json",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (result, textStatus, xhr) {
            console.log(JSON.stringify(result));
            sessionStorage.setItem("pmsUnitId", result.property.pmsUnitId);
            //console.log(JSON.stringify(result.propertyHostUnit.propertyAttachments));
            // sessionStorage.setItem("externalId", result.externalProperty);
            // sessionStorage.setItem("unitId", result.propertyHostUnit.unitId);
            // sessionStorage.setItem("myMainKey", result.property.addressline1);
            // sessionStorage.setItem("route", result.property.addressFull);
            // sessionStorage.setItem("city", result.property.city);
            // sessionStorage.setItem("state", result.property.state);
            // sessionStorage.setItem("country", result.property.countryCode);
            // sessionStorage.setItem("postalCode", result.property.postalCode);
            // sessionStorage.setItem("latitude", result.property.latitude);
            // sessionStorage.setItem("longitude", result.property.longitude);
            // sessionStorage.setItem("propertyTypeId", result.property.propertyTypeId);
            // sessionStorage.setItem("propertySubTypeId", result.property.propertySubTypeId);
            // sessionStorage.setItem("optradio", result.pproperty.propertyAccId);
            // sessionStorage.setItem("noBeds", result.property.maxNoGuest);
            // sessionStorage.setItem("my_select", result.property.noOfBedroom);
            // sessionStorage.setItem("noBed", result.property.noOfBeds);
            // sessionStorage.setItem("noBaths", result.property.noOfBathroom);
            // sessionStorage.setItem("propertyName", result.property.propertyName);
            // sessionStorage.setItem("propertyDesc", result.property.propertyDesc);
            // sessionStorage.setItem("pmsUnitId", result.property.pmsUnitId);
            // // sessionStorage.setItem("active", result.active);
            // // sessionStorage.setItem("isHide", result.isHide);


            // //    Code change //
            // var bedroomIdarr = [];
            // var bedroomIdarrsort = [];
            // var bedroomIdarrBfrSort = [];
            // var bedroomAmenitiesarr = [];
            // var bedCntAmenitiesarr = [];
            // var iunitBedroomsCnt = result.propertyHostUnit.unitBedRooms.length;
            // var ir = 0;
            // var k = 0;
            // var chkComm = "N";
            // var BedroomType;

            // if (result.propertyHostUnit.unitBedRooms.length == 0) {
            //     bedroomIdarr[k] = 0;
            //     bedroomAmenitiesarr[k] = "6,8,9,";
            //     bedCntAmenitiesarr[k] = "6 : 0,8 : 0,9 : 0,";

            //     k = k + 1;
            //     for (var iCheckCount = 0; iCheckCount < result.propertyHostUnit.noOfBedroom; iCheckCount++) {
            //         bedroomIdarr[k] = 0;
            //         bedamen = "1,2,3,4,";
            //         bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
            //         bedroomAmenitiesarr[k] = bedamen;
            //         bedCntAmenitiesarr[k] = bedCntamen;
            //         k = k + 1;
            //     }

            //     sessionStorage.setItem("BedType", 2);

            // }
            // else {
            //     if (result.propertyHostUnit.unitBedRooms.length > 0) {
            //         for (var iCheckCount = 0; iCheckCount < result.propertyHostUnit.unitBedRooms.length; iCheckCount++) {
            //             var typeofbed0 = result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomType.bedroomTypeId;
            //             BedroomType = typeofbed0;
            //             if (typeofbed0 == "2") {
            //                 chkComm = "Y";
            //                 var ibedroomId = result.propertyHostUnit.unitBedRooms[iCheckCount].bedroomId;
            //                 bedroomIdarr[k] = ibedroomId;
            //                 var bedamen = "";
            //                 var BedAmenitiesId = "";
            //                 var bedCntamen = "";
            //                 var flag6 = false;
            //                 var flag8 = false;
            //                 var flag9 = false;
            //                 // var flag4=false;

            //                 var ibedroomamenitiesCnt = result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities.length;
            //                 if (ibedroomamenitiesCnt > 0) {
            //                     for (j = 0; j < ibedroomamenitiesCnt; j++) {
            //                         // alert("Amminites"+result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId);
            //                         bedamenCnt = result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].bedCount;
            //                         bedCntamen = bedCntamen + result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + " : " + bedamenCnt + ",";
            //                         bedamen = bedamen + result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + ",";

            //                         if (result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "6") {
            //                             //alert("Single");
            //                             flag6 = true;
            //                         }
            //                         if (result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "8") {
            //                             //alert("Double");
            //                             flag8 = true;
            //                         }
            //                         if (result.propertyHostUnit.unitBedRooms[iCheckCount].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "9") {
            //                             //alert("flag 3");
            //                             flag9 = true;
            //                         }

            //                     }
            //                     if (flag9 == false) {
            //                         bedamen = "9," + bedamen;
            //                         bedCntamen = "9 : 0," + bedCntamen;
            //                     }
            //                     if (flag8 == false) {
            //                         bedamen = "8," + bedamen;
            //                         bedCntamen = "8 : 0," + bedCntamen;
            //                     }
            //                     if (flag6 == false) {
            //                         bedamen = "6," + bedamen;
            //                         bedCntamen = "6 : 0," + bedCntamen;
            //                     }


            //                 }
            //                 else {
            //                     bedroomAmenitiesarr[k] = "6,8,9,";
            //                     bedCntAmenitiesarr[k] = "6 : 0,8 : 0,9 : 0,";
            //                 }

            //                 bedroomAmenitiesarr[k] = bedamen;
            //                 bedCntAmenitiesarr[k] = bedCntamen;
            //                 k = k + 1;
            //             }
            //         }
            //         if (chkComm = "N") {
            //             bedroomIdarr[k] = null;
            //             bedroomAmenitiesarr[k] = "6,8,9,";
            //             bedCntAmenitiesarr[k] = "6 : 0,8 : 0,9 : 0,";
            //             ir = 1;
            //             k = 1;
            //             BedroomType = "2";
            //         }

            //     }
            //     else {
            //         ir = 0;
            //     }

            //     var v = 0;

            //     var itotBedCnt = result.propertyHostUnit.noOfBedroom;

            //     for (i = 0; i < iunitBedroomsCnt; i++) {

            //         var typeofbed0 = result.propertyHostUnit.unitBedRooms[i].propertyBedroomType.bedroomTypeId;
            //         if (typeofbed0 == "1") {
            //             var ibedroomId = result.propertyHostUnit.unitBedRooms[i].bedroomId;
            //             bedroomIdarrBfrSort[v] = ibedroomId;
            //             v = v + 1;
            //         }
            //     }

            //     bedroomIdarrsort = bedroomIdarrBfrSort.sort();

            //     for (b = 0; b < bedroomIdarrsort.length; b++) {
            //         var ibedroomId = bedroomIdarrsort[b];

            //         for (i = 0; i < iunitBedroomsCnt; i++) {
            //             var typeofbed0 = result.propertyHostUnit.unitBedRooms[i].propertyBedroomType.bedroomTypeId;
            //             if (typeofbed0 == "1" && ibedroomId == result.propertyHostUnit.unitBedRooms[i].bedroomId) {

            //                 var pos = 0;
            //                 var poslen = 0;
            //                 if (result.propertyHostUnit.unitBedRooms[i].bedroomName.indexOf('Bedroom ') == 0) {
            //                     pos = result.propertyHostUnit.unitBedRooms[i].bedroomName.indexOf('Bedroom ');
            //                     poslen = 8;
            //                 }
            //                 else {
            //                     pos = result.propertyHostUnit.unitBedRooms[i].bedroomName.indexOf('Bedroom');
            //                     poslen = 7;
            //                 }
            //                 var kt = result.propertyHostUnit.unitBedRooms[i].bedroomName.substring(pos + poslen, result.propertyHostUnit.unitBedRooms[i].bedroomName.length);
            //                 var kt1 = parseInt(kt);
            //                 if (kt1 == k) {
            //                     bedroomIdarr[k] = ibedroomId;


            //                     var bedamen = "";
            //                     var BedAmenitiesId = "";
            //                     var bedCntamen = "";

            //                     var flag1 = false;
            //                     var flag2 = false;
            //                     var flag3 = false;
            //                     var flag4 = false;

            //                     var ibedroomamenitiesCnt = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities.length;
            //                     if (ibedroomamenitiesCnt > 0) {
            //                         for (j = 0; j < ibedroomamenitiesCnt; j++) {
            //                             // alert("Amminiies "+result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId);
            //                             bedamenCnt = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].bedCount;
            //                             bedCntamen = bedCntamen + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + " : " + bedamenCnt + ",";
            //                             bedamen = bedamen + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + ",";
            //                             if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "1") {
            //                                 // alert("Single");
            //                                 flag1 = true;
            //                             }
            //                             if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "2") {
            //                                 // alert("Double");
            //                                 flag2 = true;
            //                             }
            //                             if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "3") {
            //                                 // alert("flag 3");
            //                                 flag3 = true;
            //                             }
            //                             if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "4") {
            //                                 // alert("falg 4");
            //                                 flag4 = true;
            //                             }

            //                         }
            //                         if (flag4 == false) {
            //                             bedamen = "4," + bedamen;
            //                             bedCntamen = "4 : 0," + bedCntamen;
            //                         }
            //                         if (flag3 == false) {
            //                             bedamen = "3," + bedamen;
            //                             bedCntamen = "3 : 0," + bedCntamen;
            //                         }
            //                         if (flag2 == false) {
            //                             bedamen = "2," + bedamen;
            //                             bedCntamen = "2 : 0," + bedCntamen;
            //                         }
            //                         if (flag1 == false) {
            //                             bedamen = "1," + bedamen;
            //                             bedCntamen = "1 : 0," + bedCntamen;
            //                         }
            //                     }
            //                     else {
            //                         bedamen = "1,2,3,4,";
            //                         bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
            //                     }

            //                     bedroomAmenitiesarr[k] = bedamen;
            //                     bedCntAmenitiesarr[k] = bedCntamen;
            //                     k = k + 1;
            //                     break;
            //                 }
            //                 else {
            //                     for (var l = k; l <= kt1; l++) {
            //                         if (l == kt1) {
            //                             bedroomIdarr[l] = ibedroomId;


            //                             var bedamen = "";
            //                             var BedAmenitiesId = "";
            //                             var bedCntamen = "";

            //                             var flag1 = false;
            //                             var flag2 = false;
            //                             var flag3 = false;
            //                             var flag4 = false;

            //                             var ibedroomamenitiesCnt = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities.length;
            //                             if (ibedroomamenitiesCnt > 0) {
            //                                 for (j = 0; j < ibedroomamenitiesCnt; j++) {
            //                                     // alert("am 3"+result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId);
            //                                     bedamenCnt = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].bedCount;
            //                                     bedCntamen = bedCntamen + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + " : " + bedamenCnt + ",";
            //                                     bedamen = bedamen + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId + ",";


            //                                     if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "1") {
            //                                         // alert("Single");
            //                                         flag1 = true;
            //                                     }
            //                                     if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "2") {
            //                                         // alert("Single");
            //                                         flag2 = true;
            //                                     }
            //                                     if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "3") {
            //                                         // alert("Single");
            //                                         flag3 = true;
            //                                     }
            //                                     if (result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId == "4") {
            //                                         //alert("Flag 4");
            //                                         flag4 = true;
            //                                     }

            //                                 }



            //                                 if (flag4 == false) {
            //                                     bedamen = "4," + bedamen;
            //                                     bedCntamen = "4 : 0," + bedCntamen;
            //                                 }
            //                                 if (flag3 == false) {
            //                                     bedamen = "3," + bedamen;
            //                                     bedCntamen = "3 : 0," + bedCntamen;
            //                                 }
            //                                 if (flag2 == false) {
            //                                     bedamen = "2," + bedamen;
            //                                     bedCntamen = "2 : 0," + bedCntamen;
            //                                 }
            //                                 if (flag1 == false) {
            //                                     bedamen = "1," + bedamen;
            //                                     bedCntamen = "1 : 0," + bedCntamen;
            //                                 }

            //                             }
            //                             else {
            //                                 bedamen = "1,2,3,4,";
            //                                 bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
            //                             }

            //                             bedroomAmenitiesarr[l] = bedamen;
            //                             bedCntAmenitiesarr[l] = bedCntamen;
            //                             l = l + 1;
            //                             k = kt1 + 1;
            //                             break;
            //                         }
            //                         else {
            //                             bedroomIdarr[l] = 0;
            //                             // bedroomNamearr[l] = "Bedroom "+l;
            //                             bedamen = "1,2,3,4,";
            //                             bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
            //                             bedroomAmenitiesarr[l] = bedamen;
            //                             bedCntAmenitiesarr[l] = bedCntamen;
            //                             k = l + 1;
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }

            //     if (BedroomType != undefined) {
            //         sessionStorage.setItem("BedType", BedroomType);
            //     }
            // }

            // if (bedroomIdarrsort.length < result.propertyHostUnit.noOfBedroom) {
            //     for (var iCheckCount = bedroomIdarrsort.length; iCheckCount < result.propertyHostUnit.noOfBedroom; iCheckCount++) {
            //         bedroomIdarr[k] = 0;
            //         bedamen = "1,2,3,4,";
            //         bedCntamen = "1 : 0,2 : 0,3 : 0,4 : 0,";
            //         bedroomAmenitiesarr[k] = bedamen;
            //         bedCntAmenitiesarr[k] = bedCntamen;
            //         k = k + 1;
            //     }
            // }


            // sessionStorage.setItem("bedroomAmenities", JSON.stringify(bedroomAmenitiesarr));
            // sessionStorage.setItem("bedCntAmenitiesarr", JSON.stringify(bedCntAmenitiesarr));
            // sessionStorage.setItem("bedroomID", JSON.stringify(bedroomIdarr));


            // var iunitBathroomsCnt = result.propertyHostUnit.unitBathrooms.length;
            // var bathroomIdarr = [];
            // var bathroomIdarrsort = [];
            // var bathroomIdarrbfrsort = [];
            // var bathroomAmenitiesarr = [];
            // var bathroomTypeID = [];

            // var v = 0;
            // for (i = 0; i < iunitBathroomsCnt; i++) {

            //     var ibathroomId = result.propertyHostUnit.unitBathrooms[i].bathroomId;
            //     bathroomIdarrbfrsort[v] = ibathroomId;
            //     v = v + 1;
            // }

            // bathroomIdarrsort = bathroomIdarrbfrsort.sort();
            // k = 0;
            // for (b = 0; b < bathroomIdarrsort.length; b++) {
            //     var ibathroomId = bathroomIdarrsort[b];

            //     for (i = 0; i < iunitBathroomsCnt; i++) {
            //         if (ibathroomId == result.propertyHostUnit.unitBathrooms[i].bathroomId) {
            //             // var ibathroomId = result.propertyHostUnit.unitBathrooms[i].bathroomId;
            //             bathroomIdarr[k] = ibathroomId;
            //             bathroomTypeID[k] = (result.propertyHostUnit.unitBathrooms[i].propertyBathroomType.bathroomTypeId);
            //             var bathamen = "";
            //             var ibathroomamenitiesCnt = result.propertyHostUnit.unitBathrooms[i].propertyBathroomWiseAminities.length;
            //             for (j = 0; j < ibathroomamenitiesCnt; j++) {
            //                 bathamen = bathamen + result.propertyHostUnit.unitBathrooms[i].propertyBathroomWiseAminities[j].propertyAmenity.amenitiesId + ",";
            //             }
            //             bathroomAmenitiesarr[k] = bathamen;
            //             k = k + 1;
            //             break;
            //         }
            //     }
            // }
            // sessionStorage.setItem("bathroomAmenities", JSON.stringify(bathroomAmenitiesarr));
            // sessionStorage.setItem("bathroomID", JSON.stringify(bathroomIdarr));
            // sessionStorage.setItem("bathroomTypeID", JSON.stringify(bathroomTypeID));



            // if (result.propertyHostUnit.propertyFeaturesHosts.length > 0) {

            //     for (var l = 0; l <= 40; l++) {
            //         sessionStorage.setItem("Feature_" + (l), "0");
            //     }
            //     for (var i = 0; i < result.propertyHostUnit.propertyFeaturesHosts.length; i++) {
            //         var x = parseInt(result.propertyHostUnit.propertyFeaturesHosts[i].propertyFeatures.propertyFeatureId);
            //         sessionStorage.setItem("Feature_" + (x), "1");
            //     }

            // }

            // var iYogiQueAns = result.propertyHostUnit.yogiAnswers.length;

            // var YogiQuesAnsArr = [];
            // var QuesAnsArr = [];

            // for (i = 0; i < iYogiQueAns; i++) {

            //     var sansDesc = result.propertyHostUnit.yogiAnswers[i].ansDesc;
            //     YogiQuesAnsArr[i] = sansDesc;
            //     QuesAnsArr[i] = result.propertyHostUnit.yogiAnswers[i].yogiQuestion.queId;

            // }

            // sessionStorage.setItem("YogiQuesAnsArr", JSON.stringify(YogiQuesAnsArr));
            // sessionStorage.setItem("QuesAnsArr", JSON.stringify(QuesAnsArr));

            // var iUnitCalender = (result.propertyHostUnit.unitCalenderRate != null) ? 1 : 0;
            // if (iUnitCalender > 0) {

            //     sessionStorage.setItem("basePrice", result.propertyHostUnit.unitCalenderRate.basePrice);
            //     sessionStorage.setItem("discPer", result.propertyHostUnit.unitCalenderRate.discPer);
            //     sessionStorage.setItem("minPrice", result.propertyHostUnit.unitCalenderRate.minPrice);
            //     sessionStorage.setItem("depositAmount", result.propertyHostUnit.unitCalenderRate.depositAmount);
            //     sessionStorage.setItem("depositType", result.propertyHostUnit.unitCalenderRate.depositType);

            //     sessionStorage.setItem("petFee", result.propertyHostUnit.unitCalenderRate.petFee);
            //     sessionStorage.setItem("serviceTaxCleaning", result.propertyHostUnit.unitCalenderRate.serviceTaxCleaning);
            //     sessionStorage.setItem("serviceTaxPet", result.propertyHostUnit.unitCalenderRate.serviceTaxPet);
            //     sessionStorage.setItem("serviceTaxOther", result.propertyHostUnit.unitCalenderRate.serviceTaxOther);
            //     sessionStorage.setItem("otherFee", result.propertyHostUnit.unitCalenderRate.otherFee);

            //     sessionStorage.setItem("otherFeeName", result.propertyHostUnit.unitCalenderRate.otherFeeName);
            //     sessionStorage.setItem("depositeBasicType", result.propertyHostUnit.unitCalenderRate.depositeBasicType);
            //     sessionStorage.setItem("serviceTaxDeposite", result.propertyHostUnit.unitCalenderRate.serviceTaxDeposite);

            //     sessionStorage.setItem("cleaningFee", result.propertyHostUnit.unitCalenderRate.cleaningFee);
            //     sessionStorage.setItem("status", result.propertyHostUnit.unitCalenderRate.status);
            //     sessionStorage.setItem("minStayDays", result.propertyHostUnit.unitCalenderRate.minStayDays);
            // } else {
            //     sessionStorage.setItem("basePrice", ' ');
            //     sessionStorage.setItem("discPer", ' ');
            //     sessionStorage.setItem("minPrice", ' ');
            //     sessionStorage.setItem("depositAmount", ' ');
            //     sessionStorage.setItem("depositType", ' ');

            //     sessionStorage.setItem("petFee", ' ');
            //     sessionStorage.setItem("serviceTaxCleaning", ' ');
            //     sessionStorage.setItem("serviceTaxPet", ' ');
            //     sessionStorage.setItem("serviceTaxOther", ' ');
            //     sessionStorage.setItem("otherFee", ' ');

            //     sessionStorage.setItem("otherFeeName", ' ');
            //     sessionStorage.setItem("depositeBasicType", ' ');
            //     sessionStorage.setItem("serviceTaxDeposite", ' ');

            //     sessionStorage.setItem("cleaningFee", ' ');

            // }

            //yogiAnswer // 15.09.2018

            // sessionStorage.setItem("suitableChild", result.propertyHostUnit.suitableChild);
            // sessionStorage.setItem("suitableInfant", result.propertyHostUnit.suitableInfant);
            // sessionStorage.setItem("suitablePet", result.propertyHostUnit.suitablePet);
            // sessionStorage.setItem("smokeAllowed", result.propertyHostUnit.smokeAllowed);
            // sessionStorage.setItem("partyAllowed", result.propertyHostUnit.partyAllowed);
            // sessionStorage.setItem("depositeAllowed", result.propertyHostUnit.depositeAllowed);
            // sessionStorage.setItem("optWheelChair", result.propertyHostUnit.wheelchairAccessable);
            // sessionStorage.setItem("addHouseRule", result.propertyHostUnit.addHouseRule);

            // function relocateToProperty(callback) {
            $.ajax({
                type: "GET",
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                //url: newurl + "v1/user/" + userId + "/template/tax",
                url: newurl + 'property/tax/pmsUnitId/' + result.property.pmsUnitId + '/pmcId/' + pmcId,
                //url: newurl + "v1/user/" + userId + "/template/tax/property/" + obj.id
                // success: function (result) {

                //     var taxTemplateArray = [];
                //     taxTemplateArray.push(result);
                //     sessionStorage.setItem('taxTemplateArray', JSON.stringify(taxTemplateArray));
                // },
            })
                .done(function (data) {
                    var taxTemplateArray = [];
                    taxTemplateArray.push(data);
                    sessionStorage.setItem('taxTemplateArray', JSON.stringify(taxTemplateArray));
                    console.log('success', data);


                    location.href = "/newProperty";



                    //         if (obj.classList[1] == "fa-bath") {
                    //             location.href = '/newProperty#step2';
                    //             sessionStorage.setItem('setStepId3', 'step2');

                    //         } else if (obj.classList[1] == "fa-bed" || obj.classList[1] == "fa-bed") {
                    //             location.href = '/newProperty#step2';
                    //             sessionStorage.setItem('setStepId2', 'step2');

                    //         } else if (obj.classList[1] == "fa-users") {
                    //             location.href = '/newProperty';
                    //         }

                })
                .fail(function (xhr) {
                    console.log('Property API error', xhr);
                });



            //  callback();
        }

        //   relocateToProperty(function() {


        //     location.href = "/newProperty";


        //     if (obj.classList[1] == "fa-bath") {
        //         location.href = '/newProperty#step2';
        //         sessionStorage.setItem('setStepId3', 'step2');

        //     } else if (obj.classList[1] == "fa-bed" || obj.classList[1] == "fa-bed") {
        //         location.href = '/newProperty#step2';
        //         sessionStorage.setItem('setStepId2', 'step2');

        //     } else if (obj.classList[1] == "fa-users") {
        //         location.href = '/newProperty';
        //     }
        //   });


        // },
        // error: function (xhr, textStatus, errorThrown) {
        //     console.log('Error in Database');
        //     // console.log(errorThrown);
        // }

    });

});


//<p><b>Premium Price: </b><strong style="color: #FC97B9;">' + item.basePrice + '</strong><b>     Wemaste Price: </b><strong style="color: #FC97B9;">' + Number.parseFloat(item.discountedPrice).toPrecision(6) + '</strong></p>



