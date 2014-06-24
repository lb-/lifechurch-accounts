UI.registerHelper("config", Config);

UI.registerHelper("user", function() {
  var user = Meteor.user();
  //console.log(user);
  return user;
});

UI.registerHelper("Schemas", Schemas);

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
    var cardId = this._id;
    var action;
    if ( this.available ) {
      action = 'sign-out';
    } else {
      action = 'sign-in';
    }
    var userId = Meteor.userId();
    Meteor.call( 'cardUseAction',
      action, cardId, userId, function( error, result  ) {
        if ( error ) {
          console.log( 'error', error );
        } else {
          Router.go( 'cardUse', { action: action , _id: result } );
        }
      })
  }
})
