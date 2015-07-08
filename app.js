var fs = require('fs');
var shell = require('shelljs');
var imgur = require('imgur');

var createScreenshot = function () {
  shell.exec('screencapture ./img.png');
  upload();
};

var upload = function () {
  imgur.uploadFile(__dirname + '/img.png')
    .then(function (json) {
      console.log(json.data.link);
    })
    .catch(function (err) {
      console.error(err.message);
    });
};

createScreenshot();