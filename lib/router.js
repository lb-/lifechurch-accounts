Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home',
    waitOn: function() {
      return Meteor.subscribe( 'cardUses' );
    },
    data: function() {
      latestCardUses = [];
      _.each( Default.cards, function( card ) {
        var latestCardUse = CardUses.findOne({card:card._id}, { sort: { signOutAt: -1 }});
        if ( latestCardUse ) {
          latestCardUses.push( latestCardUse );
        }
      });
      return {
        title : 'Home',
        cards: processCardUses( latestCardUses ),
        cardUses: CardUses.find({}, { sort: { signOutAt: -1 } }),
      };
    }
  });
  this.route('profile', {
    path: '/profile',
    template: 'profile',
    data: function() {
      return {
        title: 'User Profile',
        user: Meteor.user(),
      };
    }
  });
});
