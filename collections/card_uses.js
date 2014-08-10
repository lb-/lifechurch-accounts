Schemas.cardUses = new SimpleSchema([Schemas.baseSchema,{
  card: {
    type: String,
    label: 'Card Id',
    optional: false,
  },
  usedBy: {
    type: String,
    label: 'User Id',//will be a user reference _id
    optional: false,
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
    addToEmail: false,
    optional: true,
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
    autoform: {
      rows: 3,
    }
  },
  signInComment: {
    type: String,
    label: 'Sign In Comments',
    optional: true,
  },
  department: {
    type: String,
    label: 'Department',
    optional: true,
    autoform: {
      placeholder: 'Church / Life Massive / Switch'
    }
  },
  purpose: {
    type: String,
    label: 'Specific Purpose',
    optional: true,
    autoform: {
      placeholder: 'Decorations for Carnival Night'
    }
  },
  approvalCode: {
    type: String,
    label: 'Approval Code',
    optional: true,
    autoform:  {
      placeholder: 'PX14-ABCD'
    }
  },
}]);

CardUses = new Meteor.Collection("cardUses", {
  schema: Schemas.cardUses,
});
