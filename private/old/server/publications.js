Meteor.publish( 'cardUses', function() {
  return CardUses.find({});
});

Meteor.publish( 'allUsers', function() {
  return Meteor.users.find( {} );
});

Meteor.publish( 'receipts', function() {
  return Receipts.find( {} );
});

Meteor.publish( 'cards', function() {
  return Cards.find( {} );
});
