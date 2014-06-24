if ( CardUses.find({}).count() === 0 ) {
  var aUser = Meteor.users.findOne();
  if ( ! _.isEmpty(aUser) ) {
    CardUses.insert({
      card: Default.cards[0]._id,
      user: aUser._id,
      signOutAt: moment().subtract('hours', 6).toDate(),
      signOutComment: 'sign out comment test',
      signInAt: moment().subtract('hours', 2).toDate(),
      signInComment: 'sign in comment test',
    });
    CardUses.insert({
      card: Default.cards[1]._id,
      user: aUser._id,
      signOutAt: moment().subtract('hours', 12).toDate(),
      signOutComment: 'not going to sign in until tomorrow',
    });
  }
}
