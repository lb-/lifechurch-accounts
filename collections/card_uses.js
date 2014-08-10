// {{> afQuickField name='purpose'}}
// {{> afQuickField name='department'}}
// {{> afQuickField name='approvalCode'}}

Schemas.cardSignOut = new SimpleSchema({
  //This should some how not be a duplicate of what is below
  purpose: {
    type: String,
    label: 'Specific Purpose',
    autoform: {
      placeholder: 'Decorations for Carnival Night'
    }
  },
  department: {
    type: String,
    label: 'Department',
    autoform: {
      placeholder: 'Church / Life Massive / Switch'
    }
  },
  approvalCode: {
    type: String,
    label: 'Approval Code',
    autoform:  {
      placeholder: 'PX14-ABCD'
    }
  },
  signOutComment: {
    type: String,
    label: 'Sign Out Comments',
    optional: true,
    autoform: {
      rows: 3,
    }
  },
});

Schemas.cardUses = new SimpleSchema([
  Schemas.baseSchema,
  {
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
    purpose: {
      type: String,
      label: 'Specific Purpose',
      optional: true,
      autoform: {
        placeholder: 'Decorations for Carnival Night'
      }
    },
    department: {
      type: String,
      label: 'Department',
      optional: true,
      autoform: {
        placeholder: 'Church / Life Massive / Switch'
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
  },
  // userTest: {
  //   type: String,
  //   autoValue: function() {
  //     //console.log('userTest autoValue',this);
  //     return 'test';
  //   }
  // },
]);

CardUses = new Meteor.Collection("cardUses", {
  schema: Schemas.cardUses,
});
