if ( _.isEmpty( Meteor.settings ) ) {
  throw new Error(
    "Meteor Settings not loaded. \n " +
    "Try $ meteor run --settings settings/[dev or deploy].json"
    );
  }
Meteor.startup(function() {
  chance = new Chance();
  // Service Configuration
  // first, remove configuration entry in case service is already configured
  ServiceConfiguration.configurations.remove({
    service: "google"
  });
  ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: Meteor.settings.googleLogin.clientId,
    secret: Meteor.settings.googleLogin.secret,
  });
  // Fixture Data
  runFixtures();
});
