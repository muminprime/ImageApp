var util = require("util");
var AWS = require("aws-sdk");
var helpers = require("../helpers");
var Policy = require("../s3post").Policy;
var S3Form = require("../s3post").S3Form;
var AWS_CONFIG_FILE = "config.json";
var APP_CONFIG_FILE = "app.json";
var POLICY_FILE = "policy.json";
//var succ = "sqs-success.ejs";
var succ = "list.ejs";
var prefix = "/adam.strojwas/";
var AWS = require("aws-sdk");
var Queue = require("queuemanager");
var message = 0;



var task = function(request, callback){
	//1. load configuration
	AWS.config.loadFromPath(AWS_CONFIG_FILE);
	var appConfig = helpers.readJSONFile(APP_CONFIG_FILE);
	listobject = require('./listobject');   
	var queue = new Queue(new AWS.SQS(), appConfig.QueueUrl);
	
	
	//var sqs = new AWS.SQS();
	var akcja = request.param("akcja");
	console.log(akcja);
	var klucz = request.param("klucz");
	var wartosc =request.param("wartosc");
	var msg = akcja+'#'+wartosc+"#"+klucz;
	console.log("zaczyna wysylac");
			queue.sendMessage(msg, function(err, data){
				if(err) { callback(err); return; }
				callback(null,{template: succ, params:{
								 fields:listobject.Pola, bucket:"adamstrojwas",names:listobject.Nazwy,adresy:listobject.Adresy,message:2
								 }});
			});
	
	

	//var opcje = {
	//		MessageBody: msg,
	//		QueueUrl : appConfig.QueueUrl
	//};

 //  sqs.sendMessage(opcje,onMessageSendConfirmed(callback));
   
//	var onMessageSendConfirmed = function(callback) {
//		return function(err, data){
//			if(err) {console.log(err); callback(err); return;}     
	//		callback(null, data);
  //}
//}
   }
	
	
	
	
	exports.action = task;
