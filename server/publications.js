Meteor.publish( "cardUses", function() {
  return CardUses.find({});
});

Meteor.publish( "allUsers", function() {
  return Meteor.users.find( {} );
});
