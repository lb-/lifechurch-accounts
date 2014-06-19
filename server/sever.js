Meteor.startup(function() {
  console.log('started up', Date());
  if ( Cards.find().count() === 0 ) {
    var antheaCard = Cards.insert({name: 'Anthea Robinson'});
    console.log(antheaCardUsage);
    var antheaCardUsage = {
      card: antheaCard,
      user: 'abc123',
    };
    //Schemas.cardUsage.clean( antheaCardUsage );
    //console.log(antheaCardUsage);
    var newCardUsage = CardUsages.insert(antheaCardUsage);
    console.log(CardUsages.find({_id:newCardUsage}).fetch());
    var sachaCard = Cards.insert({name: 'Sacha Williams'});
  }
});
