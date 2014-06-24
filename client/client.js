UI.registerHelper("config", Config);

UI.registerHelper("user", function() {
  var user = Meteor.user();
  //console.log(user);
  return user;
});

UI.registerHelper("Schemas", Schemas);

UI.registerHelper('usage', {
  designation: 'Sacha Williams',
  signInMode: true,
  receipts: [
    { i: 1, },
    { i: 2, },
  ],
});


UI.registerHelper('enabled', function(check) {
  if ( check === null ) {
    return 'disabled';
  }
})

UI.registerHelper('ordinalNumber', function( number ) {
  function getOrdinal(n) {
   var s=["th","st","nd","rd"],
       v=n%100;
   return n+(s[(v-20)%10]||s[v]||s[0]);
 }
 return getOrdinal( number );
})

Template.card.events({
  'click .btn-action' : function( event, template ) {
    //console.log(this, event, template);
    var cardId = this._id;
    var action;
    if ( this.available ) {
      action = 'sign-out';
    } else {
      action = 'sign-in';
    }
    //data-action="{{#if available}}sign-out{{else}}sign-in{{/if}}"
    //console.log(this.available);
    //var action = $( event.target ).data('action');

    var userId = Meteor.userId();
    //console.log(cardId, action, userId);
    Meteor.call( 'cardUseAction',
      action, cardId, userId, function( error, result  ) {
        if ( error ) {
          console.log( 'error', error );
        } else {
          //Router.go( 'card', { action: action , _id: result } );
          console.log( result );
        }
      })
  }
})
