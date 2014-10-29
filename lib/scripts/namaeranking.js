// Description
//   A Hubot script that search namaeranking.com for the name
//
// Configuration:
//   None
//
// Commands:
//   hubot namaeranking <name> - search namaeranking.com
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var cheerio, request;
  request = require('request-b');
  cheerio = require('cheerio');
  return robot.respond(/namaeranking (\S+)$/i, function(res) {
    var name, url;
    name = res.match[1];
    url = 'http://namaeranking.com';
    return request({
      url: url,
      qs: {
        search: '同姓同名',
        surname: name,
        tdfk: '全国'
      }
    }).then(function(r) {
      var $, title;
      $ = cheerio.load(r.body);
      title = $('title').text();
      return res.send(title + ' ' + url + r.req.path);
    });
  });
};
