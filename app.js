var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.delete('/blocks/:name', function(request, response){
    delete blocks[request.blockName];
    response.sendStatus(200);
});

app.post('/blocks', parseUrlencoded, function(request, response){
   var newBlock = request.body;
   blocks[newBlock.name] = newBlock.description;
   response.status(201).json(newBlock.name);
});

var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
};

app.param('name', function(request, response, next){
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.blockName = block;
    next();
}); 

 
app.get('/blocks/:name', function(request, response) {
    var description = blocks[request.blockName];
    if(!description) {
        response.status(404).json("No description found for " + request.params.name);
    } else {
    response.json(description);
    }
});

app.get('/locations/:name', function(request, response) {
    var location = locations[request.blockName];
    if(!location) {
        response.status(404).json("No location found for " + request.params.name);
    } else {
    response.json(location);
    }
});


app.get('/blocks', function(request, response){
    if (request.query.limit >= 0){
        response.json(blocks.slice(0, request.query.limit)); 
    } else {
    response.json(Object.keys(blocks));
    }
});

app.listen(process.env.PORT, process.env.IP, 8080, function(){
    console.log("You are listening on port 8080");
    
});


