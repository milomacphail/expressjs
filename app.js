var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

app.get('/blocks', function(request, response){
    var blocks = ["Fixed", "Movable", "Rotating"];
    response.json(blocks);
});

app.listen(process.env.PORT, process.env.IP, 8080, function(){
    console.log("You are listening on port 8080");
});


