$(document).ready(function () {

    $('#Edit_Property_Update').click(function () {
   
        var proprty = new Object();//parent
        var propertyHostUnit = new Object();//c o
        var propertyLocations = [];//c a
        var propertySubType = [];
        // proprty.propertyId=
        for (var i = 0; i < 1; i++) {
            var temp = new Object();
            temp.addressLine1 = document.getElementById("propertyAddress").value;
            temp.addressLine2 = "";
          
            propertyLocations.push(temp);
        }
        propertyHostUnit.maxNoGuest = document.getElementById("noBeds").value;
        propertyHostUnit.propertySubTypeId=document.getElementById("subPropertyType").value;
        propertyHostUnit.minStayDays =1;
        proprty.propertyName = "";
        proprty.propertyId =document.getElementById('propertyId').value;
        alert(proprty.propertyId);
        propertyHostUnit.unitId=0;
        propertyHostUnit.propertyAccId=document.getElementById("guestRoom").value;
        proprty.propertyTypeId= document.getElementById("propertyType").value;
        proprty.propertyHostUnit = propertyHostUnit;
        proprty.propertyLocations = propertyLocations;
        proprty.active= 0;
        proprty.isHide= 0;
              $.ajax({
            type: 'POST',
            //data: person,
            data: JSON.stringify(proprty),
            contentType: "application/json",
            dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
            // url: 'http://13.59.91.130:8083/v1/user/'+ document.getElementById('userId').value +'/property',
            success: function (result) {
             //    alert(result.propertyId);
             //    alert(result.propertyHostUnit.unitId);
                propertyDetails.propertyId= result.propertyId;
                propertyDetails.unitId=result.propertyHostUnit.unitId;
                propertyDetails.userId=dataHeader.userId;
 
                 // alert(propertyDetails.propertyId);
                console.log(JSON.stringify(result));
                alert("record Save");
     
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(JSON.stringify(proprty));
             //    alert("Record not Saved");
             //    alert(errorThrown);
             //    alert(textStatus);
            },
     
     
        });
     
     
    });

    $('#Edit_Bedroom_Update').click(function () {
   
        var data = new Object();
        var propertyHostUnit = new Object();
        data.propertyId = document.getElementById('propertyId').value;
        data.noOfBedroom = document.getElementById("my_select").value;
        data.noOfBeds = document.getElementById("noBed").value;
        data.unitId = propertyDetails.propertyId;
        propertyHostUnit.userId=dataHeader.userId;
        // propertyHostUnit.unitId=propertyDetails.unitId;
         propertyHostUnit.noOfBedroom = document.getElementById("my_select").value;
        propertyHostUnit.noOfBeds = document.getElementById("noBed").value;
        data.propertyHostUnit=propertyHostUnit;

        data.main = document.getElementById("main").value;
        $.ajax({  
            type: 'PUT',  
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
            url: 'http://13.59.91.130:8083/v1/user/'+document.getElementById('userId').value +'/property/unit',
            success: function (result) {
                //   alert(JSON.stringify(result));
                   console.log(JSON.stringify(result));
                   alert("Bed");
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Record not Saved");
                // alert(errorThrown);

                // alert(textStatus);
            },
        });  

        var bedroomDetails = [];
        var TotbedCount = document.getElementById("my_select").value;
        for (var bedCount = 0; bedCount <= TotbedCount; bedCount++) {
            var strlblSelected = document.getElementById("lblSelected" + bedCount).value;
            var lblBedCnt=document.getElementById("lblBedCnt"+ bedCount );
            
            var bedcntps=(lblBedCnt.innerHTML).indexOf(' ');            
            var bedcnt=(lblBedCnt.innerHTML).substring(0, bedcntps);
            if ((bedcnt != "0" && bedCount ==0) || bedCount != 0 ){
            //alert(strlblSelected);
            var words = strlblSelected.split(',');
            var bedAmenities = new Object();


            var propertyBedroomWiseAminities = [];
            var i=0;
            for (var bedCount1 = 0; bedCount1 < words.length; bedCount1++) {
                if(words[bedCount1]!="" )
                {   

                   // alert(words[bedCount1]);
                    if (words[bedCount1] == "1") bedType =  document.getElementById("bedSingle_"+ bedCount );
                    if (words[bedCount1] == "2") bedType =  document.getElementById("bedDouble_"+ bedCount );
                    if (words[bedCount1] == "3") bedType =  document.getElementById("bedQueen_"+ bedCount );
                    if (words[bedCount1] == "4") bedType =  document.getElementById("bedKing_"+ bedCount );
                    if (words[bedCount1] == "5") bedType =  document.getElementById("bedCrib_"+ bedCount );
                    if (words[bedCount1] == "6") bedType =  document.getElementById("bedCouch_"+ bedCount );
                    if (words[bedCount1] == "7") bedType =  document.getElementById("bedBunkbed_"+ bedCount );

                    if (words[bedCount1] == "8") bedType =  document.getElementById("bedAirMattress_"+ bedCount );
                    if (words[bedCount1] == "9") bedType =  document.getElementById("bedFloorMattress_"+ bedCount );

                    if (words[bedCount1] == "10") bedType =  document.getElementById("bedToddlerBed_"+ bedCount );
                    if (words[bedCount1] == "11") bedType =  document.getElementById("bedHammock_"+ bedCount );
                    if (words[bedCount1] == "12") bedType =  document.getElementById("bedWaterBed_"+ bedCount );
                    if ( parseInt(bedType.value) > 0 )
                    {
                        var propertyBedroomWiseAminitiesD = new Object();
                        propertyBedroomWiseAminitiesD.propertyId = document.getElementById('propertyId').value;;
                        propertyBedroomWiseAminitiesD.unitId = propertyDetails.unitId;
                        propertyBedroomWiseAminitiesD.bedroomId = "null";
                        propertyBedroomWiseAminitiesD.aminitiesId = words[bedCount1];
                        propertyBedroomWiseAminitiesD.bedCount = parseInt(bedType.value);
                        propertyBedroomWiseAminitiesD.active = 1;
                        propertyBedroomWiseAminities[i] = propertyBedroomWiseAminitiesD;
                        i=i+1;
                    }
                
                }

            }

            bedAmenities.propertyId =document.getElementById('propertyId').value;
            bedAmenities.unitId = propertyDetails.unitId;
            bedAmenities.bedroomId = "null";
            bedAmenities.bedroomName= ((bedCount == 0)? "Common Space": "Bedroom"+bedCount);
            bedAmenities.bedroomTypeId = ((bedCount == 0)? 2: 1);
            bedAmenities.propertyBedroomWiseAminities = propertyBedroomWiseAminities;
            bedroomDetails[bedCount] = bedAmenities;
        }

        }


        // alert(JSON.stringify(bedroomDetails));
        console.log(JSON.stringify(bedroomDetails));


    $.ajax({  
            type: 'POST',  
            data: JSON.stringify(bedroomDetails),
            contentType: "application/json",
            dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
            url: 'http://13.59.91.130:8083/v1/user/'+ document.getElementById('userId').value  +'/property/unit/bedroom',
            success: function (result) {
                //  alert(JSON.stringify(result));
                   console.log(JSON.stringify(result));
                   alert("bedroom data save");


            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Record not Saved");
                // alert(errorThrown);

                // alert(textStatus);
            },
        });  
        console.log(bedroomDetails);
      


    });


    $('#edit_bathroom_update').click(function () {

        var objBathCnt = document.getElementById("noBaths");
        // alert(objBathCnt.value);
        if (objBathCnt.value.indexOf('-') != -1) objBathCnt.value = 0;
        var TotBathCount = objBathCnt.value;

        var data = new Object();
        var propertyHostUnit = new Object();
        data.propertyId = document.getElementById('propertyId').value;
        data.noOfBathroom = TotBathCount;
        data.unitId = document.getElementById('propertyId').value;
        // propertyHostUnit.userId=dataHeader.userId;
        // propertyHostUnit.unitId=propertyDetails.unitId;
        // propertyHostUnit.noOfBathroom =TotBathCount;
        // data.propertyHostUnit=propertyHostUnit;
        // propertyHostUnit.noOfBeds = document.getElementById("noBed").value;
      
        console.log(JSON.stringify(data));
        
        // data.main = document.getElementById("main").value;
        // alert('A');
        $.ajax({  
            type: 'PUT',  
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
            url: 'http://13.59.91.130:8083/v1/user/'+document.getElementById('userId').value+'/property/unit',
            success: function (result) {
                alert("bathroom Put-Api saved");
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("bathroom Put-Api not saved");
             },
        });  

        var BathroomDetails = [];
        

        

        if (TotBathCount.indexOf('.') != -1) {
            TotBathCount = parseFloat(noBaths.value) + 0.5;
        }
        // alert("A");
        j=0;
        for (var BathCount = 1; BathCount <= TotBathCount; BathCount++) {
            // alert("B");
            // alert("lblBathAmenities_" + BathCount);
            // alert( document.getElementById("lblBathAmenities_" + BathCount) );

            var strlblSelected = document.getElementById("lblBathAmenities_" + BathCount).innerText;
            // alert(strlblSelected);
            var words = strlblSelected.split(',');
            var BathAmenities = new Object();
            var bathaddBaths = document.getElementById("addBaths_" + BathCount);

            var ibathroomTypeId = document.getElementById(bathaddBaths.id).options[document.getElementById(bathaddBaths.id).selectedIndex].value;



            var propertyBathroomWiseAminities = [];
            var i=0;
            for (var BathCount1 = 0; BathCount1 < words.length; BathCount1++) {
                if(words[BathCount1]!="" )
                {   
                        var propertyBathroomWiseAminitiesD = new Object();
                        propertyBathroomWiseAminitiesD.propertyId = document.getElementById('propertyId').value;
                        propertyBathroomWiseAminitiesD.unitId = document.getElementById('propertyId').value;
                        propertyBathroomWiseAminitiesD.bathroomId = "null";
                        propertyBathroomWiseAminitiesD.aminitiesId = words[BathCount1];
                        propertyBathroomWiseAminitiesD.active = 1;
                        propertyBathroomWiseAminities[i] = propertyBathroomWiseAminitiesD;
                        i=i+1;                
                }

            }

            BathAmenities.propertyId = document.getElementById('propertyId').value;
            BathAmenities.unitId = document.getElementById('propertyId').value;
            BathAmenities.bathroomId = "null";
            BathAmenities.bathroomTypeId = ibathroomTypeId;
            BathAmenities.bedroomName="Bathroom"+ BathCount;
            BathAmenities.propertyBathroomWiseAminities = propertyBathroomWiseAminities;
            BathroomDetails[j] = BathAmenities;
            j=j+1;
        }


        // alert(JSON.stringify(BathroomDetails));
        console.log(JSON.stringify(BathroomDetails));

        $.ajax({  
            type: 'POST',  
            data: JSON.stringify(BathroomDetails),
            contentType: "application/json",
            dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
            url: 'http://13.59.91.130:8083/v1/user/'+ document.getElementById('userId').value +'/property/unit/bathroom',
            success: function (result) {
                //  alert(JSON.stringify(result));
                   console.log(JSON.stringify(result));
                   alert("Bathroom get save");


            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Record not Saved");
                // alert(errorThrown);

                // alert(textStatus);
            },
        }); 
    });


    $('#edit_amenities_update').click(function () {
        var subtype = [];
          $("input:checkbox[class=chk]:checked").each(function () {

            var testData1 = new Object();
            testData1.propertyId = document.getElementById('propertyId').value;
            testData1.unitId = propertyDetails.unitId;
            testData1.propertyFeatureId =$(this).val();
            testData1.active=1
            subtype.push(testData1);

            //  alert($(this).val());

        });
        console.log(subtype);

        $.ajax({
            type: 'POST',
            //data: person,
            data: JSON.stringify(subtype),
            contentType: "application/json",
            dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
            url: 'http://13.59.91.130:8083/v1/user/'+ document.getElementById('userId').value +'/property/host/feature',
            success: function (result) {

                console.log(JSON.stringify(result))
                alert("save");

            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Record not Saved");
                // alert(errorThrown);
                // alert(textStatus);
            },


        });
    });

    $('#edit_priceYogi_update').click(function () {
        var YogiData = [];
        
        for (i=0; i < 6; i++)
        {
          
            var YogiAnswer =new Object();
            var Answer=  document.getElementById("que_"+ (i + 1) ).value;
            YogiAnswer.propertyId=propertyDetails.propertyId,
            YogiAnswer.unitId=propertyDetails.unitId,
            YogiAnswer.userId=dataHeader.userId,
            YogiAnswer.queId=i+1,
            YogiAnswer.ansDesc=Answer;
            YogiData[i] = YogiAnswer;
            
        }
        // alert(JSON.stringify(YogiData));

         $.ajax({
            type: 'POST',
            data: JSON.stringify(YogiData),
            contentType: "application/json",
            dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
             url: 'http://13.59.91.130:8083/v1/user/'+ dataHeader.userId +'/yogi/answer/list',
            success: function (result) {                
                console.log(JSON.stringify(result));
                // alert(JSON.stringify(result));
                 alert(" yOGI Record");
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Record not Saved");
                // alert(errorThrown);
                // alert(textStatus);
            },
        });

        // alert(document.getElementById("lisitngPrice").value);
        var Price =new Object();
        Price.propertyId=propertyDetails.propertyId,
        Price.unitId=propertyDetails.unitId,
        Price.userId=dataHeader.userId,
        Price.discPer=40,
        Price.basePrice=document.getElementById("lisitngPrice").value,
        Price.petFee ="50",
        Price.petFeeType ="n",
        Price.cleaningFee ="50",
        Price.cleaningFeeType ="n";

         $.ajax({
            type: 'PUT',
            data: JSON.stringify(Price),
            contentType: "application/json",
            dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
             url: 'http://13.59.91.130:8083/v1/user/'+ dataHeader.userId +'/property/rate/save_update',
            success: function (result) {
                
                console.log(JSON.stringify(result));
                 alert("Record Saved");
     
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Record not Saved");
                // alert(errorThrown);
     
                // alert(textStatus);
            },
        });


        var data = new Object();
        var propertyHostUnit = new Object();
        data.propertyId = propertyDetails.propertyId;
        data.userId = dataHeader.userId;
        data.active=1;
        data.propertyName = document.getElementById("propertyName").value;
        data.propertyDesc = document.getElementById("propertyDesc").value;
        // data.active= 0;
        data.isHide = 0;
        // data.isHide=0;
        console.log(JSON.stringify(data));
        $.ajax({  
            type: 'PUT',  
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
            url: 'http://13.59.91.130:8083/v1/user/'+ dataHeader.userId +'/property',
            success: function (result) {
                //  alert(JSON.stringify(result));
                   console.log(JSON.stringify(result));
              alert("save");

            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Record not Saved");
                console.log(JSON.stringify(data));
            },
        }); 
     
     });
     var ImageUp=new FormData();   
     $('input[type="file"]').change(function(e){
            var files = event.target.files;
              var file;
              
            for(var i = 0; i< files.length; i++)
                {
                    // alert(fileName[i]);
                 file = files[i];
                 ImageUp.append('propertyFile', file);
                 ImageUp.append('userId',dataHeader.userId);
                 ImageUp.append('propertyId', propertyDetails.propertyId);
                 ImageUp.append('unitId', propertyDetails.unitId);
     
                 //    alert(ImageUp);
                    // file = fileName[i];
     
                }
                console.log(ImageUp);
     
        });
        $('#Edit_Photo_Update').click(function () {
     
              var data = new Object();
             var propertyHostUnit = new Object();
             data.propertyId = propertyDetails.propertyId;
             data.propertyName = document.getElementById("propertyName").value;
             data.propertyDesc = document.getElementById("propertyDesc").value;
             data.active= 0;
             data.isHide= 0;
             data.userId = dataHeader.userId;
             // data.active=1;
             // data.isHide=1;
             console.log(JSON.stringify(data));
             $.ajax({  
                 type: 'PUT',  
                 data: JSON.stringify(data),
                 contentType: "application/json",
                 dataType: "json",             'headers': {                 Authorization: localStorage.getItem('token') || '',             },
                 url: 'http://13.59.91.130:8083/v1/user/'+ dataHeader.userId +'/property',
                 success: function (result) {
                     //  alert(JSON.stringify(result));
                        console.log(JSON.stringify(result));
                    alert("save");
     
                 },
                 error: function (xhr, textStatus, errorThrown) {
                     alert("Record not Saved");
                     console.log(JSON.stringify(data));
     
                     // alert(errorThrown);
     
                     // alert(textStatus);
                 },
             }); 
     
     // alert("a");
      $.ajax({
        url: 'http://13.59.91.130:8083/v1/user/'+ dataHeader.userId +'/property/'+ propertyDetails.propertyId +'/unit/'+ propertyDetails.unitId +'/attachment',
        processData: false,
        contentType: false,
        data: ImageUp,
        type: 'POST'
     }).done(function (result) {
     //    alert("Record Saved");
     
     
     }).fail(function (a, b, c) {
        console.log(a, b, c);
     });
     });


  
  
    });