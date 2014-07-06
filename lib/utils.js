utils = {};

utils.getUser = function( userDocOrId ) {
  var user;
  if ( _.isUndefined( userDocOrId ) ) {
    throw Error( 'User is undefined' );
  }
  if ( _.isObject( userDocOrId ) ) {
    user = userDocOrId;
  } else {
    //console.log('user is not object: ' + userDocOrId );
    if ( _.isString( userDocOrId ) ) {
      user = Meteor.users.findOne( { _id: userRef } );
      //add if user not found
      //console.log('user is string');
    } else {
      throw Error( 'Could not find user' );
    }
  }
  return user;
}

utils.user = function( userDoc ) {
  var user = utils.getUser( userDoc );
  var self = {};
  self.name = function() {
    return user.profile.name;
  }
  self._id = user._id;
  return self;
}

utils.processCardUses = function( cardUses ) {
  var cardUsesGroupedByCardId = _.groupBy( cardUses, function( cardUse ) {
    return cardUse.card;
  });
  _.each( Default.cards, function( card ) {
    card.latestUse = {};
    if ( _.has( cardUsesGroupedByCardId, card._id ) ) {
      card.latestUse = _.extend( card.latestUse, cardUsesGroupedByCardId[ card._id ][0] );
    }
    card.latestUse.userDetail = Meteor.users.findOne({_id: card.latestUse.user});
    if ( _.isDate( card.latestUse.signInAt ) ) {
      card.available = true;
      var previousUseFromNow = moment( card.latestUse.signInAt ).fromNow();
      card.previousUseDescription = "Last used " + previousUseFromNow + " ago by " + utils.user( card.latestUse.userDetail ).name();
    } else if ( _.isDate( card.latestUse.signOutAt ) ) {
      card.available = false;
      var currentUseFromNow = moment( card.latestUse.signOutAt ).fromNow();
      card.currentUseDescription = "Signed out " + currentUseFromNow + " ago by " + utils.user( card.latestUse.userDetail ).name();
    } else {
      card.available = true;
    }
  });
  return Default.cards
};
