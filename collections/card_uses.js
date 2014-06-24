Schemas.cardUses = new SimpleSchema([Schemas.baseSchema,{
  card: {
    type: String,
    label: 'Card Id',
  },
  user: {
    type: String,
    label: 'Name & Email',//will be a user reference _id
  },
  // userTest: {
  //   type: String,
  //   autoValue: function() {
  //     //console.log('userTest autoValue',this);
  //     return 'test';
  //   }
  // },
  signOutAt: {
    type: Date,
    label: "Signed Out",
  },
  signInAt: {
    type: Date,
    label: "Signed In",
    optional: true,
  },
  signOutComment: {
    type: String,
    label: 'Sign Out Comments',
    optional: true,
  },
  signInComment: {
    type: String,
    label: 'Sign In Comments',
    optional: true,
  },
  purpose: {
    type: String,
    label: 'Purpose',
    optional: true,
  },
}]);

CardUses = new Meteor.Collection("cardUses", {
  schema: Schemas.cardUses,
});
