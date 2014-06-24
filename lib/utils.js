processCardUses = function( cardUses ) {
  var cardUsesGroupedByCardId = _.groupBy( cardUses, function( cardUse ) {
    return cardUse.card;
  });
  _.each( Default.cards, function( card ) {
    card.latestUse = {};
    if ( _.has( cardUsesGroupedByCardId, card._id ) ) {
      card.latestUse = _.extend( card.latestUse, cardUsesGroupedByCardId[ card._id ][0] );
    }
    if ( _.isDate( card.latestUse.signInAt ) ) {
      card.available = true;
      var previousUseFromNow = moment( card.latestUse.signInAt ).fromNow();
      card.previousUseDescription = "Last used " + previousUseFromNow + " ago by " + card.latestUse.user;
    } else if ( _.isDate( card.latestUse.signOutAt ) ) {
      card.available = false;
      var currentUseFromNow = moment( card.latestUse.signOutAt ).fromNow();
      card.currentUseDescription = "Signed out " + currentUseFromNow + " ago by " + card.latestUse.user;
    } else {
      card.available = true;
    }
  });
  return Default.cards
};
