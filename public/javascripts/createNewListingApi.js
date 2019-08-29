var url = document.getElementById('globalUrl').value;

$(document).ready(function () {
    var proprty = new Object();
    var propertyDetails = new Object();
    var dataHeader = new Object();
    
    var pmcId = document.getElementById('pmcId').value;
    if (sessionStorage.getItem("pmsUnitId") != null) {
        $.ajax({

            headers: { "Content-Type": "application/json" },
            type: "GET",
            'headers': {
                Authorization: localStorage.getItem('token') || '',
            },
            //url: 'http://13.59.91.130:8083/v1/user/1/property',
            url: url + 'property/user/0/pmcId/' + pmcId + '/pmsUnitId/' + sessionStorage.getItem("pmsUnitId"),

            success: function (result) {
                //console.log(JSON.stringify(result))
               //console.log(sessionStorage.getItem("pmsUnitId"))
                //document.getElementById("propertyId").value = sessionStorage.getItem("propertyId");
                document.getElementById("propertyName").disabled = true;
                document.getElementById("autocomplete").disabled = true;
                document.getElementById("noBeds").disabled = true;
                document.getElementById("btn_Minus").onclick = null;
                document.getElementById("btn_Plus").onclick = null;
                document.getElementById("my_select").disabled = true;
                document.getElementById("btn_Bedroom_Minus").onclick = null;
                document.getElementById("btn_Bedroom_Plus").onclick = null;
                document.getElementById("noBaths").disabled = true;
                document.getElementById("btn_Bathroom_Minus").onclick = null;
                document.getElementById("btn_Bathroom_Plus").onclick = null;
                document.getElementById("propertyDesc").disabled = true;
                document.getElementById("profile-img").disabled = true;

                document.getElementById("propertyTypeDisplay").innerHTML = result.property.propertyTypeDesc;
                document.getElementById("propertySubTypeDisplay").innerHTML = result.property.propertySubTypeDesc;
                document.getElementById("accomodationType").innerHTML = result.property.propertyAccessType;
                document.getElementById("propertyName").value = result.property.propertyName;
                document.getElementById("autocomplete").value = result.property.addressFull;
                document.getElementById("locality").value = result.property.city;
                document.getElementById("administrative_area_level_1").value = result.property.state;
                document.getElementById("country").value = result.property.countryCode;
                document.getElementById("postal_code").value = result.property.postalCode;
                document.getElementById("route").value = result.property.addressline1;
                document.getElementById("lat").value = result.property.latitude;
                document.getElementById("lng").value = result.property.longitude;
                //$('input[name=optradio][value="' + result.property.propertyAccessType + '"]').prop('checked', true);
                document.getElementById("noBeds").value = result.property.maxNoGuest;
                document.getElementById("my_select").value = result.property.noOfBedroom;
                document.getElementById("noBaths").value = result.property.noOfBathroom;
                document.getElementById("propertyDesc").value = result.property.propertyDesc;

                $('input[name=optChildren][value="' + result.property.suitableChild + '"]').prop('checked', true);
                $('input[name=optInfants][value="' + result.property.suitableInfant + '"]').prop('checked', true);
                $('input[name=optPets][value="' + result.property.suitablePet + '"]').prop('checked', true);
                $('input[name=optSmoking][value="' + result.property.smokeAllowed + '"]').prop('checked', true);
                $('input[name=optEvents][value="' + result.property.partyAllowed + '"]').prop('checked', true);
                $('input[name=optWheelChair][value="' + result.property.wheelchairAccessable + '"]').prop('checked', true);
                document.getElementById("txtaddhouserule").value = result.property.addHouseRule;

                //document.getElementById("lisitngPrice").value = sessionStorage.getItem("basePrice");
                document.getElementById("lisitngDiscount").value = result.property.discPer;
                if (result.property.minPrice == "null") {
                    document.getElementById("minimumPrice").value = '';
                } else {
                    document.getElementById("minimumPrice").value = result.property.minPrice;
                }
                if (result.property.petFee == "null") {
                    document.getElementById("petPrice").value = '';
                } else {
                    document.getElementById("petPrice").value = result.property.petFee;
                }
                if (result.property.cleaningFee == "null") {
                    document.getElementById("cleaningPrice").value = '';
                } else {
                    document.getElementById("cleaningPrice").value = result.property.cleaningFee;
                }
                if (result.property.otherFee == "null") {
                    document.getElementById("otherFee").value = '';
                } else {
                    document.getElementById("otherFee").value = result.property.otherFee;
                }
                if (result.property.otherFeeName == "null") {
                    document.getElementById("otherFeeName").value = '';
                } else {
                    document.getElementById("otherFeeName").value = result.property.otherFeeName;
                }
                if (result.property.otherFee > 0) {
                    document.getElementById("descFees").style.display = "block";
                } else {
                    document.getElementById("descFees").style.display = "none";
                }
                if (result.property.depositeBasicType == "null") {
                    document.getElementById("depositeBasicType").value = 0;
                } else {
                    document.getElementById("depositeBasicType").value = result.property.depositeBasicType;
                }
                if (result.property.depositType == "") {
                    document.getElementById("depositType").value = 0;
                } else {
                    document.getElementById("depositType").value = result.property.depositType;
                }
                if (result.property.serviceTaxPet == true) {
                    $('#serviceTaxPet').prop('checked', true);
                } else {
                    $('#serviceTaxPet').prop('checked', false);
                }
                if (result.property.serviceTaxCleaning == true) {
                    $('#serviceTaxCleaning').prop('checked', true);
                } else {
                    $('#serviceTaxCleaning').prop('checked', false);
                }
                if (result.property.serviceTaxOther == true) {
                    $('#serviceTaxOther').prop('checked', true);
                } else {
                    $('#serviceTaxOther').prop('checked', false);
                }
                if (result.property.serviceTaxDeposite == true) {
                    $('#serviceTaxDeposite').prop('checked', true);
                } else {
                    $('#serviceTaxDeposite').prop('checked', false);
                }
           
                if (result.property.depositeBasicType == 2  ) {
                    $('.depositAmount').empty();
                    document.getElementById("depositDisplay").style.display = "block";
                    if (result.property.depositType == "p") {
                        $('.depositAmount').append('<input type="number" id="deposit" class="form-control" onkeypress="return validate(event);" onInput="return check(event,value)" min="0" max="100" step="0.01" style="text-align:right;" name="depositAmount"><span class="input-group-addon" id="test"><i class="fas fa-percent"></i></span>')
                        document.getElementById("showHideCheckbox").style.display = "none";
                    } else {
                        $('.depositAmount').append('<span class="input-group-addon" id="test"><i class="fas fa-dollar-sign"></i></span><input type="text" id="deposit" onkeypress="return validate(event);" style="text-align:right;" class="form-control" onkeypress="return validate(event);" maxlength="4" name="depositAmount" placeholder="Amount">')
                        document.getElementById("showHideCheckbox").style.display = "none";
                    }

                    //document.getElementById("showHideCheckbox").style.display = "none";
                } else {
                    // $('.depositAmount').empty();
                    document.getElementById("depositDisplay").style.display = "none";
                    document.getElementById("showHideCheckbox").style.display = "none";
                    if (result.property.depositAmount != null && result.property.depositAmount != 0) {

                        $('.depositAmount').append('<span class="input-group-addon" id="test"><i class="fas fa-dollar-sign"></i></span><input type="text" id="deposit" style="text-align:right;" onkeypress="return validate(event);" class="form-control" onkeypress="return validate(event);" maxlength="4" name="depositAmount" placeholder="Amount">');
                        document.getElementById("showHideCheckbox").style.display = "block";
                    }
                }
                //console.log(result.property.depositAmount);
                var depositeAmount = '';
                if(result.property.depositAmount == null){
                    depositeAmount = 0;
                }else{
                    depositeAmount = result.property.depositAmount;
                }
                if (depositeAmount != 0) {
                    document.getElementById("deposit").value = result.property.depositAmount;
                }
                // 	if (result.property.depositAmount === "null") {
                // 		document.getElementById("deposit").value = "";
                // 	}
                // 	else {
                // 		document.getElementById("deposit").value = result.property.depositAmount;
                // 	}
                // }

                document.getElementById("que_1").value = result.property.checkInTime;
                document.getElementById("que_2").value = result.property.checkInInstruction;
                document.getElementById("que_4").value = result.property.checkOutTime;
                document.getElementById("que_5").value = result.property.checkOutInstruction;
                // if (sessionStorage.getItem("minStayDays") == 0 || sessionStorage.getItem("minStayDays") == "null") {
                // 	document.getElementById("min_stay").value = 1;
                // } else {
                // 	document.getElementById("min_stay").value = sessionStorage.getItem("minStayDays");
                // }

                if ((result.property.pulledProperty == false)) {
                    $('.nonPmsAmenities').show();
                    $('#amenitiesShowHide').show();
                    $('#pmsAmenitiesShow').hide();
                } else {
                    $('.nonPmsAmenities').hide();
                    $('#amenitiesShowHide').hide();
                    $('#pmsAmenitiesShow').show();
                    var trHTMLAmenties = '';

                    var AmenitiesArray = [];
                    for (var feature = 0; feature < result.propertyFeatures.length; feature++) {
                        if (result.propertyFeatures[feature].pmsFeatureDescCategory == null) {
                            result.propertyFeatures[feature].pmsFeatureDescCategory = "Other";
                        }
                        if (AmenitiesArray.indexOf(result.propertyFeatures[feature].pmsFeatureDescCategory) == -1) {
                            AmenitiesArray.push(result.propertyFeatures[feature].pmsFeatureDescCategory)

                        }
                    }
                    for (var ArrayLoop = 0; ArrayLoop < AmenitiesArray.length; ArrayLoop++) {
                        trHTMLAmenties += '<h6 style="margin-bottom: 10px;word-break: break-all;">' + AmenitiesArray[ArrayLoop] + '</h6>'
                        for (var feature = 0; feature < result.propertyFeatures.length; feature++) {
                            if (result.propertyFeatures[feature].pmsFeatureDescCategory == AmenitiesArray[ArrayLoop]) {
                                trHTMLAmenties += '<label style="margin-left:10px; display: block; padding: 0px; margin-top: -8px; font-weight: 500;"><li class="AmenitiesLi">' + result.propertyFeatures[feature].pmsFeatureDesc + '</li></label>'
                            }

                        }
                    }
                    $('#pmsAmenities').append(trHTMLAmenties);
                }
                var imgarray = [];
                var idarray = [];

                result.hostPropertyAttachment.forEach(element => {
                    imgarray.push(element);
                });
                if (imgarray != null) {

                    sessionStorage.setItem("host-attachment-id-list", JSON.stringify(imgarray));

                    // $('#profile-img-tag').append("");
                    $.each(imgarray, function (index, value) {
                        //$('#profile-img-tag .list').append("<li class='ui-state-default'><a  class='fa fa-check-circle fa-lg'  title='Delete Image' id='item1'  onClick ='deleteImage(this)'></a>  <span title='Set Cover Image'  class='fa fa-times-circle fa-lg'  id="+value.hostPopertyAttachmentId + "  onClick ='setCoverImage(this)'></span>   <div class='img-wrap col-lg-4 col-sm-4 col-xs-6 thumbnail img-responsive'   id='image" + index + "' style='width:200px' ><span class='close' title='Delete Image' id='" + value.hostPopertyAttachmentId + "'  onClick ='deleteImage(this)'>&times;</span><span title='Set Cover Image'  class='fa fa-picture-o fa-lg' id='" + value.hostPopertyAttachmentId + "'  onClick ='setCoverImage(this)'></span>  <img  class='thumbnail  img-responsive'  src='" + value.fullFilePath + "'  data-id='" + value.hostPopertyAttachmentId + "'  ></div></li>");


                        $('#profile-img-tag .list').append("<li class='ui-state-default' id='" + value.hostPopertyAttachmentId + "' data-id='" + value.imgOrder + "' ><div class='img-wrap col-lg-4 col-sm-4 col-xs-6 thumbnail img-responsive'   id='image" + index + "' style='width:200px' ><span class='fa fa-times-circle fa-lg' title='Delete Image' id='" + value.hostPopertyAttachmentId + "'  onClick ='deleteImage(this)'></span><a title='Set Cover Image'  class='fa fa-picture-o fa-lg' id='" + value.hostPopertyAttachmentId + "'  onClick ='setCoverImage(this)'></a>  <img  class='thumbnail  img-responsive'  src='" + value.imageFullUrl + "'  data-id='" + value.hostPopertyAttachmentId + "'  ></div></li>");
                        //$('#profile-img-tag').append("<div class='image'  id='image"+ index + "'> <img  class='thumbnail' src='" + value.fullFilePath + "' /><a  id='" + value.hostPopertyAttachmentId +"' class='delete'  onClick ='deleteImage(this)'><i  class='fa fa-pencil fa-lg'></i></a><a id='" + value.hostPopertyAttachmentId +"' class='setcover' onClick ='setCoverImage(this)'><i class='fa fa-pencil fa-lg'></i></a></div> ");
                        //$('#profile-img-tag').append("<div class='img-wrap col-lg-4 col-sm-4 col-xs-6 thumbnail img-responsive'   id='image" + index + "' style='width:200px' ><span class='close' title='Delete Image' id='" + value.hostPopertyAttachmentId + "'  onClick ='deleteImage(this)'>&times;</span><span title='Set Cover Image'  class='fa fa-picture-o fa-lg' id='" + value.hostPopertyAttachmentId + "'  onClick ='setCoverImage(this)'></span>  <img  class='thumbnail  img-responsive'  src='" + value.fullFilePath + "'  data-id='" + value.hostPopertyAttachmentId + "'  ></div>");

                        $("#profile-img-tag").val("setImage");
                    });
                } else {
                    $('#profile-img-tag').append("<span>No Content</span>");
                }
                if (result.propertyUnitCalendarRate != null) {
                    document.getElementById("lisitngPrice").value = result.propertyUnitCalendarRate.basePrice;
                }
                googleAddress()

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('update Stock error: ' + textStatus);
            }

        });
    }

    // var editFlag = sessionStorage.getItem("isEditableFlag");
    var addflag = sessionStorage.getItem("isAddFlag");
    // document.getElementById("userId").value=sessionStorage.getItem("userId");
    //console.log( document.getElementById("userId").value);
    dataHeader.userId = document.getElementById("userId").value;
    var editFlag = sessionStorage.getItem("isEditableFlag");
    // if (editFlag == "true") {
    //     propertyDetails.unitId = parseInt(sessionStorage.getItem("unitId"));
    //     propertyDetails.propertyId = parseInt(sessionStorage.getItem("propertyId"));
    //     propertyDetails.active = document.getElementById("active").value;
    //     propertyDetails.isHide = document.getElementById("isHide").value;

    // -------------------------------------Get call Perticular Property----------------------------------------------------


    //---------------------------------------------End Get Call Perticular Property---------------------------------------------
    //}


    //---------------------------------------------Start Property Details Tab---------------------------------------------------------
    // $('#PropertyDetailsSave').click(function () {

    //     /* For Property Name field validation*/
    //     sessionStorage.setItem("isBackFlag", false);
    //     if (document.getElementById('propertyName').value == "") {
    //         document.getElementById("propertyName1").innerHTML = 'Please enter Name your Place.';
    //         document.getElementById("propertyName").focus();
    //         return false;
    //     } else {
    //         document.getElementById("propertyName1").innerHTML = "";
    //     }


    //     /* For Property Address field validation*/
    //     if (document.getElementById('autocomplete').value == "") {
    //         document.getElementById("property").innerHTML = 'Please enter your property Address.';
    //         document.getElementById("autocomplete").focus();
    //         return false;
    //     } else {
    //         document.getElementById("property").innerHTML = "";
    //     }

    //     /* For Property Address field validation*/
    //     if (document.getElementById('postal_code').value == "") {
    //         document.getElementById("property").innerHTML = 'Please enter Valid address.';
    //         document.getElementById("postal_code").focus();
    //         return false;
    //     } else {
    //         document.getElementById("property").innerHTML = "";
    //     }

    //     /* For Property Address field validation*/
    //     // if (document.getElementById('locality').value == "") {
    //     //     document.getElementById("property").innerHTML = 'Please enter Valid address.';
    //     //     document.getElementById("locality").focus();
    //     //     return false;
    //     // } else {
    //     //     document.getElementById("property").innerHTML = "";
    //     // }
    //     var accomodation = $('input[name=optradio]:checked').val();
    //     // proprty.addressline2 = document.getElementById("autocomplete").value
    //     proprty.addressline1 = document.getElementById("street_number").value + " " + document.getElementById("route").value;
    //     proprty.city = document.getElementById("locality").value;
    //     proprty.countryCode = document.getElementById("country").value;
    //     proprty.state = document.getElementById("administrative_area_level_1").value;
    //     proprty.postalCode = document.getElementById("postal_code").value;
    //     proprty.latitude = document.getElementById("lat").value;
    //     proprty.longitude = document.getElementById("lng").value;
    //     proprty.maxNoGuest = document.getElementById("noBeds").value;
    //     proprty.propertySubTypeId = document.getElementById("subPropertyType").value;
    //     proprty.propertyTypeId = document.getElementById("propertyType").value;
    //     proprty.propertyName = document.getElementById("propertyName").value;
    //     proprty.active = document.getElementById("active").value;
    //     proprty.isHide = document.getElementById("isHide").value;
    //     proprty.pulledProperty = "false";
    //     proprty.propertyAccessType = accomodation;
    //     proprty.addressFull = document.getElementById("street_number").value + " " + document.getElementById("route").value + " " + document.getElementById("locality").value + " " + document.getElementById("administrative_area_level_1").value + " " + document.getElementById("country").value + " " + document.getElementById("postal_code").value;
    //     console.log(JSON.stringify(proprty))
    //     if (parseInt(sessionStorage.getItem("propertyId")) == 0) {

    //         // proprty.unitId = 0;
    //         proprty.active = 0;
    //         proprty.isHide = 0;
    //         $.ajax({
    //             type: 'POST',
    //             //data: person,
    //             data: JSON.stringify(proprty),
    //             contentType: "application/json",
    //             dataType: "json",
    //             'headers': {
    //                 Authorization: localStorage.getItem('token') || '',
    //             },
    //             url: url + 'property',
    //             success: function (result) {
    //                 alert("hi");
    //                 console.log(result);
    //                 sessionStorage.setItem('pmsUnitId', result.pmsUnitId);
    //                 //    console.log(result.propertyId);
    //                 //    console.log(result.propertyHostUnit.unitId);

    //                 // sessionStorage.setItem("Property_Id", result.propertyId);
    //                 // sessionStorage.setItem("Property_HostUnitId", result.propertyHostUnit.unitId);

    //                 // propertyDetails.propertyId = result.propertyId;
    //                 // propertyDetails.unitId = result.propertyHostUnit.unitId;
    //                 // propertyDetails.userId = dataHeader.userId;
    //                 // propertyDetails.active = result.active;
    //                 // propertyDetails.isHide = result.isHide;


    //                 // console.log(propertyDetails.propertyId);
    //                 //    console.log(JSON.stringify(result));
    //                 //  console.log("record Save");

    //             },
    //             error: function (xhr, textStatus, errorThrown) {
    //                 //   console.log(JSON.stringify(proprty));
    //                 //    console.log("Record not Saved");
    //                 //    console.log(errorThrown);
    //                 //    console.log(textStatus);
    //             },


    //         });
    //     }
    //     else if (parseInt(sessionStorage.getItem("propertyId")) != 0) {
    //         // console.log(dataHeader.userId);

    //         proprty.pmsUnitId = sessionStorage.getItem('pmsUnitId');
    //         // proprty.propertyId = parseInt(sessionStorage.getItem("propertyId"));
    //         // proprty.active = document.getElementById("active").value;
    //         // proprty.isHide = document.getElementById("isHide").value;
    //         // console.log(JSON.stringify(proprty));
    //         $.ajax({
    //             type: 'PUT',
    //             data: JSON.stringify(proprty),
    //             contentType: "application/json",
    //             dataType: "json",
    //             'headers': {
    //                 Authorization: localStorage.getItem('token') || '',
    //             },
    //             url: url + '/property',
    //             success: function (result) {
    //                 // propertyDetails.propertyId = result.propertyId;
    //                 // propertyDetails.unitId = result.propertyHostUnit.unitId;
    //                 // propertyDetails.userId = dataHeader.userId;
    //                 // propertyDetails.active = result.active;
    //                 // propertyDetails.isHide = result.isHide;

    //                 // // console.log(JSON.stringify(proprty));
    //                 // //   console.log("Property Update");
    //                 // var object = new Object;
    //                 // object.id = result.propertyId;
    //                 // activeEditApi( object );
    //                 activeEditApi1(object);

    //                 // HandleSession(propertyDetails.propertyId );
    //             },
    //             error: function (xhr, textStatus, errorThrown) {
    //                 // console.log(JSON.stringify(proprty));
    //                 // console.log("Property not Updated");
    //             },
    //         });

    //     }
    // });
    //----------------------------------------------End Property Details Tab------------------------------------------------------

    //----------------------------------------------Start Bedroom & Bathroom Tab ---------------------------------------------------------
    // $('#BedroomSave').click(function () {

    //     // Refactor by Vaibhav
    //     if (document.getElementById('my_select').value == "") {
    //         document.getElementById("my_select1").innerHTML = 'Please enter Number of Bedroom.';
    //         document.getElementById("my_select").focus();
    //         return false;
    //     } else {
    //         document.getElementById("my_select1").innerHTML = "";
    //     }

    //     if (document.getElementById('noBaths').value == "0" || document.getElementById('noBaths').value == "") {
    //         document.getElementById("noBaths1").innerHTML = 'Please enter Number of Bathroom.';
    //         document.getElementById("noBaths").focus();
    //         return false;
    //     } else {
    //         document.getElementById("noBaths1").innerHTML = "";
    //     }

    //     //Refactor by Arbaaz Shikaglar


    //     var objBathCnt = document.getElementById("noBaths");
    //     console.log(objBathCnt);
    //     if (objBathCnt.value.indexOf('-') != -1) objBathCnt.value = 0;
    //     var TotBathCount = objBathCnt.value;
    //     var exitingBaths = sessionStorage.getItem("noBaths");

    //     // alert("exitingBaths"+exitingBaths);
    //     var currentBaths = $('#Bathroom .addBeds').length;




    //     //         var data1 = new Object();       
    //     //         data1.propertyId = propertyDetails.propertyId;
    //     //         data1.noOfBathroom = TotBathCount;
    //     //         data1.apiMode = "bathroom";
    //     //         data1.isWemasteApiCall = true;
    //     //         data1.unitId = propertyDetails.unitId;


    //     //         console.log(JSON.stringify(data1));


    //     //         $.ajax({
    //     //             type: 'PUT',
    //     //             data: JSON.stringify(data1),
    //     //             contentType: "application/json",
    //     //             dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
    //     //             url: url + 'v1/user/' + dataHeader.userId + '/property/unit',
    //     //             success: function (result) {
    //     //                 // console.log("bathroom Put-Api saved");
    //     //             },
    //     //             error: function (xhr, textStatus, errorThrown) {
    //     //                 // console.log("bathroom Put-Api not saved");
    //     //             },
    //     //         });




    //     //Refactor by Arbaaz Shikaglar

    //     // var data = new Object();
    //     // data.propertyId = propertyDetails.propertyId;
    //     proprty.noOfBedroom = document.getElementById("my_select").value;
    //     // proprty.noOfBeds = 0;
    //     proprty.noOfBathroom = TotBathCount;
    //     proprty.pmsUnitId = sessionStorage.getItem('pmsUnitId');
    //     // proprty.apiMode = "bedroom";
    //     // proprty.isWemasteApiCall = true;

    //     console.log(JSON.stringify(proprty));
    //     $.ajax({
    //         type: 'PUT',
    //         data: JSON.stringify(proprty),
    //         contentType: "application/json",
    //         dataType: "json",
    //         'headers': {
    //             Authorization: localStorage.getItem('token') || '',
    //         },
    //         url: url + 'property',
    //         success: function (result) {
    //             // console.log(result);
    //             alert('hi');
    //             sessionStorage.setItem("my_select", result.noOfBedroom)
    //             //    console.log(JSON.stringify(result));
    //             // console.log("Bed");
    //         },
    //         error: function (xhr, textStatus, errorThrown) {
    //             // console.log("Record not Saved");
    //             console.log(xhr);

    //             // console.log(textStatus);
    //         },
    //     });

    //     var bedroomDetails = [];
    //     var bedCountX = 0;
    //     var TotbedCount = document.getElementById("my_select").value;
    //     for (var bedCount = 0; bedCount <= TotbedCount; bedCount++) {
    //         var strlblSelected = document.getElementById("lblSelected" + bedCount).value;
    //         var lblBedCnt = document.getElementById("lblBedCnt" + bedCount);
    //         strlblbedroomId = document.getElementById("lblbedroomId" + bedCount).value;
    //         if (strlblbedroomId == 0) {
    //             strlblbedroomId = "null";
    //         }

    //         var bedcntps = (lblBedCnt.innerHTML).indexOf(' ');
    //         var bedcnt = (lblBedCnt.innerHTML).substring(0, bedcntps);
    //         // if ((bedcnt != "0" && bedCount == 0) || bedCount != 0) {
    //         //console.log(strlblSelected);
    //         if (bedcnt != "0") {
    //             var words = strlblSelected.split(',');
    //             var bedAmenities = new Object();
    //             var propertyBedroomWiseAminities = [];
    //             var i = 0;

    //             for (var bedCount1 = 0; bedCount1 < words.length; bedCount1++) {
    //                 words[bedCount1] = words[bedCount1].replace("undefined", '');
    //                 if (words[bedCount1] != "") {

    //                     // console.log(words[bedCount1]);
    //                     if (words[bedCount1] == "1") bedType = document.getElementById("bedSingle_" + bedCount);
    //                     if (words[bedCount1] == "2") bedType = document.getElementById("bedDouble_" + bedCount);
    //                     if (words[bedCount1] == "3") bedType = document.getElementById("bedQueen_" + bedCount);
    //                     if (words[bedCount1] == "4") bedType = document.getElementById("bedKing_" + bedCount);
    //                     if (words[bedCount1] == "5") bedType = document.getElementById("bedCrib_" + bedCount);
    //                     if (words[bedCount1] == "6") bedType = document.getElementById("bedCouch_" + bedCount);
    //                     if (words[bedCount1] == "7") bedType = document.getElementById("bedBunkbed_" + bedCount);

    //                     if (words[bedCount1] == "8") bedType = document.getElementById("bedAirMattress_" + bedCount);
    //                     if (words[bedCount1] == "9") bedType = document.getElementById("bedFloorMattress_" + bedCount);

    //                     if (words[bedCount1] == "10") bedType = document.getElementById("bedToddlerBed_" + bedCount);
    //                     if (words[bedCount1] == "11") bedType = document.getElementById("bedHammock_" + bedCount);
    //                     if (words[bedCount1] == "12") bedType = document.getElementById("bedWaterBed_" + bedCount);
    //                     if (bedType == null) {
    //                         //Sujata 18092018
    //                         var propertyBedroomWiseAminitiesD = new Object();
    //                         propertyBedroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    //                         propertyBedroomWiseAminitiesD.unitId = propertyDetails.unitId;
    //                         propertyBedroomWiseAminitiesD.bedroomId = (strlblbedroomId == "") ? "null" : parseInt(strlblbedroomId);
    //                         propertyBedroomWiseAminitiesD.aminitiesId = words[bedCount1];
    //                         propertyBedroomWiseAminitiesD.bedCount = 0;
    //                         propertyBedroomWiseAminitiesD.active = 0;
    //                         propertyBedroomWiseAminities[i] = propertyBedroomWiseAminitiesD;
    //                         i = i + 1;
    //                         //Sujata 18092018
    //                     }
    //                     else {
    //                         if (parseInt(bedType.value) > 0) {
    //                             var propertyBedroomWiseAminitiesD = new Object();
    //                             propertyBedroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    //                             propertyBedroomWiseAminitiesD.unitId = propertyDetails.unitId;
    //                             propertyBedroomWiseAminitiesD.bedroomId = "null";
    //                             propertyBedroomWiseAminitiesD.aminitiesId = words[bedCount1];
    //                             propertyBedroomWiseAminitiesD.bedCount = parseInt(bedType.value);
    //                             propertyBedroomWiseAminitiesD.active = 1;
    //                             propertyBedroomWiseAminities[i] = propertyBedroomWiseAminitiesD;
    //                             i = i + 1;
    //                         }
    //                         else {
    //                             //Sujata 18092018
    //                             var propertyBedroomWiseAminitiesD = new Object();
    //                             propertyBedroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    //                             propertyBedroomWiseAminitiesD.unitId = propertyDetails.unitId;
    //                             propertyBedroomWiseAminitiesD.bedroomId = (strlblbedroomId == "") ? "null" : parseInt(strlblbedroomId);
    //                             propertyBedroomWiseAminitiesD.aminitiesId = words[bedCount1];
    //                             propertyBedroomWiseAminitiesD.bedCount = 0;
    //                             propertyBedroomWiseAminitiesD.active = 0;
    //                             propertyBedroomWiseAminities[i] = propertyBedroomWiseAminitiesD;
    //                             i = i + 1;
    //                             //Sujata 18092018
    //                         }
    //                     }
    //                 }

    //             }
    //             //Sujata 18092018
    //             strlblSelected = "," + strlblSelected;
    //             for (var k = 1; k <= 12; k++) {

    //                 if (strlblSelected.indexOf("," + k + ",") == -1) {
    //                     var propertyBedroomWiseAminitiesD = new Object();
    //                     propertyBedroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    //                     propertyBedroomWiseAminitiesD.unitId = propertyDetails.unitId;
    //                     propertyBedroomWiseAminitiesD.bedroomId = (strlblbedroomId == "") ? "null" : parseInt(strlblbedroomId);
    //                     propertyBedroomWiseAminitiesD.aminitiesId = k;
    //                     propertyBedroomWiseAminitiesD.bedCount = 0;
    //                     propertyBedroomWiseAminitiesD.active = 0;
    //                     propertyBedroomWiseAminities[i] = propertyBedroomWiseAminitiesD;
    //                     i = i + 1;
    //                 }

    //             }
    //             //Sujata 18092018
    //             bedAmenities.propertyId = propertyDetails.propertyId;
    //             bedAmenities.unitId = propertyDetails.unitId;
    //             bedAmenities.bedroomId = (strlblbedroomId == "") ? "null" : parseInt(strlblbedroomId);
    //             bedAmenities.bedroomName = ((bedCount == 0) ? "Common Space" : "Bedroom" + bedCount);
    //             bedAmenities.bedroomTypeId = ((bedCount == 0) ? 2 : 1);
    //             bedAmenities.active = 1;
    //             bedAmenities.propertyBedroomWiseAminities = propertyBedroomWiseAminities;
    //             bedroomDetails[bedCountX] = bedAmenities;
    //             bedCountX = bedCountX + 1;
    //         }

    //     }



    //     // for (var k=1;k<=12;k++)
    //     //     {

    //     //         if(strlblSelected.indexOf(","+ k+",") == -1)
    //     //         {
    //     //         var propertyBedroomWiseAminitiesD = new Object();
    //     //         propertyBedroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    //     //         propertyBedroomWiseAminitiesD.unitId = propertyDetails.unitId;
    //     //         propertyBedroomWiseAminitiesD.bedroomId = (strlblbedroomId =="")? "null" : parseInt(strlblbedroomId);;
    //     //         propertyBedroomWiseAminitiesD.aminitiesId = k;
    //     //         propertyBedroomWiseAminitiesD.bedCount = 0;
    //     //         propertyBedroomWiseAminitiesD.active = 0;
    //     //         propertyBedroomWiseAminities[i] = propertyBedroomWiseAminitiesD;
    //     //         i=i+1;
    //     //         }

    //     //     }


    //     console.log(JSON.stringify(bedroomDetails));
    //     // console.log(JSON.stringify(bedroomDetails));


    //     $.ajax({
    //         type: 'POST',
    //         data: JSON.stringify(bedroomDetails),
    //         contentType: "application/json",
    //         dataType: "json",
    //         'headers': {
    //             Authorization: localStorage.getItem('token') || '',
    //         },
    //         url: url + 'v1/user/' + dataHeader.userId + '/property/' + propertyDetails.propertyId + '/bedroom',
    //         success: function (result) {
    //             //  console.log(JSON.stringify(result));
    //             //    console.log(JSON.stringify(result));
    //             // console.log("bedroom data save");
    //             //code added on 27112018

    //             var bedroomIdarr = [];
    //             var bedroomNamearr = [];
    //             var bedroomIdarrBfrSort = [];
    //             var bedroomIdarrsort = [];
    //             var chkComm = "N";
    //             if (result.length > 0) {
    //                 k = 0;
    //                 for (var iCheckCount = 0; iCheckCount < result.length; iCheckCount++) {
    //                     var typeofbed0 = result[iCheckCount].propertyBedroomType.bedroomTypeId;
    //                     BedroomType = typeofbed0;
    //                     if (typeofbed0 == "2") {
    //                         chkComm = "Y";
    //                         var ibedroomId = result[iCheckCount].bedroomId;
    //                         document.getElementById("lblbedroomId" + k).value = ibedroomId;
    //                         bedroomIdarr[k] = ibedroomId;
    //                         // bedroomNamearr[k]="Common Space";
    //                         //    k = k + 1;
    //                     }
    //                 }
    //                 if (chkComm == "N") bedroomIdarr[0] = null;
    //                 k = 1;
    //                 var v = 0;
    //                 for (i = 0; i < result.length; i++) {
    //                     var typeofbed0 = result[i].propertyBedroomType.bedroomTypeId;
    //                     if (typeofbed0 == "1") {
    //                         var ibedroomId = result[i].bedroomId;
    //                         bedroomIdarrBfrSort[v] = ibedroomId;
    //                         // bedroomNamearr[v]=result[i].bedroomName;
    //                         v = v + 1;
    //                     }
    //                 }



    //                 bedroomIdarrsort = bedroomIdarrBfrSort.sort();

    //                 for (y = 0; y < bedroomIdarrsort.length; y++) {
    //                     var ibedroomId = bedroomIdarrsort[y];
    //                     for (i = 0; i < result.length; i++) {
    //                         if (result[i].propertyBedroomType.bedroomTypeId == "1" && ibedroomId == result[i].bedroomId) {

    //                             var bedroomNamearr = result[i].bedroomName;
    //                             console.log(bedroomNamearr);
    //                             var pos = 0;
    //                             var poslen = 0;
    //                             if (bedroomNamearr.indexOf('Bedroom ') == 0) {
    //                                 pos = bedroomNamearr.indexOf('Bedroom ');
    //                                 poslen = 8;
    //                             } else {
    //                                 pos = bedroomNamearr.indexOf('Bedroom');
    //                                 poslen = 7;
    //                             }
    //                             var kt = bedroomNamearr.substring(pos + poslen, bedroomNamearr.length);
    //                             document.getElementById("lblbedroomId" + kt).value = ibedroomId;
    //                             var kt1 = parseInt(kt);
    //                             if (k != kt1) {
    //                                 for (var l = k; l <= kt1; l++) {
    //                                     if (l == kt1) {
    //                                         bedroomIdarr[l] = ibedroomId;
    //                                         k = kt1 + 1;
    //                                     }
    //                                     else {
    //                                         bedroomIdarr[l] = null;
    //                                     }
    //                                 }
    //                             }
    //                             else {
    //                                 bedroomIdarr[k] = ibedroomId;
    //                                 k = kt1 + 1;
    //                             }
    //                         }
    //                     }
    //                 }
    //                 sessionStorage.setItem("bedroomID", JSON.stringify(bedroomIdarr));
    //                 // sessionStorage.setItem("bedroomName", JSON.stringify(bedroomNamearr));
    //             }

    //             sessionStorage.setItem("isBackFlag", false);
    //             //Code added on 27112018

    //         },
    //         error: function (xhr, textStatus, errorThrown) {
    //             //console.log("Record not Saved");
    //             // console.log(errorThrown);

    //             // console.log(textStatus);
    //         },
    //     });
    //     // console.log(bedroomDetails);




    //     //bathroom


    //     var BathroomDetails = [];
    //     var j = 0;

    //     if (TotBathCount.indexOf('.') != -1) {
    //         TotBathCount = parseFloat(noBaths.value) + 0.5;
    //     }
    //     // console.log("A");

    //     var BathRoomArrayEx = JSON.parse(sessionStorage.getItem("bathroomID"));//no brackets

    //     for (var BathCount = 1; BathCount <= TotBathCount; BathCount++) {


    //         var strlblSelected = document.getElementById("lblBathAmenities_" + BathCount).innerText;
    //         var words = strlblSelected.split(',');
    //         var BathAmenities = new Object();
    //         var bathaddBaths = document.getElementById("addBaths_" + BathCount);
    //         var objlblBathroomId = document.getElementById("lblBathroomId_" + BathCount);
    //         var lblBathroomId = objlblBathroomId.value;
    //         var ibathroomTypeId = document.getElementById(bathaddBaths.id).options[document.getElementById(bathaddBaths.id).selectedIndex].value;

    //         var propertyBathroomWiseAminities = [];
    //         var i = 0;
    //         for (var BathCount1 = 0; BathCount1 < words.length; BathCount1++) {
    //             words[BathCount1] = words[BathCount1].replace('undefined', '');
    //             if (words[BathCount1] != "" && words[BathCount1] != null) {
    //                 var propertyBathroomWiseAminitiesD = new Object();
    //                 propertyBathroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    //                 propertyBathroomWiseAminitiesD.unitId = propertyDetails.unitId;
    //                 propertyBathroomWiseAminitiesD.bathroomId = (lblBathroomId == "" || lblBathroomId == undefined) ? "null" : parseInt(lblBathroomId);;
    //                 propertyBathroomWiseAminitiesD.aminitiesId = words[BathCount1];
    //                 propertyBathroomWiseAminitiesD.active = 1;
    //                 propertyBathroomWiseAminities[i] = propertyBathroomWiseAminitiesD;
    //                 i = i + 1;
    //             }
    //         }
    //         // Sujata 18092018
    //         // Please remove this comment when post and put api is same
    //         strlblSelected = "," + strlblSelected;
    //         for (x = 13; x < 20; x++) {
    //             if (strlblSelected.indexOf("" + x + ",") == -1) {
    //                 var propertyBathroomWiseAminitiesD = new Object();
    //                 propertyBathroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    //                 propertyBathroomWiseAminitiesD.unitId = propertyDetails.unitId;
    //                 propertyBathroomWiseAminitiesD.bathroomId = (lblBathroomId == "" || lblBathroomId == undefined) ? "null" : parseInt(lblBathroomId);
    //                 propertyBathroomWiseAminitiesD.aminitiesId = x;
    //                 propertyBathroomWiseAminitiesD.active = 0;
    //                 propertyBathroomWiseAminities[i] = propertyBathroomWiseAminitiesD;
    //                 i = i + 1;
    //             }
    //         }
    //         // Sujata 18092018
    //         BathAmenities.propertyId = propertyDetails.propertyId;
    //         BathAmenities.unitId = propertyDetails.unitId;
    //         BathAmenities.bathroomId = (lblBathroomId == "" || lblBathroomId == undefined) ? "null" : parseInt(lblBathroomId);
    //         BathAmenities.bathroomTypeId = ibathroomTypeId;
    //         BathAmenities.bathroomName = "Bathroom " + BathCount;
    //         BathAmenities.active = 1;
    //         BathAmenities.propertyBathroomWiseAminities = propertyBathroomWiseAminities;
    //         BathroomDetails[j] = BathAmenities;
    //         j = j + 1;
    //     }

    //     if (currentBaths < exitingBaths) {
    //         //alert("Delete");
    //         if (exitingBaths.indexOf('.') != -1) {
    //             exitingBaths = parseFloat(exitingBaths) + 0.5;
    //         }

    //         for (var BathCount = parseInt(TotBathCount) + 1; BathCount <= exitingBaths; BathCount++) {

    //             var lblBathroomId = ((BathRoomArrayEx[BathCount - 1] == null || BathRoomArrayEx[BathCount - 1] == undefined) ? "" : BathRoomArrayEx[BathCount - 1]);
    //             var BathAmenities = new Object();
    //             var propertyBathroomWiseAminities = [];
    //             var i = 0;

    //             for (x = 13; x < 20; x++) {
    //                 if (strlblSelected.indexOf("" + x + ",") == -1) {
    //                     var propertyBathroomWiseAminitiesD = new Object();
    //                     propertyBathroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    //                     propertyBathroomWiseAminitiesD.unitId = propertyDetails.unitId;
    //                     propertyBathroomWiseAminitiesD.bathroomId = (lblBathroomId == "" || lblBathroomId == undefined) ? "null" : parseInt(lblBathroomId);
    //                     propertyBathroomWiseAminitiesD.aminitiesId = x;
    //                     propertyBathroomWiseAminitiesD.active = 0;
    //                     propertyBathroomWiseAminities[i] = propertyBathroomWiseAminitiesD;
    //                     i = i + 1;
    //                 }
    //             }
    //             // Sujata 18092018
    //             BathAmenities.propertyId = propertyDetails.propertyId;
    //             BathAmenities.unitId = propertyDetails.unitId;
    //             BathAmenities.bathroomId = (lblBathroomId == "" || lblBathroomId == undefined) ? "null" : parseInt(lblBathroomId);
    //             BathAmenities.bathroomTypeId = 1;
    //             BathAmenities.bathroomName = "Bathroom " + BathCount;
    //             BathAmenities.active = 0;
    //             BathAmenities.propertyBathroomWiseAminities = propertyBathroomWiseAminities;
    //             BathroomDetails[j] = BathAmenities;
    //             j = j + 1;
    //         }
    //     }


    //     console.log("bathroomDetails" + JSON.stringify(BathroomDetails));
    //     $.ajax({
    //         type: 'POST',
    //         data: JSON.stringify(BathroomDetails),
    //         contentType: "application/json",
    //         dataType: "json",
    //         'headers': {
    //             Authorization: localStorage.getItem('token') || '',
    //         },
    //         url: url + 'v1/user/' + dataHeader.userId + '/property/' + propertyDetails.propertyId + '/bathroom',
    //         success: function (result) {
    //             // console.log("Bathroom"+JSON.stringify(result));
    //             //  console.log("Bathroom get save");     

    //             var bathroomIdarr = [];
    //             var bathroomIdarrsort = [];
    //             var bathroomIdarrbfrsort = [];

    //             if (result.length > 0) {
    //                 for (i = 0; i < result.length; i++) {
    //                     bathroomIdarrbfrsort[i] = result[i].bathroomId;
    //                 }

    //                 bathroomIdarrsort = bathroomIdarrbfrsort.sort();

    //                 var v = 1;
    //                 for (i = 0; i < bathroomIdarrsort.length; i++) {
    //                     var ibathroomId = bathroomIdarrsort[i];
    //                     bathroomIdarr[i] = ibathroomId;
    //                     document.getElementById("lblBathroomId_" + v).value = ibathroomId;
    //                     v = v + 1;
    //                 }


    //                 sessionStorage.setItem("bathroomID", JSON.stringify(bathroomIdarr));
    //                 sessionStorage.setItem("noBaths", result.length);
    //             }




    //         },
    //         error: function (xhr, textStatus, errorThrown) {

    //         },
    //     });







    // });
    // //---------------------------------------------End Bedroom & Bathroom Tab---------------------------------------------------------


    // $('#backToBedroom').click(function () {
    //     //     var object = new Object;
    //     //    object.id =  propertyDetails.propertyId;
    //     //    activeEditApi1(object);
    //     //    ShowBedroomRow();
    //     // sessionStorage.setItem("isBackFlag", true);
    // });


    // $('#bedroom').click(function () {

    //     if (document.getElementById("my_select").value == "") {
    //         sessionStorage.setItem("isBackFlag", false);
    //     } else {
    //         sessionStorage.setItem("isBackFlag", true);
    //     }
    // });


    // //     $('#bathroomApi').click(function () {


    // //         var objBathCnt = document.getElementById("noBaths");
    // //         console.log(objBathCnt);


    // //         if (objBathCnt.value.indexOf('-') != -1) objBathCnt.value = 0;
    // //         var TotBathCount = objBathCnt.value;
    // //         var exitingBaths= sessionStorage.getItem("noBaths");

    // // // alert("exitingBaths"+exitingBaths);
    // //         var currentBaths = $('#Bathroom .addBeds').length;




    // //         var data1 = new Object();       
    // //         data1.propertyId = propertyDetails.propertyId;
    // //         data1.noOfBathroom = TotBathCount;
    // //         data1.apiMode = "bathroom";
    // //         data1.isWemasteApiCall = true;
    // //         data1.unitId = propertyDetails.unitId;
    // //         // propertyHostUnit.userId=dataHeader.userId;
    // //         // propertyHostUnit.unitId=propertyDetails.unitId;
    // //         // propertyHostUnit.noOfBathroom =TotBathCount;
    // //         // data.propertyHostUnit=propertyHostUnit;
    // //         // propertyHostUnit.noOfBeds = document.getElementById("noBed").value;

    // //         console.log(JSON.stringify(data1));

    // //         // data.main = document.getElementById("main").value;
    // //         // console.log('A');
    // //         $.ajax({
    // //             type: 'PUT',
    // //             data: JSON.stringify(data1),
    // //             contentType: "application/json",
    // //             dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
    // //             url: url + 'v1/user/' + dataHeader.userId + '/property/unit',
    // //             success: function (result) {
    // //                 // console.log("bathroom Put-Api saved");
    // //             },
    // //             error: function (xhr, textStatus, errorThrown) {
    // //                 // console.log("bathroom Put-Api not saved");
    // //             },
    // //         });







    // //         // alert("currentBaths"+currentBaths);


    // //         var BathroomDetails = [];
    // //         var j = 0;

    // //         if (TotBathCount.indexOf('.') != -1) {
    // //             TotBathCount = parseFloat(noBaths.value) + 0.5;
    // //         }
    // //         // console.log("A");

    // //            var BathRoomArrayEx= JSON.parse(sessionStorage.getItem("bathroomID"));//no brackets

    // //             for (var BathCount = 1; BathCount <= TotBathCount; BathCount++) {


    // //                 var strlblSelected = document.getElementById("lblBathAmenities_" + BathCount).innerText;
    // //                 var words = strlblSelected.split(',');
    // //                 var BathAmenities = new Object();
    // //                 var bathaddBaths = document.getElementById("addBaths_" + BathCount);
    // //                 var objlblBathroomId = document.getElementById("lblBathroomId_" + BathCount);
    // //                 var lblBathroomId = objlblBathroomId.value;
    // //                 var ibathroomTypeId = document.getElementById(bathaddBaths.id).options[document.getElementById(bathaddBaths.id).selectedIndex].value;

    // //                 var propertyBathroomWiseAminities = [];
    // //                 var i = 0;
    // //                 for (var BathCount1 = 0; BathCount1 < words.length; BathCount1++) {
    // //                     words[BathCount1] = words[BathCount1].replace('undefined', '');
    // //                     if (words[BathCount1] != "" && words[BathCount1] != null) {
    // //                         var propertyBathroomWiseAminitiesD = new Object();
    // //                         propertyBathroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    // //                         propertyBathroomWiseAminitiesD.unitId = propertyDetails.unitId;
    // //                         propertyBathroomWiseAminitiesD.bathroomId = (lblBathroomId == "" || lblBathroomId == undefined) ? "null" : parseInt(lblBathroomId);;
    // //                         propertyBathroomWiseAminitiesD.aminitiesId = words[BathCount1];
    // //                         propertyBathroomWiseAminitiesD.active = 1;
    // //                         propertyBathroomWiseAminities[i] = propertyBathroomWiseAminitiesD;
    // //                         i = i + 1;
    // //                     }
    // //                 }
    // //                 // Sujata 18092018
    // //                 // Please remove this comment when post and put api is same
    // //                 strlblSelected = "," + strlblSelected;
    // //                 for (x = 13; x < 20; x++) {
    // //                     if (strlblSelected.indexOf("" + x + ",") == -1) {
    // //                         var propertyBathroomWiseAminitiesD = new Object();
    // //                         propertyBathroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    // //                         propertyBathroomWiseAminitiesD.unitId = propertyDetails.unitId;
    // //                         propertyBathroomWiseAminitiesD.bathroomId = (lblBathroomId == "" || lblBathroomId == undefined) ? "null" : parseInt(lblBathroomId);
    // //                         propertyBathroomWiseAminitiesD.aminitiesId = x;
    // //                         propertyBathroomWiseAminitiesD.active = 0;
    // //                         propertyBathroomWiseAminities[i] = propertyBathroomWiseAminitiesD;
    // //                         i = i + 1;
    // //                     }
    // //                 }
    // //                 // Sujata 18092018
    // //                 BathAmenities.propertyId = propertyDetails.propertyId;
    // //                 BathAmenities.unitId = propertyDetails.unitId;
    // //                 BathAmenities.bathroomId = (lblBathroomId == "" || lblBathroomId == undefined) ? "null" : parseInt(lblBathroomId);
    // //                 BathAmenities.bathroomTypeId = ibathroomTypeId;
    // //                 BathAmenities.bathroomName = "Bathroom " + BathCount;
    // //                 BathAmenities.active = 1;
    // //                 BathAmenities.propertyBathroomWiseAminities = propertyBathroomWiseAminities;
    // //                 BathroomDetails[j] = BathAmenities;
    // //                 j = j + 1;
    // //             }

    // //             if(currentBaths < exitingBaths){           
    // //                 //alert("Delete");
    // //                 if (exitingBaths.indexOf('.') != -1) {
    // //                     exitingBaths = parseFloat(exitingBaths) + 0.5;
    // //                 }

    // //              for (var BathCount = parseInt(TotBathCount) +1 ; BathCount <= exitingBaths; BathCount++) {

    // //                  var lblBathroomId =  ((BathRoomArrayEx[BathCount -1] == null || BathRoomArrayEx[BathCount -1] == undefined) ? "" : BathRoomArrayEx[BathCount -1]);   
    // //                  var BathAmenities = new Object();
    // //                  var propertyBathroomWiseAminities = [];
    // //                 var i = 0;

    // //                  for (x = 13; x < 20; x++) {
    // //                      if (strlblSelected.indexOf("" + x + ",") == -1) {
    // //                          var propertyBathroomWiseAminitiesD = new Object();
    // //                          propertyBathroomWiseAminitiesD.propertyId = propertyDetails.propertyId;
    // //                          propertyBathroomWiseAminitiesD.unitId = propertyDetails.unitId;
    // //                          propertyBathroomWiseAminitiesD.bathroomId = (lblBathroomId == "" || lblBathroomId == undefined) ? "null" : parseInt(lblBathroomId);
    // //                          propertyBathroomWiseAminitiesD.aminitiesId = x;
    // //                          propertyBathroomWiseAminitiesD.active = 0;
    // //                          propertyBathroomWiseAminities[i] = propertyBathroomWiseAminitiesD;
    // //                          i = i + 1;
    // //                      }
    // //                  }
    // //                  // Sujata 18092018
    // //                  BathAmenities.propertyId = propertyDetails.propertyId;
    // //                  BathAmenities.unitId = propertyDetails.unitId;
    // //                  BathAmenities.bathroomId = (lblBathroomId == "" || lblBathroomId == undefined) ? "null" : parseInt(lblBathroomId);
    // //                  BathAmenities.bathroomTypeId = 1;
    // //                  BathAmenities.bathroomName = "Bathroom " + BathCount;
    // //                  BathAmenities.active = 0;
    // //                  BathAmenities.propertyBathroomWiseAminities = propertyBathroomWiseAminities;
    // //                  BathroomDetails[j] = BathAmenities;
    // //                  j = j + 1;
    // //              }
    // //             }


    // //             console.log("bathroomDetails"+JSON.stringify(BathroomDetails));
    // //             $.ajax({
    // //                 type: 'POST',
    // //                 data: JSON.stringify(BathroomDetails),
    // //                 contentType: "application/json",
    // //                 dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
    // //                 url: url + 'v1/user/' + dataHeader.userId + '/property/' + propertyDetails.propertyId + '/bathroom',
    // //                 success: function (result) {
    // //                     // console.log("Bathroom"+JSON.stringify(result));
    // //                     //  console.log("Bathroom get save");     

    // //                     var bathroomIdarr = [];     
    // //                     var bathroomIdarrsort = [];
    // //                     var bathroomIdarrbfrsort = [];                                

    // //                     if (result.length > 0) { 
    // //                         for (i = 0; i < result.length; i++) {    
    // //                             bathroomIdarrbfrsort[i] = result[i].bathroomId;   
    // //                         }

    // //                         bathroomIdarrsort= bathroomIdarrbfrsort.sort();

    // //                         var v = 1;                        
    // //                         for (i = 0; i < bathroomIdarrsort.length; i++) {                                                        
    // //                                 var ibathroomId = bathroomIdarrsort[i];
    // //                                 bathroomIdarr[i] = ibathroomId;
    // //                                 document.getElementById("lblBathroomId_" + v).value = ibathroomId;
    // //                                 v = v + 1;   
    // //                         }


    // //                         sessionStorage.setItem("bathroomID", JSON.stringify(bathroomIdarr));
    // //                         sessionStorage.setItem("noBaths", result.length);
    // //                     }




    // //                 },
    // //                 error: function (xhr, textStatus, errorThrown) {

    // //                 },
    // //             });





    // //     });



    // //---------------------------------------------Start Amenities Tab---------------------------------------------------------

    // $('#AmenitiesApi').click(function () {

    //     var subtype = [];
    //     $("input:checkbox[class=chk]:checked").each(function () {
    //         // console.log($(this).val());
    //         var testData1 = new Object();
    //         testData1.propertyId = propertyDetails.propertyId;
    //         testData1.unitId = propertyDetails.unitId;
    //         testData1.propertyFeatureId = $(this).val();
    //         testData1.active = 1
    //         subtype.push(testData1);

    //         //  console.log($(this).val());

    //     });
    //     $("input:checkbox[class=chk]:not(:checked)").each(function () {
    //         //   console.log("unchecked");
    //         var testData1 = new Object();
    //         testData1.propertyId = propertyDetails.propertyId;
    //         testData1.unitId = propertyDetails.unitId;
    //         testData1.propertyFeatureId = $(this).val();
    //         testData1.active = 0
    //         subtype.push(testData1);

    //         //  console.log($(this).val());

    //     });
    //     // console.log(JSON.stringify(subtype));
    //     // console.log(subtype);
    //     // console.log(JSON.stringify(subtype));
    //     if (sessionStorage.getItem('externalId') == 'true') {

    //     } else {
    //         $.ajax({
    //             type: 'PUT',
    //             //data: person,
    //             data: JSON.stringify(subtype),
    //             contentType: "application/json",
    //             dataType: "json",
    //             'headers': {
    //                 Authorization: localStorage.getItem('token') || '',
    //             },
    //             url: url + 'v1/user/' + dataHeader.userId + '/property/' + propertyDetails.propertyId + '/feature',
    //             success: function (result) {

    //                 // console.log(JSON.stringify(result))
    //                 // console.log("save");

    //             },
    //             error: function (xhr, textStatus, errorThrown) {
    //                 // console.log("Record not Saved");
    //                 // console.log(errorThrown);
    //                 // console.log(textStatus);
    //             },


    //         });
    //     }

    //     var YogiData = [];
    //     var YogiAnswer = new Object();

    //     YogiAnswer.queId = 3,
    //         YogiAnswer.ansDesc = document.getElementById("que_3").value,
    //         YogiData.push(YogiAnswer)

    //     //console.log(JSON.stringify(YogiData));
    //     $.ajax({
    //         type: 'POST',
    //         data: JSON.stringify(YogiData),
    //         contentType: "application/json",
    //         dataType: "json",
    //         'headers': {
    //             Authorization: localStorage.getItem('token') || '',
    //         },
    //         url: url + 'v1/user/' + dataHeader.userId + '/property/' + propertyDetails.propertyId + '/yogians/list',
    //         success: function (result) {

    //         },
    //         error: function (xhr, textStatus, errorThrown) {

    //         },
    //     });
    // });
    // //---------------------------------------------End Amenities Tab---------------------------------------------------------


    // //---------------------------------------------Start Price Tab---------------------------------------------------------

    $('#PriceYogiApi').click(function () {

        var serviceTaxCleaning = $("#serviceTaxCleaning").is(":checked")
        if (serviceTaxCleaning == true) {
            serviceTaxCleaning = 1;
        } else {
            serviceTaxCleaning = 0;
        }

        var serviceTaxPet = $("#serviceTaxPet").is(":checked")
        if (serviceTaxPet == true) {
            serviceTaxPet = 1;
        } else {
            serviceTaxPet = 0;
        }

        var serviceTaxOther = $("#serviceTaxOther").is(":checked")
        if (serviceTaxOther == true) {
            serviceTaxOther = 1;
        } else {
            serviceTaxOther = 0;
        }

        var serviceTaxDeposite = $("#serviceTaxDeposite").is(":checked")
        if (serviceTaxDeposite == true) {
            serviceTaxDeposite = 1;
        } else {
            serviceTaxDeposite = 0;
        }

        if (document.getElementById("depositeBasicType").value == 2) {
            if (document.getElementById('depositType').value == "0") {
                document.getElementById("depositType1").innerHTML = 'Please enter select fee type.';
                document.getElementById("depositType").focus();
                return false;
            } else {
                document.getElementById("depositType1").innerHTML = '';
            }

        }

        if (document.getElementById('lisitngDiscount').value == "") {
            document.getElementById("lisitngDiscount1").innerHTML = 'Please enter the discount percentage.';
            document.getElementById("lisitngDiscount").focus();
            return false;
        } else {
            document.getElementById("lisitngDiscount1").innerHTML = "";
        }

        if (document.getElementById('lisitngDiscount').value < 5) {
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

        if (document.getElementById("otherFee").value > 0) {
            if (document.getElementById('otherFeeName').value == "") {
                document.getElementById("otherFeeName1").innerHTML = 'Please enter Description of Other Fee';
                document.getElementById("otherFeeName").focus();
                return false;
            } else {
                document.getElementById("otherFeeName1").innerHTML = '';
            }
        }

        if (document.getElementById("depositeBasicType").value != 0) {
            if (document.getElementById("deposit").value == "") {
                document.getElementById("deposit1").innerHTML = 'Please enter amount';
                document.getElementById("deposit").focus();
                return false;
            } else {
                document.getElementById("deposit1").innerHTML = '';
            }
            if (document.getElementById("deposit").value == 0) {
                document.getElementById("deposit1").innerHTML = 'Please enter the amount greater than 0';
                document.getElementById("deposit").focus();
                return false;
            } else {
                document.getElementById("deposit1").innerHTML = '';
            }
        }
        var Price = new Object();
        Price.discPer = document.getElementById("lisitngDiscount").value;
        Price.minPrice = document.getElementById("minimumPrice").value;
        // Price.status = "",
        // Price.basePrice = document.getElementById("lisitngPrice").value;
        Price.cleaningFee = document.getElementById("cleaningPrice").value;
        Price.petFee = document.getElementById("petPrice").value;
        Price.otherFee = document.getElementById("otherFee").value;
        Price.otherFeeName = document.getElementById("otherFeeName").value;
        Price.serviceTaxCleaning = serviceTaxCleaning;
        Price.serviceTaxPet = serviceTaxPet;
        Price.serviceTaxOther = serviceTaxOther;
        Price.serviceTaxDeposite = serviceTaxDeposite;
        Price.depositeBasicType = document.getElementById("depositeBasicType").value;
        if (Price.depositeBasicType == 2) {
            Price.depositType = document.getElementById("depositType").value;
        } else {
            Price.depositType = '';
        }
        if(Price.depositeBasicType == 0){
            Price.depositAmount = '';
        }else{
            Price.depositAmount = $('#deposit').val();
        }
        
        Price.minStayDays = document.getElementById("min_stay").value;
        Price.pmcId = document.getElementById('pmcId').value;
        Price.pmsUnitId = sessionStorage.getItem("pmsUnitId");

        // Price.checkInTime = document.getElementById("que_1").value;
        // proprty.checkInInstruction = document.getElementById("que_2").value;
        // proprty.checkOutTime = document.getElementById("que_4").value;
        // proprty.checkOutInstruction = document.getElementById("que_5").value;
        // Price.taxesT = document.getElementById("taxesT").value,

        // Price.petFeeType = document.getElementById("petPricePer").value,    
        // Price.cleaningFeeType = document.getElementById("cleaningPricePer").value;
        // Price.depositAmount = document.getElementById("DepositPrice").value;
        // Price.depositType = document.getElementById("depositAmount").value;
        // Price.status="p";
        // console.log(JSON.stringify(Price));
        // var propertyId = propertyDetails.propertyId;

        var taxTemplateIdex = document.getElementById("taxesT").value;
        // var CheckTime = new Object();
        // CheckTime.checkInTime = document.getElementById("que_1").value;
        // CheckTime.checkInInstruction = document.getElementById("que_2").value;
        // CheckTime.checkOutTime = document.getElementById("que_4").value;
        // CheckTime.checkOutInstruction = document.getElementById("que_5").value;
        var pmcId = document.getElementById('pmcId').value;
        var pmsUnitId = sessionStorage.getItem("pmsUnitId");
         console.log(JSON.stringify(Price));

        
        $.ajax({
            type: 'PUT',
            contentType: "application/json",
            dataType: "json",
            'headers': {
                Authorization: localStorage.getItem('token') || '',
            },
            // url: url + 'property',
            url: url +'property/tax/apply/pmsUnitId/'+ pmsUnitId +'/pmcId/'+ pmcId +'/taxTemplateId/'+ taxTemplateIdex,
            success: function (result) {
                console.log(JSON.stringify(result));
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                // document.getElementById("msg-body").innerHTML = "Something went wrong, please try again later";
                // $('#dyna-popup').modal('show');
            },
        });

        $.ajax({
            type: 'PUT',
            data: JSON.stringify(Price),
            contentType: "application/json",
            dataType: "json",
            'headers': {
                Authorization: localStorage.getItem('token') || '',
            },
            url: url + 'property/rate',
            success: function (result) {

                var PriceRate = new Object();
                PriceRate.basePrice = document.getElementById("lisitngPrice").value;
                PriceRate.pmcId = document.getElementById('pmcId').value;
                PriceRate.pmsUnitId = sessionStorage.getItem("pmsUnitId");

                console.log(JSON.stringify(PriceRate));

                $.ajax({
                    type: 'PUT',
                    //data: person,
                    data: JSON.stringify(PriceRate),
                    contentType: "application/json",
                    dataType: "json",
                    'headers': {
                        Authorization: localStorage.getItem('token') || '',
                    },
                    url: url + 'property/calendar/rate',
                    success: function (result) {
                        console.log(JSON.stringify(result));
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        // document.getElementById("msg-body").innerHTML = "Something went wrong, please try again later";
                        // $('#dyna-popup').modal('show');
                    },
                });

            },
            error: function (xhr, textStatus, errorThrown) {
                //  console.log("Record Price not Saved");
                console.log(xhr);

                // console.log(textStatus);
            },
        });
    });



    //     // console.log(taxTemplateIdex)


    // });

    // //---------------------------------------------End Price Tab---------------------------------------------------------



    // //---------------------------------------------Start Image Tab---------------------------------------------------------

    // var ImageUp;
    // var isPhotoBackButton = false;
    // var imagesArray = [];


    // $('input[type="file"]').change(function (event) {
    //     ImageUp = new FormData();

    //     if (isPhotoBackButton == true) {
    //         ImageUp = new FormData();
    //     }



    //     var files = event.target.files;

    //     console.log(files);
    //     var file;

    //     if (files == undefined) {
    //         sessionStorage.setItem("setImageId", "setImage");
    //     }
    //     else {
    //         if (files[0] == undefined) {
    //             sessionStorage.setItem("setImageId", "setImage");
    //         }
    //     }


    //     if (files.length < 50) {
    //         // console.log("images");
    //         for (var i = 0; i < files.length; i++) {

    //             file = files[i];
    //             if (file != undefined) {

    //                 imagesArray.push(file);

    //             }


    //         }
    //     } else {
    //         document.getElementById("msg-body").innerHTML = "Please upload atleast six to seven images";
    //         $('#dyna-popup').modal('show');
    //     }




    //     //console.log(ImageUp);

    // });



    // $('#backToPhotos').click(function () {
    //     isPhotoBackButton = true;
    //     $("#profile-img").val(null);
    //     ImageUp = null;
    //     imagesArray = [];
    // });
    // $('#description').click(function () {

    //     isPhotoBackButton = true;
    //     $("#profile-img").val(null);
    //     ImageUp = null;
    //     imagesArray = [];
    // });




    // $('#addPhotoApi').click(function () {

    //     /* For Property Description field validation*/
    //     if (document.getElementById('propertyDesc').value == "") {
    //         document.getElementById("propertyDesc1").innerHTML = 'Please enter Description of Property.';
    //         document.getElementById("propertyDesc").focus();
    //         return false;
    //     } else {
    //         document.getElementById("propertyDesc1").innerHTML = "";
    //     }

    //     // data.propertyId = propertyDetails.propertyId;
    //     //console.log(JSON.stringify(data));

    //     var addImage = document.getElementById('profile-img').value;
    //     var defaultImage = document.getElementById('profile-img-tag').value;
    //     var existingImages = $('#profile-img-tag .img-wrap').length;


    //     // alert(defaultImage);


    //     if (addImage == "" && existingImages == 0) {

    //         document.getElementById("profile-img1").innerHTML = 'Please Select Images.';
    //         document.getElementById("profile-img").focus();

    //         return false;


    //     } else {
    //         document.getElementById("profile-img1").innerHTML = "";
    //     }

    //     $('#spinner').modal();



    //     var addhouserule = document.getElementById("txtaddhouserule").value;
    //     proprty.propertyDesc = document.getElementById("propertyDesc").value;
    //     // data.active = propertyDetails.active;
    //     // data.isHide = propertyDetails.isHide;
    //     // data.userId = dataHeader.userId;

    //     var SChildren = $('input[name=optChildren]:checked', '#myForm').val();
    //     var SInfants = $('input[name=optInfants]:checked', '#myForm').val();
    //     var SPets = $('input[name=optPets]:checked', '#myForm').val();
    //     var SSmoking = $('input[name=optSmoking]:checked', '#myForm').val();
    //     var SEvents = $('input[name=optEvents]:checked', '#myForm').val();
    //     // var SoptDeposit = $('input[name=optDeposit]:checked', '#myForm').val();
    //     var SoptWheelChair = $('input[name=optWheelChair]:checked', '#myForm').val();
    //     proprty.suitableChild = SChildren;
    //     proprty.suitableInfant = SInfants;
    //     proprty.suitablePet = SPets;
    //     proprty.smokeAllowed = SSmoking;
    //     proprty.partyAllowed = SEvents;
    //     proprty.wheelchairAccessable = SoptWheelChair
    //     //data1.depositeAllowed = SoptDeposit;
    //     proprty.addHouseRule = addhouserule;
    //     // data1.apiMode = "requirements";
    //     // data1.isWemasteApiCall = true;

    //     console.log(JSON.stringify(proprty));
    //     $.ajax({
    //         type: 'PUT',
    //         data: JSON.stringify(proprty),
    //         contentType: "application/json",
    //         dataType: "json",
    //         'headers': {
    //             Authorization: localStorage.getItem('token') || '',
    //         },
    //         url: url + 'property',
    //         success: function (result) {
    //             alert('hi');
    //         },
    //         error: function (xhr, textStatus, errorThrown) {
    //         },
    //     });


    //     var selectdImage = document.getElementById('profile-img');
    //     //  var unSelectedImage = document.getElementById('profile-img').value;
    //     var checkfile = selectdImage.files.length;


    //     if (ImageUp != null) {
    //         if (imagesArray.length != 0 && imagesArray.length != null) {

    //             for (var img = 0; img < imagesArray.length; img++) {
    //                 var image = imagesArray[img];
    //                 if (image != "null") {
    //                     ImageUp.append('propertyFile', image);
    //                     ImageUp.append('userId', dataHeader.userId);
    //                     ImageUp.append('propertyId', propertyDetails.propertyId);
    //                     ImageUp.append('unitId', propertyDetails.unitId);
    //                 }
    //             }
    //         }

    //         var fileCheck = true;
    //     } else {
    //         var fileCheck = false;
    //     }


    //     var setImageId = sessionStorage.getItem("setImageId");

    //     if (checkfile != 0 && imagesArray != null && imagesArray.length != 0 && (fileCheck != false || setImageId != "setImage")) {
    //         $.ajax({
    //             url: url + 'v1/user/' + dataHeader.userId + '/property/' + propertyDetails.propertyId + '/unit/' + propertyDetails.unitId + '/attachment',
    //             dataType: "json",
    //             'headers': {
    //                 Authorization: localStorage.getItem('token') || '',
    //             },
    //             processData: false,
    //             contentType: false,
    //             data: ImageUp,
    //             type: 'POST'
    //         }).done(function (result) {
    //             document.getElementById("msg-body").innerHTML = "Image successfully saved";
    //             $('#dyna-popup').modal('show');

    //             setTimeout(function () {
    //                 $('#dyna-popup').modal('hide');
    //             }, 3000);
    //             // console.log("image sucessfully  Saved");
    //             $('#spinner').modal('hide');

    //         }).fail(function (a, b, c) {
    //             // console.log("Uploading process failed");
    //             // document.getElementById("msg-body").innerHTML = "Uploading process failed";
    //             // $('#dyna-popup').modal('show');

    //             // setTimeout(function () {
    //             //     $('#dyna-popup').modal('hide');
    //             // }, 3000);

    //             $('#spinner').modal('hide');
    //         });
    //     } else {
    //         // document.getElementById("msg-body").innerHTML = "Invalid Content";
    //         // $('#dyna-popup').modal('show');
    //         $('#spinner').modal('hide');
    //     }
    // });

    //---------------------------------------------End Image Tab---------------------------------------------------------

    //---------------------------------------------Start Publish Button---------------------------------------------------------

    $('#publish').click(function () {
        var pmcId = document.getElementById('pmcId').value;
        var pmsUnitId = sessionStorage.getItem("pmsUnitId");


        $.ajax({
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            'headers': {
                Authorization: localStorage.getItem('token') || '',
            },
            url: url + 'property/discrepancy/pmcid/' + pmcId + '/pmsunitid/' + pmsUnitId,
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
                    $('#dyna-popup').modal('show');
                } else {
                    $.ajax({
                        type: 'PUT',
                        //data: JSON.stringify(publishProperty),
                        contentType: "application/json",
                        dataType: "json",
                        'headers': {
                            Authorization: localStorage.getItem('token') || '',
                        },
                        url: url + 'property/publish/pmcId/' + pmcId + '/pmsUnitId/' + pmsUnitId + '/isPublishProperty/true',
                        success: function (result) {

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
    });
    //---------------------------------------------End Publish Button---------------------------------------------------------

    //---------------------------------------------Start Draft Button---------------------------------------------------------

    $('#saveAsDraft').click(function () {
        var pmcId = document.getElementById('pmcId').value;
        var pmsUnitId = sessionStorage.getItem("pmsUnitId");

        // console.log(JSON.stringify(data));
        $.ajax({
            type: 'PUT',
            //data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            'headers': {
                Authorization: localStorage.getItem('token') || '',
            },
            url: url + 'property/draft/pmcId/' + pmcId + '/pmsUnitId/' + pmsUnitId,
            success: function (result) {

                sessionStorage.setItem("Preview_ID", pmsUnitId);
                location.href = "/Preview";
            },
            error: function (xhr, textStatus, errorThrown) {
                //   console.log("Record active not Saved");
                // console.log(JSON.stringify(data));
            },
        });
    });
    ////---------------------------------------------End Draft Button---------------------------------------------------


    //---------------------------------------------Start Preview Display---------------------------------------------------------

    function getPreviewData() {

        $.ajax({

            type: "GET",
            dataType: "json",
            'headers': {
                Authorization: localStorage.getItem('token') || '',
            },
            url: url + 'property/user/0/pmcId/' + pmcId + '/pmsUnitId/' + sessionStorage.getItem("pmsUnitId"),

            success: function (result) {
                $('#Main_previewPro').empty();
                $('#bedroom_details').empty();
                $('#bathroom_details').empty();
                $('#amenties_details').empty();
                $('#House_Rules').empty();
                $('.carousel-inner').empty();
                $('.carousel-indicators').empty();

                if (result.property.propertyAccessType == undefined || result.property.propertyAccessType == "" || result.property.propertyAccessType == null) {
                    result.property.propertyAccessType = '';
                } else {
                    result.property.propertyAccessType = result.property.propertyAccessType;
                }

                if (result.property.propertyName == undefined || result.property.propertyName == "" || result.property.propertyName == null) {
                    result.property.propertyName = "Untitled Property";
                } else {
                    result.property.propertyName = result.property.propertyName;
                }

                if (result.property.propertyDesc == undefined || result.property.propertyDesc == "" || result.property.propertyDesc == null) {
                    result.property.propertyDesc = "";
                } else {
                    result.property.propertyDesc = result.property.propertyDesc;
                }

                if (result.property.noOfBedroom == "999") {
                    result.property.noOfBedroom = "0";
                } else {
                    result.property.noOfBedroom = result.property.noOfBedroom;
                }

                //----------------------------------------------Image Display ----------------------------------------------------------------

                var trHTMLProp = '';
                var trHTML = '';
                var imageList = result.hostPropertyAttachment;
                if (JSON.stringify(imageList) == '[]') {

                } else {

                    for (var i = 0; i < imageList.length; i++) {

                        $('<div class="item"><img src="' + imageList[i].imageFullUrl + '" style="width:100%;  height:555px;"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
                        $('<li data-target="#carousel-generic" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators')

                    }
                }

                $('.item').first().addClass('active');
                $('.carousel-indicators > li').first().addClass('active');
                $('#carousel-generic').carousel();

                //------------------------------------------------------Property Details--------------------------------------------------------------
                trHTMLProp += '<label style="margin-left:15px;font: bold;font-size: 16px;font-weight: 700; ">' + result.property.propertyAccessType + '</label><br/><label style="margin-left:15px;font: bold;font-size: 16px;font-weight: 700; ">' + result.property.propertyName + '</label><br/><br/>'
                if (result.property.maxNoGuest == 1) {
                    trHTMLProp += '<div class="row"><div class="col-sm-4"><label style="margin-left:15px;font: bold;font-size: 18px;font-weight: 700; "><i class="fas fa-users"></i></label> <label style="margin-left:10px;font: bold;font-size: 16px;font-weight: 700; ">' + result.property.maxNoGuest + ' Guest</label> </div>'
                } else {
                    trHTMLProp += '<div class="row"><div class="col-sm-4"><label style="margin-left:15px;font: bold;font-size: 18px;font-weight: 700; "><i class="fas fa-users"></i></label> <label style="margin-left:10px;font: bold;font-size: 16px;font-weight: 700; ">' + result.property.maxNoGuest + ' Guests</label> </div>'
                }

                if (result.property.noOfBedroom <= 1) {
                    trHTMLProp += '<label style="margin-left:80px;font: bold;font-size: 18px;font-weight: 700; "><i class="fas fa-bed"></i></label> <label style="margin-left:10px;font: bold;font-size: 16px;font-weight: 700; ">' + result.property.noOfBedroom + ' Bedroom</label>'
                } else {
                    trHTMLProp += '<label style="margin-left:80px;font: bold;font-size: 18px;font-weight: 700; "><i class="fas fa-bed"></i></label> <label style="margin-left:10px;font: bold;font-size: 16px;font-weight: 700; ">' + result.property.noOfBedroom + ' Bedrooms</label>'
                }
                // '<div class="row"><div class="col-sm-6"><label style="margin-left:15px;font: bold;font-size: 18px;font-weight: 700; "><i class="fas fa-bed"></i></label><label style="margin-left:15px;font: bold;font-size: 16px;font-weight: 700; ">' + result.propertyHostUnit.noOfBeds + ' Beds</label></div>' +
                if (result.property.noOfBathroom <= 1) {
                    trHTMLProp += '<div class="pull-right"><label style="margin-right:25px;font: bold;font-size: 18px;font-weight: 700; "><i class="fas fa-bath"></i> </label><label style="margin-right:35px;font: bold;font-size: 16px;font-weight: 700; "> ' + result.property.noOfBathroom + ' Bathroom</label></div></div>'
                } else {
                    trHTMLProp += '<div class="pull-right"><label style="margin-right:25px;font: bold;font-size: 18px;font-weight: 700; "><i class="fas fa-bath"></i> </label><label style="margin-right:35px;font: bold;font-size: 16px;font-weight: 700; "> ' + result.property.noOfBathroom + ' Bathrooms</label></div></div>'
                }
                trHTMLProp += '<label style="margin-left:15px;font: bold;font-size: 18px;font-weight: 700; "><i class="fa fa-map-marker"></i></label> <label style="margin-left:10px;font: bold;font-size: 16px;font-weight: 700; ">' + result.property.addressline1 + ', ' + result.property.city + ', ' + result.property.state + ' ' + result.property.postalCode + ' ' + result.property.countryCode + ' </label><br/>' +
                    '<label style="margin-left:20px;font: bold;font-size: 16px;font-weight: 500; ">' + result.property.propertyDesc + '</label><br/>'
                // + ', ' + result.propertyLocations[0].city + ', ' + result.propertyLocations[0].state + ', ' + result.propertyLocations[0].countryCode +
                $('#Main_previewPro').append(trHTMLProp);

                //----------------------------------------------------------Bedroom Display-----------------------------------------------------
                // var bedroomIdarrBfrSort = [];
                // var bedroomIdarrsort = [];
                // var trHTMLBed = '';
                // var iunitBedroomsCnt = result.propertyHostUnit.unitBedRooms.length;
                // if (iunitBedroomsCnt == "0") {

                // } else {
                // 	$('#bedroom_details').append('<div id="bedroom"><div class="panel panel-default"><div class="panel-heading">' +
                // 		'<h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse2">' +
                // 		'Accomodations <a class="pull-right" data-toggle="collapse" data-parent="#accordion" href="#collapse2"><i class="fas fa-angle-down"></i></a></a></h4></div><div id="collapse2" class="panel-collapse collapse">' +
                // 		'<div class="panel-body"><div id="Main_previewBed"></div></div></div></div></div>')
                // 	for (i = 0; i < iunitBedroomsCnt; i++) {
                // 		var typeofbed0 = result.propertyHostUnit.unitBedRooms[i].propertyBedroomType.bedroomTypeId;

                // 		if (typeofbed0 == "2") {
                // 			trHTMLBed += '<label  style="font: bold;margin-left:15px;font-size: 16px;font-weight: 700;">' + result.propertyHostUnit.unitBedRooms[i].bedroomName + ':</label>'
                // 			for (var j = 0; j < result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities.length; j++) {
                // 				var name = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId;
                // 				trHTMLBed += '<label style="margin-left:5px;">' + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].bedCount + '' + (" ") + '' + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesDesc + ((j + 1 == result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities.length) ? '' : ',') + '</label>'

                // 			}
                // 		}

                // 	}
                // 	var v = 0;


                // 	for (i = 0; i < iunitBedroomsCnt; i++) {

                // 		var typeofbed0 = result.propertyHostUnit.unitBedRooms[i].propertyBedroomType.bedroomTypeId;
                // 		if (typeofbed0 == "1") {
                // 			var ibedroomId = result.propertyHostUnit.unitBedRooms[i].bedroomId;
                // 			bedroomIdarrBfrSort[v] = ibedroomId;
                // 			v = v + 1;
                // 		}
                // 	}
                // 	bedroomIdarrsort = bedroomIdarrBfrSort.sort();

                // 	for (b = 0; b < bedroomIdarrsort.length; b++) {
                // 		var ibedroomId = bedroomIdarrsort[b];

                // 		for (i = 0; i < iunitBedroomsCnt; i++) {
                // 			var typeofbed0 = result.propertyHostUnit.unitBedRooms[i].propertyBedroomType.bedroomTypeId;

                // 			if (typeofbed0 == "1" && ibedroomId == result.propertyHostUnit.unitBedRooms[i].bedroomId) {
                // 				trHTMLBed += '<br/><label  style="font: bold;margin-left:15px;font-size: 16px;font-weight: 700;">' + result.propertyHostUnit.unitBedRooms[i].bedroomName + ':</label>'
                // 				for (var j = 0; j < result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities.length; j++) {
                // 					var name = result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesId;
                // 					trHTMLBed += '<label style="margin-left:5px;">' + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].bedCount + '' + (" ") + '' + result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities[j].propertyAmenity.amenitiesDesc + ((j + 1 == result.propertyHostUnit.unitBedRooms[i].propertyBedroomWiseAminities.length) ? '' : ',') + '</label>'

                // 				}
                // 			}

                // 		}

                // 	}
                // }

                // $('#Main_previewBed').append(trHTMLBed);

                //-------------------------------------------------------Amenities Display-----------------------------------------------------------------
                var trHTMLAmenties = '';
                if (result.propertyFeatures.length == "0") {

                }
                else {
                    $('#amenties_details').append('<div id="bathroom"><div class="panel panel-default"><div class="panel-heading">' +
                        '<h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse4">' +
                        'Amenities<a class="pull-right" data-toggle="collapse" data-parent="#accordion" href="#collapse4"><i class="fas fa-angle-down"></i></a></a></h4></div><div id="collapse4" class="panel-collapse collapse">' +
                        '<div class="panel-body"><ul class="AmenitiesColumn"><div id="Main_previewAmenties"></div></ul></div></div></div></div>')

                    for (var feature = 0; feature < result.propertyFeatures.length; feature++) {
                        trHTMLAmenties += '<li style="margin-left:15px; font-size: 16px;font-weight: 500;" >' + result.propertyFeatures[feature].pmsFeatureDesc + '</li>'
                        // <hr><label style="font: bold;font-size: 18px;font-weight: 800;padding-left: 3px;">Review</label><br>'
                    }


                }
                //}
                $('#Main_previewAmenties').append(trHTMLAmenties);

                //------------------------------------------------------------House Rules Display------------------------------------------------------
                $('#House_Rules').append('<div id="bathroom"><div class="panel panel-default"><div class="panel-heading">' +
                    '<h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse5">' +
                    'House Rules <a class="pull-right" data-toggle="collapse" data-parent="#accordion" href="#collapse5"><i class="fas fa-angle-down"></i></a></a></h4></div><div id="collapse5" class="panel-collapse collapse">' +
                    '<div class="panel-body"><div id="Main_houseRules"></div></div></div></div></div>')

                var checkInTime;
                var checkoutTime;
                if (result.property.checkInTime != "" || result.property.checkInTime != undefined || result.property.checkInTime != null) {
                    checkInTime = result.property.checkInTime;
                }
                if (result.property.checkOutTime != "" || result.property.checkOutTime != undefined || result.property.checkOutTime != null) {
                    checkoutTime = result.property.checkOutTime;
                }

                if (result.property.checkInTime != undefined || result.property.checkInTime != null) {
                    $('#Main_houseRules').append('<div class="row"><div class="col-sm-6"><label style="margin-left:10px;font: bold;font-size: 16px;font-weight: 500; ">Check-In: ' + checkInTime + '</label> </div>' +
                        '<label style="margin-left:10px;font: bold;font-size: 16px;font-weight: 500; "> Check-Out: ' + checkoutTime + '</label>')
                }
                if (result.property.suitableChild == true) {
                    $('#Main_houseRules').append('<label style="margin-left:15px; font-size: 16px;font-weight: 500;" >Suitable for children (2-12 years)</label><br>');
                } else {

                }
                if (result.property.suitableInfant == true) {
                    $('#Main_houseRules').append('<label style="margin-left:15px; font-size: 16px;font-weight: 500;" >Suitable for infants (Under 2 years)</label><br>');
                } else {

                }
                if (result.property.suitablePet == true) {
                    $('#Main_houseRules').append('<label style="margin-left:15px; font-size: 16px;font-weight: 500;" >Pets allowed</label><br>');
                } else if (result.property.suitablePet == false) {
                    $('#Main_houseRules').append('<label style="margin-left:15px; font-size: 16px;font-weight: 500;" >Pets not allowed</label><br>');
                } else {

                }

                if (result.property.smokeAllowed == true) {
                    $('#Main_houseRules').append('<label style="margin-left:15px; font-size: 16px;font-weight: 500;" >Smoking allowed</label><br>');
                } else if (result.property.smokeAllowed == false) {
                    $('#Main_houseRules').append('<label style="margin-left:15px; font-size: 16px;font-weight: 500;" >Smoking not allowed</label><br>');
                } else {

                }
                if (result.property.partyAllowed == true) {
                    $('#Main_houseRules').append('<label style="margin-left:15px; font-size: 16px;font-weight: 500;" >Parties or events allowed</label><br>');
                } else if (result.property.partyAllowed == false) {
                    $('#Main_houseRules').append('<label style="margin-left:15px; font-size: 16px;font-weight: 500;" >Parties or events not allowed</label><br>');
                } else {

                }
                if (result.property.wheelchairAccessable == true) {
                    $('#Main_houseRules').append('<label style="margin-left:15px; font-size: 16px;font-weight: 500;" >Wheelchair Accessable</label><br>');
                }
                if (result.property.addHouseRule != null && result.property.addHouseRule != undefined && result.property.addHouseRule != '') {
                    $('#Main_houseRules').append('<label style="margin-left:15px; font-size: 16px;font-weight: 500;" >' + result.property.addHouseRule + '</label>');
                } else {

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('update Stock error: ' + textStatus);
            }

        });
    }
    //---------------------------------------------End Preview Display---------------------------------------------------------


    $('#completed').click(function () {
        getPreviewData();
    });
});

$('#propertyBack').click(function () {
    var propertyId = sessionStorage.getItem("Property_Id")
    sessionStorage.setItem('propertyId', propertyId)
});

$('#propDetails').click(function () {
    var propertyId = sessionStorage.getItem("Property_Id")
    sessionStorage.setItem('propertyId', propertyId)
});