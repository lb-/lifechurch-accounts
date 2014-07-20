Meteor.methods({
  'cardUseAction' : function( action, cardId, userId ) {
    //check cardId is provided
    check( cardId, String );

    //check user is signed in
    check( userId, String );

    //check action is valid
    check( action, Match.Where( function(a) {return _.contains( ['sign-in','sign-out'], a ); } ) );

    //get latest card sign in (sort because on server publication sort is N/A)
    var latestCardUse = CardUses.findOne({card:cardId}, { sort: { signOutAt: -1 }});
    
    if  ( ( action === 'sign-out' ) && ( _.isDate( latestCardUse.signInAt ) ) ) {
      var newCardUseId = CardUses.insert({
        card: cardId,
        user: userId,
        signOutAt: moment().toDate(),
      });
      return newCardUseId;
    } else if ( ( action === 'sign-in' ) && ( ! _.isDate( latestCardUse.signInAt) ) ) {
      CardUses.update({ _id: latestCardUse._id }, { $set: { signInAt: moment().toDate() } });
      return latestCardUse._id;
    }

    throw new Meteor.Error(500, 'Action does not match latest card use', {
      latestCardUse: latestCardUse,
      action: action,
      user: userId
    });
  },
  'receiptAction' : function( action, cardUseId, userId, data ) {
    //check cardId is provided
    check( cardId, String );

    //check user is signed in
    check( userId, String );

    //check action is valid
    check( action, Match.Where( function(a) {return _.contains( ['add-receipt'], a ); } ) );

    if ( action === 'add-receipt' ) {
      var cardUse = CardUses.findOne({ _id: cardUseId });

    } else {
      throw new Meteor.Error( 500, 'Action does not match available actions' );
    }

  },
});
