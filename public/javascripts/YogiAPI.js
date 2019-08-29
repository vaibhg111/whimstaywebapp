// function myFunction(input) {
//     alert('');
//     //console.log(input);
//     var input = JSON.parse(input);

//     var jsondata = [];
//     // SubProperty(jsondata);
//     for (var i = 0; i < input.length; i++) {
//         // console.log(input[i]);  
//         var testData = new Object();
//         testData.id = input[i].queId;
//         testData.parent = "#";
//         testData.text = input[i].category;

//         jsondata.push(testData);
//     }
//     MainProperty(jsondata);
//     console.log(jsondata);
// }


function MainProperty(jsondata) {

$('#MainProperty').jstree({

    'core': {
        'data': jsondata


    }
});
} 


var globalUrl = "http://13.59.91.130:8083";
$(document).ready(function () {
    $.ajax({

        headers: { "Content-Type": "application/json" },
        type: "GET",
        url: globalUrl + "/v1/user/" + "4" + "/yogi/question",
        success: function (result) {
            //console.log(result);
            var Yogi_Question = [];

            for (var i = 0; i < result.length; i++) {

                var testData1 = new Object();
                testData1.id = result[i].queId;
                testData1.parent = "#";
                testData1.text = result[i].category;
                Yogi_Question.push(testData1);

            }
            MainProperty(Yogi_Question);
            console.log("-----------")
            console.log(result);
            console.log("-----------")

            $("table").addClass("table");
         


        },
        error: function (jqXHR, textStatus, errorThrown) { alert('update Stock error: ' + textStatus); }

    });
   

});

