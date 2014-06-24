Meteor.publish( "cardUses", function() {
  return CardUses.find({});
});
