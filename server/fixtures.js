runFixtures = function() {
  //Create 'admin' user
  //currently just used as the default user (no admin access set up)
  if ( ! Meteor.users.findOne() ) {
    console.log('Fixtures: No users, creating Admin user');
    Accounts.createUser({
      username: 'admin',
      email: 'admin@lifechurchcentral.com',
      password: chance.sentence({words: 4}),
      profile: {
        name: 'admin user',
      }
    });
  }

  // Create 'cards'
  // To do - these names should come from some settings
  if ( Cards.find({name: 'Anthea Robinson'}).count() === 0 ) {
    console.log('Fixtures: No Anthea Robinson Card, creating card');
    var antheaCard = Cards.insert({name: 'Anthea Robinson', });
  }
  if ( Cards.find({name: 'Sacha Williams'}).count() === 0 ) {
    console.log('Fixtures: No Sacha Williams Card, creating card');
    var sachaCard = Cards.insert({name: 'Sacha Williams'});
  }

  // Create initial card uses
  if ( CardUses.find({}).count() === 0 ) {
    var aUser = Meteor.users.findOne();
    console.log('Fixtures: No initial card usages, creating uses');
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

}
