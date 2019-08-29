var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var multer = require('multer');
var Request = require("request");
var JSAlert = require("js-alert");
redirect = require("express-redirect");
var expressValidator = require('express-validator');
var cors = require('cors');
var globalUrl = require('./global');
var logger = require('./winston');
//var ClientOAuth2 = require('client-oauth2')


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressValidator());
router.use(flash());
router.use(cors())
router.use(cookieParser());

var idleTimeoutSeconds = 2592000;

router.use(session({
  secret: '78fhfhf88dkdjd8d7dldheye',
  saveUninitialized: false,
  resave: true,
  cookie: {
    path: '/',
    maxAge: idleTimeoutSeconds * 1000,
  },
  rolling: true
}));


var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/Sign_out', function (req, res, next) {
  if (req.session.userId) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        logger.info({
          level: 'info',
          message: 'Logout Error',
        });
        logger.error({
          level: 'info',
          message: 'Logout Error',
        });
        return next(err);
      } else {
        logger.info({
          level: 'info',
          message: 'Logout Successfully',

        });
        console.log("logout Successfully");
        return res.redirect('/');
      }
    });
  }
});

router.get('/demo', function (req, res, next) {
  res.render('demo', { title: 'Express' });
});

router.get('/termsPage', function (req, res, next) {
  res.render('termsPage', { url: global.globalUrl });
});

router.get('/', function (req, res, next) {
  console.log(global.globalUrl);
  console.log(global.hostUrl);
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    req.session.user = 1;
    res.render('index', { url: global.globalUrl });
  } else {
    res.redirect('/welcome');
  }
});


router.get('/welcome', function (req, res, next) {
  var userId = req.session.userId;
  var firstName = req.session.firstName;

  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('dashboard', { data: userId, hostUrl: global.hostUrl, pmcId: req.session.pmcId, url: global.globalUrl, firstName: firstName, isAdmin: req.session.isAdmin });

  }
});

router.post('/welcome', urlencodedParser, function (req, res, next) {
   //console.log(JSON.stringify(req.body))
  Request.post({
    "headers": {
      app: 'host',
      "content-type": "application/json",
    },
    "url": global.globalUrl + "user/login/mobile/verify",
    "body": JSON.stringify(req.body)
  }, (error, response, body) => {
    if (error) {
      // return console.dir(error);
      logger.error({
        level: 'error',
        message: 'sign in error',
      });
    } else {
      var r = JSON.parse(body);
       console.log("-------------------------------");
       console.log(r);
       console.log("-------------------------------");

       console.log(r.pmcId);
      if (r.status == 200) {
        // console.log(req.session.userId);
        req.session.userId = r.userId;
        req.session.pmcId = r.pmcId;
        req.session.firstName = r.firstName;
        // req.session.isAdmin = r.userInfo.isAdmin;
        // req.session.isAdmin = r.userInfo.isAdmin;

        // console.log("---------------------------");
        // console.log(req.session.userId);
        // console.log("---------------------------");
        if (!req.session.userId) {
          logger.info({
            level: 'error',
            message: 'SignIn Error',
          });
          res.redirect("/")
        } else {
          logger.info({
            level: 'info',
            message: 'SignIn Successfully',
          });
          res.render('dashboard', { data: req.session.userId, firstName: req.session.firstName, hostUrl: global.hostUrl, url: global.globalUrl, pmcId: req.session.pmcId });
        }
      } else {
        // console.log(req.body);
        // console.log("please check your otp");
        res.redirect('/');
      }

    }

  });
});

router.post('/welcomeUser', function (req, res, next) {
  //console.log(req.body);
  // var dataInput = req.body.mobileno1;
  // var countryCode=req.body.dialerCode;
  // var concat= countryCode + dataInput
  // var data=new Object();
  // data.mobileno = concat; 
  // data.otpCode = req.body.otpCode;
  //   Request.post({
  //     "headers": { "content-type": "application/json" },
  //     "url": global.globalUrl+"v1/user/login/mobile/otp/varify",
  //     "body": JSON.stringify(data)
  // }, (error, response, body) => {
  //     if(error) {
  //       logger.info({
  //         level: 'info', 
  //         message: 'OTP Successfully Checked',

  //       });

  //        console.log("OTP check");
  //        Console.log(error)
  //     }else{
  //       logger.info({
  //         level: 'info', 
  //         message: 'OTP Successfully Recived',

  //       });
  //       console.log(body);
  //       var r=JSON.parse(body)
  //    if(r.errorStatus == "404"){
  //     console.log("---------------------------")
  //         console.log("error found in otp")
  //         res.redirect('/');
  //     }else{
  console.log(JSON.stringify(req.body));
  var token = req.body.token;
  delete req.body.token;

  Request.post({
    "headers": {
      'Authorization': 'Basic aG9zdDpkZmdoamFzZmdzaGZqc3VmeXNnemhjZ2pzemJqY2Jqc3piY2pic2hiaDIzNDU2NzY1NDM0cnRld2VydA==',
      "content-type": "application/json",
      Authorization: token,
    },
    "url": global.globalUrl + "user",
    "body": JSON.stringify(req.body)
  }, (error, response, body) => {
    if (error) {
      // return console.dir(error);
      logger.info({
        level: 'error',
        message: "failed to Login"
      });
    } else {
      var r = JSON.parse(body);
      console.log("----------------------");
      console.log(body);
      req.session.userId = r.userId;
      req.session.pmcId = r.pmcId;
      req.session.firstName = r.firstName;
      req.session.isAdmin = r.isAdmin;
      console.log("----------------------");
      console.log(req.session.userId);
      logger.info({
        level: 'info',
        message: "Logged in user id " + req.session.userId,
      });
      console.log("----------------------");
      res.render('dashboard', { data: req.session.userId,hostUrl: global.hostUrl, url: global.globalUrl, pmcId: req.session.pmcId, firstName: req.session.firstName, isAdmin: req.session.isAdmin });
    }
  });
  //   }

  //   }
  // });



});




router.get('/terms_privacy', function (req, res, next) {
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('terms_privacy', { data: req.session.userId, url: global.globalUrl, isAdmin: req.session.isAdmin });
  }

});

router.get('/profile', function (req, res, next) {
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('newProfile', { data: req.session.userId,firstName: req.session.firstName, hostUrl: global.hostUrl, url: global.globalUrl, pmcId: req.session.pmcId, isAdmin: req.session.isAdmin });
  }

});


router.get('/properties', function (req, res, next) {
  var userId = req.session.userId;
  var firstName = req.session.firstName;
  console.log(userId);
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('listing', { data: userId, url: global.globalUrl, firstName: firstName, pmcId: req.session.pmcId, isAdmin: req.session.isAdmin });

  }

});

router.get('/propertyPreview', function (req, res, next) {
  var userId = req.session.userId;
  var firstName = req.session.firstName;
  console.log(userId);
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('propertyPreview', { data: userId, url: global.globalUrl, firstName: firstName, isAdmin: req.session.isAdmin });
  }

});
router.get('/Support', function (req, res, next) {
  var userId = req.session.userId;
  var firstName = req.session.firstName;
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('support', { data: userId, url: global.globalUrl, firstName: firstName, isAdmin: req.session.isAdmin });

  }

});



router.get('/newProperty', function (req, res, next) {
  var firstName = req.session.firstName;
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('newListings', { data: req.session.userId, url: global.globalUrl, pmcId: req.session.pmcId, firstName: firstName, isAdmin: req.session.isAdmin });
 
  }

});




router.get('/addNewListings', function (req, res, next) {
  var listingUrl = res.req.url;
  var firstName = req.session.firstName;
  if (listingUrl.indexOf('ST-') != -1) {
    // console.log("start Key",listingUrl.indexOf('ST-'));
    // console.log("End Key",listingUrl.indexOf('&state'));
    var stcode = listingUrl.substring(listingUrl.indexOf('ST-'), listingUrl.indexOf('&state'));
    //  console.log("st Key",stcode);
  }
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('addNewListings', { data: req.session.userId, stKey: stcode, firstName: firstName, isAdmin: req.session.isAdmin });

  }

});

router.get('/notification', function (req, res, next) {
  var firstName = req.session.firstName;
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('notification', { data: req.session.userId, firstName: firstName, isAdmin: req.session.isAdmin });

  }
});

router.get('/payout', function (req, res, next) {
  var firstName = req.session.firstName;
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('payout', { data: req.session.userId, firstName: req.session.firstName, hostUrl: global.hostUrl, url: global.globalUrl, pmcId: req.session.pmcId, isAdmin: req.session.isAdmin, firstName: firstName });

  }
});

router.get('/propertyBulkUpdate', function (req, res, next) {
  var firstName = req.session.firstName;
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('propertyDatatables', { data: req.session.userId, url: global.globalUrl, pmcId: req.session.pmcId, isAdmin: req.session.isAdmin, firstName: firstName });

  }
});

router.get('/propertyReports', function (req, res, next) {
  var firstName = req.session.firstName;
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('reportsPage', { data: req.session.userId, url: global.globalUrl, pmcId: req.session.pmcId, isAdmin: req.session.isAdmin, firstName: firstName });
  }
});




router.get('/Preview', function (req, res, next) {
  var firstName = req.session.firstName;
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('preview', { data: req.session.userId, url: global.globalUrl, pmcId: req.session.pmcId, isAdmin: req.session.isAdmin, firstName: firstName });

  }
});

router.get('/bookings', function (req, res, next) {
  var firstName = req.session.firstName;
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('bookings', { data: req.session.userId, url: global.globalUrl, pmcId: req.session.pmcId, isAdmin: req.session.isAdmin, firstName: firstName });

  }
});


router.get('/mainMasterDashboard', function (req, res, next) {

  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('mainMasterDashboard', { data: req.session.userId, url: global.globalUrl, pmcId: req.session.pmcId, isAdmin: req.session.isAdmin });

  }
});

router.get('/Invite_friends', function (req, res, next) {
  res.render('Invite_friends', { title: 'Express' });
});

router.get('/trustandverification', function (req, res, next) {
  var Request = require("request");
  Request.get({
    "headers": { "content-type": "application/json" },
    "url": globalUrl + "/v1/user/" + req.session.user.userId,
    "body": JSON.stringify(req.body)
  }, (error, response, body) => {
    if (error) {
      // return console.dir(error);
      console.log("error" + error);
    } else {
      var p = JSON.parse(body);

      console.log("---------------");
      console.log(p);
      console.log(p.fullName);
      console.log("---------------");
      res.render('trustandverification', { data: p });


    }

  });
});


router.get('/yogi_questions', function (req, res, next) {

  res.render('yogiQuestion', { title: 'Express' });

});

router.get('/calendar', function (req, res, next) {
  var firstName = req.session.firstName;
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('calendar', { data: req.session.userId, firstName: firstName, isAdmin: req.session.isAdmin });

  }
});

router.get('/newCalender', function (req, res, next) {
  var firstName = req.session.firstName;
  if (req.session.userId == 0 || req.session.userId == 'null' || req.session.userId == undefined) {
    res.redirect('/');
  } else {
    res.render('newCalender', { data: req.session.userId, firstName: firstName, isAdmin: req.session.isAdmin });

  }
});



router.post('/updateUserProfile', function (req, res, next) {
  //------Data Parsing start---------

  var inputData = req.body;
  //user model data parseing
  var tempUser = new Object();
  tempUser.fullName = inputData.fullName;
  tempUser.emailId = inputData.emailId;
  tempUser.userId = inputData.userId;
  tempUser.otpCode = inputData.otpCode;
  tempUser.dobDt = inputData.dobDt;
  tempUser.mobileno1 = inputData.mobileno1;
  tempUser.gender = inputData.gender;
  //userProfile model data parseing
  var tempUserProfile = new Object();
  tempUserProfile.userProfileId = req.session.user.userProfile.userProfileId;
  tempUserProfile.street = inputData.street;
  tempUserProfile.identification_id = inputData.identification_id;
  tempUserProfile.language = inputData.language;
  tempUserProfile.about = inputData.about;

  //add user to userprofile
  tempUserProfile.user = tempUser;
  console.log("tempUserProfile-----------");
  console.log(tempUserProfile);
  // logger.info({
  //   level: 'info', 
  //   message: 'Profile update successfully',
  // });
  //------Data Parsing End-----

  var Request = require("request");
  Request.put({
    "type": 'PUT',
    "headers": { "content-type": "application/json" },
    "url": globalUrl + "/v1/user/" + req.session.user.userId + "/profile",
    "body": JSON.stringify(tempUserProfile)
  }, (error, response, body) => {

    if (error) {
      console.log(error);
      logger.info({
        level: 'info',
        message: 'Profile update error',
      });
      // return console.dir(error);
    } else {
      logger.info({
        level: 'info',
        message: 'Profile update successfully',
      });
      var r = JSON.parse(body);

      console.log("output : " + response.body);
      res.redirect('/profile');
    }

  });
});

router.get('/host_manual_property', function (req, res, next) {

  var p = req.session.user.userId;
  res.render('host_manual_property', { data: p });

});

router.get('/termsandcondition', function (req, res, next) {
  res.render('termsandcondition', { url: global.globalUrl, });
});

router.get('/Photo_attch', function (req, res, next) {

  var p = req.session.user.userId;
  res.render('Photo_attch', { data: p });
});



router.post('/userdashboard', urlencodedParser, function (req, res, next) {

  var Request = require("request");

  var inputData = JSON.stringify(req.body);

  Request.put({
    "headers": { "content-type": "application/json" },
    "url": globalUrl + "/v1/user/" + req.session.user.userId + "/property/rate/save_update",
    "body": inputData
  }, (error, response, body) => {

    if (error) {
      // return console.dir(error);
      console.log("------" + error);
    } else {

      var r = JSON.parse(body);

      console.log("output : " + response.body);
      res.redirect("/dashboard");
    }

  });
});




router.post('/Newdashboard', function (req, res, next) {
  req.body.userProfile = { "abc": "ss" };
  var Request = require("request");
  var inputData = JSON.stringify(req.body);

  console.log("input :" + inputData);
  Request.post({
    "headers": { "content-type": "application/json" },
    "url": globalUrl + "/v1/user",
    "body": inputData,
  }, (error, response, body) => {

    if (error) {
      // return console.dir(error);
    } else {

      var r = JSON.parse(body);
      req.session.user = response.body;

      //console.log("output : "+response.body);
      res.render('dashboard', { data: response.body, isAdmin: req.session.isAdmin });
    }

  });
});


module.exports = router;
