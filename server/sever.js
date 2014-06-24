Meteor.startup(function() {
  if ( _.isEmpty( Meteor.settings ) ) {
    throw new Meteor.Error( 500, "Meteor Settings not loaded. \n Try $ meteor run --settings settings/[dev or deploy].json" );
  } else {
    //console.log('started up', Date());
    if ( Cards.find({name: 'Anthea Robinson'}).count() === 0 ) {
      var antheaCard = Cards.insert({name: 'Anthea Robinson'});
    }
    if ( Cards.find({name: 'Sacha Williams'}).count() === 0 ) {
      var sachaCard = Cards.insert({name: 'Sacha Williams'});
    }
    // first, remove configuration entry in case service is already configured
    ServiceConfiguration.configurations.remove({
      service: "google"
    });
    ServiceConfiguration.configurations.insert({
      service: "google",
      clientId: Meteor.settings.googleLogin.clientId,
      secret: Meteor.settings.googleLogin.secret,
    });
  }

});
