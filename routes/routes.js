var express = require('express');
var router = express.Router();
var addAccessLog = require('../lib/log').addAccessLog
var accounts = require('../lib/accounts')

function render(typeIndex, res) {
  var types = accounts.types
  var accountsForCurrentType = getAccountsByType(types[typeIndex])
  var tab_count = types.length
  var data = {accounts:accountsForCurrentType, 
    typeIndex: typeIndex,
    urlPrefix: "/linghai/", 
    types:types}
  console.log(data)
  res.render('linghai', data)
}

function getAccountsByType(type) {
  return accounts.accounts.filter(account => account.type == type) 
}

function router_get_info(typeIndex, req, res) {
  addAccessLog(req, typeIndex)

  console.log("typeIndex:" + typeIndex)
  render(typeIndex, res)
}
/* GET home page. */
router.get('/linghai', function(req, res, next) {
  console.log("linghai")
  router_get_info(0, req, res)
});

router.get('/linghai/:index', function(req, res, next) {
  var index = req.params.index
  var types = accounts.types
  if (index >= types.length) {
    index = types.length - 1
  }
  router_get_info(index, req, res)
});

module.exports = router;
