(function() {
    var price, level;
    var handler = StripeCheckout.configure({
        key: 'pk_live_jcbE8jjCSfjqdtbj53tmTstr',
        image: 'img/icon.png',
        locale: 'auto',
        token: function( token ) {
            $.post('/checkout', {
                checkout: {
                    token: token,
                    amount: price,
                    college_discount: !!$( '.college_discount' ).length
                }
            });
        }
    });

    $( '.prices .btn-buy-ticket' ).on('click', function( e ) {
        price = +$( this ).data( 'price' );
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