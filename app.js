var fs = require('fs');
var shell = require('shelljs');
var imgur = require('imgur');
var Slack = require('slack-node');
var argv = require('yargs').argv;
slack = new Slack();
slack.setWebhook(argv.url);

var createScreenshot = function () {
  console.log('');
  console.log('|||||||||||||||||||||||||||||||||||||||  ' + new Date().toString());
//  only os x
//  shell.exec('screencapture ./img.png');
  shell.exec('scrot ./img.png');
  upload();
};

var upload = function () {
  imgur.uploadFile(__dirname + '/img.png')
    .then(function (json) {
      console.log('link ->', json.data.link);
      sendToSlack(json.data.link);
    })
    .catch(function (err) {
      console.error(err.message);
    });
};

var sendToSlack = function (url) {
  slack.webhook({
    channel: "#" + argv.channel,
    username: "pahome",
    text: '->' + url
  }, function (err, response) {
    console.log("slack statusCode ->", response.statusCode);
  });
};

createScreenshot();

setInterval(function () {
  createScreenshot();
}, argv.interval);