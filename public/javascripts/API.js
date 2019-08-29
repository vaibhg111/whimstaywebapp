//var globalUrl = "http://ec2-18-191-150-7.us-east-2.compute.amazonaws.com:8080/;

//var localUrl="http://localhost:8080";


//Main Property API Call
function myFunction(input) {
    //console.log(input);
    var input = JSON.parse(input);

    //catagary { "id": 6, "parent": "#", "text": "House" },
    var jsondata = [];
    // SubProperty(jsondata);

    for (var i = 0; i < input.length; i++) {

        // console.log(input[i]);  
        if (input[i].levelId == 1) {
            var testData = new Object();
            testData.id = input[i].propertyTypeId;
            testData.parent = "#";
            testData.text = input[i].propertyType;

            jsondata.push(testData);
        }
    }
    MainProperty(jsondata);
    console.log(input);
}
function MainProperty(jsondata) {
    //aa=input;


    $('#MainProperty').jstree({

        'core': {
            'data': jsondata


        }
    });
}

//Sub Property API Call

// function myfu() {
var data = new Object();
var filename1 = new Object();
var temp = 0;
var Continuecount = 0;
var globalUrl = "http://13.59.91.130:8083";
var fileattch;
var Photo_propertype_ID;
$(document).ready(function () {
      $.ajax({

            headers: { "Content-Type": "application/json" },
            type: "GET",
            url: globalUrl+"/v1/property/types",
             success: function (result) {
                //console.log(result);

                var subtype = [];

                for (var i = 0; i < result.length; i++) {
                    if (result[i].levelId == 1) {
                        var testData1 = new Object();
                        testData1.id = result[i].propertyTypeId;
                        testData1.parent = "#";
                        testData1.text = result[i].propertyType;
                        subtype.push(testData1);
                    }
                }
                MainProperty(subtype);

                console.log("-----------")
                console.log(result);
                console.log("-----------")

                // alert(output);
                // output += "</tbody></table>";

                // displayResources.html(output);
                $("table").addClass("table");

            },
            error: function (jqXHR, textStatus, errorThrown) { alert('update Stock error: ' + textStatus); }

        });



    $("#MainProperty").on("click", "li > a", function () {

        var id = $(this).closest("li").attr("id");
        var Property_Text = ($(this).text());
        data.propertyTypeId = id;
        // var text = $(this).attrtext();
        $(this).siblings(".jstree-icon").click();
        $.ajax({

            headers: { "Content-Type": "application/json" },
            type: "GET",
            url: globalUrl+"/v1/property/types",
            success: function (result) {
                //console.log(result);

                var subtype = [];

                for (var i = 0; i < result.length; i++) {
                    if (result[i].levelId == 2) {
                        var testData1 = new Object();
                        testData1.id = result[i].propertyTypeId;
                        testData1.parent = "#";
                        testData1.text = result[i].propertyType;
                        subtype.push(testData1);
                    }
                }
                SubProperty(subtype);

                console.log("-----------")
                console.log(result);
                console.log("-----------")

                // alert(output);
                // output += "</tbody></table>";

                // displayResources.html(output);
                $("table").addClass("table");

            },
            error: function (jqXHR, textStatus, errorThrown) { alert('update Stock error: ' + textStatus); }

        });


        var Property_ID = ($(this).attr("id"));


        if (Property_ID != '') {
            document.getElementById("select_P_nm").value = Property_Text;
            $("#MainProperty").hide();
            $("#div_sub_property").show();
        }


        $("#sub_property").on("click", "li > a", function () {
            document.getElementById("maindiv1").innerHTML = "Property Access";
            document.getElementById("maindiv2").innerHTML = "Choose Oroperty Access that your guests will have for your new listing.";
            var SubProperty_ID = $(this).closest("li").attr("id");
            // var Property_Text = ($(this).text());
            data.propertyUnitTypeId = SubProperty_ID;

            $.ajax({

                headers: { "Content-Type": "application/json" },
                type: "GET",
                url: globalUrl+"/v1/property/access",
                success: function (result) {
                    //console.log(result);

                    var subtype = [];

                    for (var i = 0; i < result.length; i++) {

                        var testData1 = new Object();
                        testData1.id = result[i].propertyAccId;
                        testData1.parent = "#";
                        testData1.text = result[i].accessType;
                        subtype.push(testData1);

                    }
                    AccessProperty(subtype)
                    console.log("-----------")
                    console.log(result);
                    console.log("-----------")

                    // alert(output);
                    // output += "</tbody></table>";

                    // displayResources.html(output);
                    $("table").addClass("table");

                },
                error: function (jqXHR, textStatus, errorThrown) { alert('update Stock error: ' + textStatus); }

            });

            // $("#sub_property li").click(function () {

            //                    
            // var SubProperty_ID = ($(this).attr("id"));


            if (SubProperty_ID != '') {
                $("#div_sub_property").hide();
                $("#AccessProperty").show();
            }


        });
        $("#AccessProperty").on("click", "li > a", function () {
            var AccessProperty_ID = $(this).closest("li").attr("id");
            data.propertyAccId = AccessProperty_ID;
            if (AccessProperty_ID != '') {
                document.getElementById("select_Sub_property").value = ($(this).text());
                document.getElementById("select_Guest").value = "Guest";
                // document.getElementById("select_bed").value = "Bed";
                $("#AccessProperty").hide();
                $("#SubAccessProperty").show();
            }
        });
        var catstr = "";
        $("#amenties").on("click", "li > a", function () {
            var amenties_id = $(this).closest("li").attr("id");
            $(this).css('color', 'black');
            if (catstr == "") {
                catstr = amenties_id;
            }
            else {
                catstr = catstr + "," + amenties_id;
            }
            data.propertyFeatureId = catstr;
            temp = 1;

        });

        $("#Access").on("click", "li > a", function () {
            var access_id = $(this).closest("li").attr("id");
            $(this).css('color', 'black');

            if (catstr == "") {
                catstr = access_id;
            }
            else {
                catstr = catstr + "," + access_id;
            }

            data.propertyFeatureId = catstr;


        });

        $("#bedDetails").on("click", "li > a", function () {
            //    alert('bed');           
            var bedAminitiesId = $(this).closest("li").attr("id");
            data.bedAminitiesId = bedAminitiesId;
            data.noOfBeds = document.getElementById("Bedcount_1").value;
            // alert(document.getElementById("Bedcount_1").innerHTML);
            // alert(document.getElementById("Bedcount").innerHTML);
            document.getElementById("select_Sub_property_3").value = document.getElementById("select_Sub_property").value;
            document.getElementById("select_Guest_3").value = (document.getElementById("Bedcount").innerHTML) + "Guest";
            document.getElementById("select_bed_3").value = (document.getElementById("Bedcount_1").innerHTML) + "Bed";
            document.getElementById("bathroom_count").value = "Bathrooms";
            $("#Select_bed_Details").hide();
            $("#Select_bathroom").show();
            var levelID = 6;

        });

    });



    function SubProperty(testData1) {

        $('#sub_property').jstree({

            'core': {
                'data': testData1

            }
        });
    }

});

// PropertyAccess
// function sub_property() {

// }


function AccessProperty(AccessProperty) {

    $('#AccessProperty').jstree({

        'core': {
            'data': AccessProperty

        }
    });
}



////---bed amenity--

function select_bed() {
    $.ajax({
        headers: { "Content-Type": "application/json" },
        type: "GET",
        url: globalUrl+"/v1/property/amenity/level/3",
        success: function (result) {

            var subtype = [];

            for (var i = 0; i < result.length; i++) {

                var testData1 = new Object();
                testData1.id = result[i].amenitiesId;
                testData1.parent = "#";
                testData1.text = result[i].amenitiesDesc;
                subtype.push(testData1);

            }
            bedDetails(subtype)
            console.log("-----------")
            console.log(result);
            console.log("-----------")

            // alert(output);
            // output += "</tbody></table>";

            // displayResources.html(output);
            $("table").addClass("table");

        },
        error: function (jqXHR, textStatus, errorThrown) { alert('update Stock error: ' + textStatus); }

    });
    $("#Select_bed_Details").show();
    $("#SubAccessProperty").hide();
    $("#btndone").removeAttr('disabled');
    document.getElementById("select_Sub_property_1").value = document.getElementById("select_Sub_property").value;
    document.getElementById("select_Guest_1").value = (document.getElementById("Bedcount").innerHTML) + "Guest";
    document.getElementById("select_bed_1").value = "Bed";

}
function bedDetails(bedDetails) {

    $('#bedDetails').jstree({

        'core': {
            'data': bedDetails

        }
    });
}


////--select bed amenties--///
function beddetails() {



}
///---Continue-----//

function amenties(amenties) {

    $('#amenties').jstree({

        'core': {
            'data': amenties

        }
    });
}
function acesss_amenties() {

    $("#amenties  li").click(function () {

        var amenties_id = ($(this).attr("id"));

    });
}

/////--confirm--///

function confirm() {

    data.userId = document.getElementById("session_userId").value;
    data.propertyName = document.getElementById("Tittle_listing").value;
    data.propertyDesc = $('textarea#Tittle_Description').val();
    data.active = 1;
    data.noOfUnits = 1;
    data.pulledProperty = "n";
    data.propertyId = 0;
    data.price = 0;
    data.discountPer = 0;
    data.discountedPrice = 0;
    data.noOfBedroom = 1;
    data.maxNoGuest = document.getElementById("Bedcount").innerHTML;
    data.maxNoSleepsInBed = 0;
    data.minStaydays = 0;
    data.maxStayDays = 0;

    data.unitAvail = "Y";

    data.unitAvailFromdt = "";

    data.unitAvailTodt = "";

    data.minPriorNotification = 0;

    data.maxUnitRate = 0;

    data.minUnitRate = 0;
   data.unitId = 0;
    data.noOfBathroom = document.getElementById("bathcount_1").innerHTML;
    data.addressLine1 = document.getElementById("Enter_address").value;
    data.addressLine2 = document.getElementById("Enter_aptSuite").value;
    data.city = document.getElementById("Enter_city").value;
    var e = document.getElementById("select_State");
    var strUser = e.options[e.selectedIndex].value;
    data.state = strUser;
    data.countryCode = document.getElementById("Enter_country").value;

    // JSON.stringify({ userId:1, propertyTypeId:1 }),
    // var dataString = { userId:1, propertyTypeId:1};
    $.ajax({
        type: 'POST',
        //data: person,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json',
        url: globalUrl+'/v1/user/'+ document.getElementById("session_userId").value +'/property/saveAll',
        success: function (data) {
            alert("Record Saved");
            document.getElementById("confirm").disabled = true;
            location.href = "/Photo_attch";
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Record Saved");
            document.getElementById("confirm").disabled = true;
            location.href = "/Photo_attch";
        }


    });
}
function btndone() {

    document.getElementById("maindiv1").innerHTML = "Property Location";
    document.getElementById("maindiv2").innerHTML = "Enter your address so guests can quickly find lovely rental.";

    document.getElementById("Enter_country").value = "United State";
    $("#Select_bathroom").hide();
    $("#PropertyLocation").show();


    if (document.getElementById("Enter_address").value != "" && document.getElementById("Enter_city").value != "") {
        document.getElementById("maindiv1").innerHTML = "Listing Details";
        document.getElementById("maindiv2").innerHTML = "Add a title location and a quick description of your listing.";
        document.getElementById("Tittle").value = document.getElementById("Enter_city").value;
        $("#PropertyLocation").hide();
        $("#listingdetails").show();

        // $("#confirm").removeAttr('disabled');


    }
    if (document.getElementById("Tittle_listing").value != "") {
        document.getElementById("maindiv1").innerHTML = "Amenities";
        document.getElementById("maindiv2").innerHTML = "Choose the amenities you can provide for a comfy guest stay.";

        $.ajax({
            headers: { "Content-Type": "application/json" },
            type: "GET",
            url: globalUrl+"/v1/property/feature",
            success: function (result) {
                //console.log(res
                var subtype = [];

                for (var i = 0; i < result.length; i++) {
                    if (result[i].category == "Ameneties") {
                        var testData1 = new Object();
                        testData1.id = result[i].propertyFeatureId;
                        testData1.parent = "#";
                        testData1.text = result[i].featuresDesc;
                        subtype.push(testData1);
                    }
                }
                amenties(subtype)
                console.log("-----------")
                console.log(result);
                console.log("-----------")

                // alert(output);
                // output += "</tbody></table>";

                // displayResources.html(output);
                $("table").addClass("table");

            },
            error: function (jqXHR, textStatus, errorThrown) { alert('update Stock error: ' + textStatus); }

        });
        $("#listingdetails").hide();
        $("#div_amenties").show();
    }
    if (temp == 1) {

        $.ajax({
            headers: { "Content-Type": "application/json" },
            type: "GET",
            url: globalUrl+"/v1/property/feature",
            success: function (result) {
                //console.log(result);

                var subtype = [];

                for (var i = 0; i < result.length; i++) {
                    if (result[i].category == "Access") {
                        var testData1 = new Object();
                        testData1.id = result[i].propertyFeatureId;
                        testData1.parent = "#";
                        testData1.text = result[i].featuresDesc;
                        subtype.push(testData1);

                    }
                }
                Access(subtype)
                console.log("-----------")
                console.log(result);
                console.log("-----------")

                // alert(output);
                // output += "</tbody></table>";

                // displayResources.html(output);
                $("table").addClass("table");

            },
            error: function (jqXHR, textStatus, errorThrown) { alert('update Stock error: ' + textStatus); }

        });
        $("#div_access").show();
        $("#div_amenties").hide();
        document.getElementById("btndone").hidden = true;
        $("#confirm").show();

    }

    // else if (temp == 2) {
    //     document.getElementById("btndone").hidden = true;
    //     document.getElementById("confirm").hidden = "";
    //     document.getElementById("maindiv1").innerHTML = "Add Photos";
    //     document.getElementById("maindiv2").innerHTML = "Add great,hi resolution photos to make your property stand out.you can easily move them around";
    //     $("#div_amenties").hide();
    //     $("#div_addphoto").show();
    //     $("#div_access").hide();
    // }
    function Access(Access) {

        $('#Access').jstree({

            'core': {
                'data': Access

            }
        });
    }

}

///---Image attchment file--//
function filel(file) {
    fileattch = file;
    document.getElementById('image_display').src = window.URL.createObjectURL(file);
    document.getElementById("Photo_Confirm").show = true;
   
}
function Photo_Confirm() {
  
    filename1.propertyFile = fileattch;
    filename1.userId = document.getElementById("session_user").value; 
    filename1.fileDescription = "";
     var data = new FormData();
    var file = fileattch;   
    data.append('propertyFile', fileattch);
    data.append('userId', document.getElementById("session_user").value);
    data.append('fileDescription', '');
    $.ajax({
        url: globalUrl + '/v1/user/'+ document.getElementById("session_user").value +'/property/66/unit/90/attachment',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function (result) {
        alert("Record Saved");
        location.href = "/dashboard";
       
    }).fail(function (a, b, c) {
        console.log(a, b, c);
    });


}