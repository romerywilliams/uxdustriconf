var express = require( 'express' );
var stripe  = require( 'stripe' )( 'sk_live_Tkpopk87uV6sGa3X7C5wm8X1' );
var app     = express();
var bodyParser = require( 'body-parser' );
var crypto  = require( 'crypto' );

app.use(express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}));

app.post('/checkout', function( req, res ) {

	var checkout = req.body.checkout,
		retryKey = crypto.randomBytes( 20 ).toString( 'hex' ),
		amount   = checkout.amount;

	stripe.charges.create({
		amount: amount,
		currency: 'usd',
		source: checkout.token.id, // obtained with Stripe.js
		description: 'UXDustri Ticket'
	}, {
	  	idempotency_key: retryKey
	}, function( err, charge ) {
	 	console.log( err );
	 	console.log( charge );
	});
});

app.listen( process.env.PORT || 8888 );