UI.registerHelper("user", function() {
  var user = Meteor.user();
  //console.log(user);
  return user;
});

UI.registerHelper("Schemas", Schemas);

UI.registerHelper('usage', {
  designation: 'Sacha Williams',
  signInMode: false,
  receipts: [
    { i: 1, },
    { i: 2, },
  ],
});

UI.registerHelper('cards', [
  {
    designation: 'Sacha Williams',
    available: true,
    previousUsageDescription: 'Last used 20 minutes ago by Joe',
    currentUsageDescription: '',
  },
  {
    designation: 'Anthea Robinson',
    available: false,
    previousUsageDescription: 'Last used 2 days ago by Andrew',
    currentUsageDescription: 'Signed out 3 hours ago by Jackson',
  }
]);


UI.registerHelper('enabled', function(check) {
  if ( check === null ) {
    return 'disabled';
  }
})

UI.registerHelper('ordinalNumber', function( number ) {
  function getOrdinal(n) {
   var s=["th","st","nd","rd"],
       v=n%100;
   return n+(s[(v-20)%10]||s[v]||s[0]);
 }
 return getOrdinal( number );
})
