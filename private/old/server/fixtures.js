runFixtures = function() {
  //Create 'admin' user
  //currently just used as the default user (no admin access set up)
  if ( ! Meteor.users.findOne() ) {
    console.log('Fixtures: No users, creating Admin user');
    Accounts.createUser({
      username: 'admin',
      email: chance.email(),
      password: chance.sentence({words: 4}),
      profile: {
        name: 'Admin ' + chance.last(),
      }
    });
    console.log('Fixtures: user created', Meteor.users.findOne());
  }

  // Create 'cards'
  var newCards = Meteor.settings.cards || [
      {
        designation: chance.name(),
        lastDigits: chance.natural({min: 111, max: 999}),
        description: 'Card',
      },
      {
        designation: chance.name(),
        lastDigits: chance.natural({min: 111, max: 999}),
        description: 'Card',
      },
    ];
  //console.log(newCards);
  _.each( newCards, function( newCard, index, list ) {
    if ( Cards.find({designation: newCard.designation}).count() === 0 ) {
      console.log('Fixtures: Creating card ', newCard);
      Cards.insert(newCard);
    }
  });

  // Create initial card uses
  if ( CardUses.find({}).count() === 0 ) {
    var cards = Cards.find({}).fetch();
    var aUserId = Meteor.users.findOne()._id ;
    console.log('Fixtures: No initial card usages, creating uses with user. ' + aUserId);
    var firstUse = {
      usedBy: aUserId,
      signOutAt: moment().subtract('hours', 6).toDate(),
      signOutComment: 'First Use',
      signInAt: moment().subtract('hours', 2).toDate(),
      signInComment: 'First Use',
    };
    _.each( cards, function(card) {
      CardUses.insert( _.extend({ card: card._id }, firstUse) );
    });
  }

}
