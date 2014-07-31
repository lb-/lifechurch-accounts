if ( CardUses.find({}).count() === 0 ) {
  var aUser = Meteor.users.findOne();
  if ( ! _.isEmpty(aUser) ) {
    var firstUse = {
      user: aUser._id,
      signOutAt: moment().subtract('hours', 6).toDate(),
      signOutComment: 'First Use',
      signInAt: moment().subtract('hours', 2).toDate(),
      signInComment: 'First Use',
    };
    CardUses.insert(_.extend({card:Default.cards[0]._id}, firstUse));
    CardUses.insert(_.extend({card:Default.cards[1]._id}, firstUse));
  }
}
