(function() {
    var handler = StripeCheckout.configure({
        key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
        image: 'img/icon.png',
        locale: 'auto',
        token: function( token ) {
            $.post('/checkout', { token_id: token.id, token: token });
        }
    });

    $( '.prices .btn-buy-ticket' ).on('click', function( e ) {
        var price = +$( this ).data( 'price' ),
            level =  $( this ).data( 'level' );

        handler.open({
            name: 'UXDustri 2016',
            description: level + ' Ticket',
            amount: price
        });   

        e.preventDefault();
    });

    $( window ).on('popstate', function() {
        handler.close();
    });
})();

(function() {
    $( '.btn-buy-ticket:first' ).on('click', function() {
        $( 'html, body' ).animate({
            scrollTop: $( '#prices' ).offset().top
         }, 1000);
    });
})();