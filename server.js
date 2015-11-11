var express = require( 'express' );
var app     = express();

app.use(express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.post('/checkout', function( req, res ) {
    res.writeHead( 200 );
    res.end();
});

app.listen( process.env.PORT || 8888 );