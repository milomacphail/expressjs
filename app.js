var express = require('express');
var app = express();

app.get('/', function(request, response){
   response.send("Hello, World");
})

app.get('/blocks', function(request, response) {
   var blocks = ['Fixed','Moveable','Rotating'];
})

app.get('/blocks', function(request, response) {
   response.redirect(301, '/parts');
});


app.listen(process.env.PORT, process.env.IP, 8080, function(){
    console.log("Listening on port 8080");
});


