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
  this.route('cardUse', {
    path: '/card/:action/:_id',
    template: 'cardUse',
    waitOn: function() {
      return Meteor.subscribe( 'cardUses' );
    },
    data: function() {
      var cardUse = CardUses.findOne({ _id: this.params._id });
      var card = _.findWhere( Default.cards, { _id: cardUse.card });
      console.log(card);
      return {
        card: card,
        cardUse: cardUse,
        action: this.params.action,
      }
    }
  })
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
