Schemas.cardUsage = new SimpleSchema([Schemas.baseSchema,{
  card: {
    type: String,
    label: 'Card Id',
  },
  user: {
    type: String,
    label: 'Name & Email',
  },
  userTest: {
    type: String,
    autoValue: function() {
      console.log('userTest autoValue',this);
      return 'test';
    }
  },
  purpose: {
    type: String,
    label: 'Purpose',
    optional: true,//just while testing
  },
  signedOutAt: {
    type: Date,//Moment?
    label: "Signed Out",
    optional: true,//just while testing
  },
  signedInAt: {
    type: Date,//Moment?
    label: "Signed In",
    optional: true,
  },
  signedOutComments: {
    type: String,
    label: 'Sign Out Comments',
    optional: true,
  },
  signedInComments: {
    type: String,
    label: 'Sign In Comments',
    optional: true,
  },
  signOutComments: {
    type: String,
    label: 'Sign Out Comments',
    optional: true,
  },
}]);

CardUsages = new Meteor.Collection("cardUsages", {
  schema: Schemas.cardUsage,
});
