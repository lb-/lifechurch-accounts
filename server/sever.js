Meteor.startup(function() {
  console.log('started up', Date());
  if ( Cards.find({name: 'Anthea Robinson'}).count() === 0 ) {
    var antheaCard = Cards.insert({name: 'Anthea Robinson'});
  }
  if ( Cards.find({name: 'Sacha Williams'}).count() === 0 ) {
    var sachaCard = Cards.insert({name: 'Sacha Williams'});
  }
    //console.log(antheaCardUsage);
    //var antheaCardUsage = {
    //  card: antheaCard,
    //  user: 'abc123',
    //};
    //Schemas.cardUsage.clean( antheaCardUsage );
    //console.log(antheaCardUsage);
    //var newCardUsage = CardUsages.insert(antheaCardUsage);
    //console.log(CardUsages.find({_id:newCardUsage}).fetch());
    //var sachaCard = Cards.insert({name: 'Sacha Williams'});

    
  // first, remove configuration entry in case service is already configured
  ServiceConfiguration.configurations.remove({
    service: "google"
  });
  ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: Meteor.settings.googleLogin.clientId,
    secret: Meteor.settings.googleLogin.secret,
  });
});
