var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3')
var dbfileName = "./app1.sqlite"
const wasm = require("../public/pkg");

//
router.get('/', function(req, res, next) {
//  res.send('respond with a resource-1234');
  res.render('wasm_tasks/index', {});
});
//
router.get('/test', function(req, res, next) {
    res.render('wasm_tasks/test', {});
});
//
router.get('/api_test', function(req, res, next) {
    var db = new sqlite3.Database( dbfileName )
    var items = []
    db.serialize(function() {
        db.all('SELECT id,title, content FROM tasks order by id desc;', function(err, rows) {
            rows.forEach( function (item) {
                items.push(item  );
            });
            var elem = wasm.wasm_object_array("div_post_wrap", items);
//console.log(elem);
            res.send(`<div>
                ${elem}
            </div>`);
        });
        db.close();
    });
});


module.exports = router;
