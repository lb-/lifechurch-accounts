utils = {};

utils.getUser = function( userDocOrId ) {
  //console.log('getUser function called with', userDocOrId)
  //gets a user document or id, returns the document if can be found
  var user = null;
  if ( _.isUndefined( userDocOrId ) ) {
    console.error( 'User is undefined' );
  } else if ( _.isNull( userDocOrId ) ) {
    console.error( 'User is null' );
  } else if ( _.isObject( userDocOrId ) ) {
    user = userDocOrId;
  } else if ( _.isString( userDocOrId ) ) {
      user = Meteor.users.findOne( { _id: userDocOrId } );
      //add if user not found
      //console.log('user is string');
  } else {
      console.error( 'Could not find user' );
  }
  user.name = function() {
    return user.profile.name;
  }
  return user;
}

utils.processCardUses = function( cardUses, cards ) {
  var cardsWithUses = [];
  var cardUsesGroupedByCardId = _.groupBy( cardUses, function( cardUse ) {
    return cardUse.card;
  });
  //console.log('cardUsesGroupedByCardId', cardUsesGroupedByCardId)
  _.each( cards, function( card ) {
    //console.log(card);
    card.allUses = cardUsesGroupedByCardId[ card._id ];
    card.latestUse = card.allUses[0];
    //console.log(cardUsesGroupedByCardId[ card._id ][0]);
    // if ( _.has( cardUsesGroupedByCardId, card._id ) ) {
    //   //console.log('cardUsesGroupedByCardId[ card._id ][0]',cardUsesGroupedByCardId[ card._id ][0])
    //   card.latestUse = _.extend(
    //     card.latestUse,
    //     cardUsesGroupedByCardId[ card._id ][0]
    //   );
    // }
    //console.log(card.latestUse);
    card.latestUse.usedByDoc = utils.getUser( card.latestUse.usedBy );
    if ( _.isDate( card.latestUse.signInAt ) ) {
      card.available = true;
      var previousUseFromNow = moment( card.latestUse.signInAt ).fromNow();
      card.previousUseDescription = "Last used " + previousUseFromNow + " ago by " + card.latestUse.usedByDoc.name();
    } else if ( _.isDate( card.latestUse.signOutAt ) ) {
      card.available = false;
      var currentUseFromNow = moment( card.latestUse.signOutAt ).fromNow();
      card.currentUseDescription = "Signed out " + currentUseFromNow + " ago by " + card.latestUse.usedByDoc.name();
    } else {
      card.available = true;
    }
    cardsWithUses.push(card);
  });
  return cardsWithUses;
};
