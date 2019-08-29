var express = require('express');
var router = express.Router();
// global.globalUrl = "https://api.wemaste.com/";

const config = require('../config/config.json');
const mode=config.env.mode;
const devUrlData=JSON.stringify(config.development.api_url);
const devUrl =devUrlData.substring(1, devUrlData.length - 1); 
const hostDevUrlData=JSON.stringify(config.development.host_url);
const hostDevUrl =hostDevUrlData.substring(1, hostDevUrlData.length - 1); 

const testUrlData=JSON.stringify(config.testing.api_url);
const testUrl =testUrlData.substring(1, testUrlData.length - 1);
const hostTestUrlData=JSON.stringify(config.testing.host_url);
const hostTestUrl =hostTestUrlData.substring(1, hostTestUrlData.length - 1);

const prodUrlData=JSON.stringify(config.production.api_url)
const prodUrl =prodUrlData.substring(1, prodUrlData.length - 1); 
const hostProdUrlData=JSON.stringify(config.production.host_url)
const hostProdUrl =hostProdUrlData.substring(1, hostProdUrlData.length - 1);  

const stageUrlData=JSON.stringify(config.staging.api_url)
const stageUrl =stageUrlData.substring(1, stageUrlData.length - 1);
const hostStageUrlData=JSON.stringify(config.staging.host_url)
const hostStageUrl =hostStageUrlData.substring(1, hostStageUrlData.length - 1);  

if(mode == "development"){
    global.globalUrl=devUrl;
    global.hostUrl=hostDevUrl;
}
else if(mode == "testing"){
    global.globalUrl=testUrl;
    global.hostUrl=hostTestUrl;
  }
else if(mode == "staging"){
    global.globalUrl=stageUrl;
    global.hostUrl=hostStageUrl;
  }
else{
    global.globalUrl=prodUrl;
    global.hostUrl=hostProdUrl; 
}

// global.globalUrl="http://18.218.37.224:8083/"

module.exports = router;