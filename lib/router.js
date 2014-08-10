Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home',
    waitOn: function() {
      return [
        Meteor.subscribe( 'cardUses' ),
        Meteor.subscribe( 'cards' ),
      ]
    },
    data: function() {
      // var latestCardUses = [];
      var cardUses = CardUses.find({}, { sort: { signOutAt: -1 } }).fetch();
      var cards = Cards.find({}).fetch();
      //console.log('carduses', cardUses, 'cards', cards);
      //console.log(cards);
      //console.log( cardUses.fetch()[0].user );
      //not sure how the publishComposite thing works
      // _.each( cards, function( card ) {
      //   var latestCardUse = CardUses.findOne({card:card._id}, { sort: { signOutAt: -1 }});
      //   if ( latestCardUse ) {
      //     latestCardUses.push( latestCardUse );
      //   }
      // });
      var cardsWithUses = utils.processCardUses( cardUses, cards );
      return {
        title : 'Home',
        cardsWithUses: cardsWithUses,
        cardUses: cardUses,
        users: Meteor.users,
        receipts: Receipts.find({}),
      };
    }
  });
  this.route('cardUse', {
    path: '/card/:action/:_id',
    template: 'cardUse',
    waitOn: function() {
      return [
        Meteor.subscribe( 'cardUses' ),
        Meteor.subscribe( 'cards' ),
        Meteor.subscribe( 'receipts' )
      ];
    },
    data: function() {
      var cardUse = CardUses.findOne({ _id: this.params._id });
      var cards = Cards.find({}).fetch();
      var card = _.findWhere( cards, { _id: cardUse.card });
      //should be receipts for that card use only
      var receipts = Receipts.find({});
      //console.log(card);
      return {
        card: card,
        cardUse: cardUse,
        receipts: receipts,
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
