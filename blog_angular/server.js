

var express = require('express');
var path = require('path')
var app = express();
var bodyparser = require('body-parser');
var port = process.env.PORT || 8070;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(__dirname +'/public'));
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log("testing cross origin")
    next();
}

app.use(allowCrossDomain);

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname+ '/public/app/views/index.html'))
})

app.listen(port, function(){
	console.log("running the server on "+ port)
});

