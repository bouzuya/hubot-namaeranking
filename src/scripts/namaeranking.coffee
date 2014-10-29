# Description
#   A Hubot script that search namaeranking.com for the name
#
# Configuration:
#   None
#
# Commands:
#   hubot namaeranking <name> - search namaeranking.com
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  request = require 'request-b'
  cheerio = require 'cheerio'

  robot.respond /namaeranking (\S+)$/i, (res) ->
    name = res.match[1]
    url = 'http://namaeranking.com'
    request
      url: url
      qs:
        search: '同姓同名'
        surname: name
        tdfk: '全国'
    .then (r) ->
      $ = cheerio.load r.body
      title = $('title').text()
      res.send title + ' ' + url + r.req.path
