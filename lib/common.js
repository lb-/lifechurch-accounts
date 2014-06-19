Schemas = {};
Schemas.cardUsage = new SimpleSchema({
  user: {
    type: String,
    label: 'Name & Email',
  },
  purpose: {
    type: String,
    label: 'Purpose',
  },
  signOutMoment: {
    type: Date,//Moment?
    label: "Signed Out",
  },
  signInMoment: {
    type: Date,//Moment?
    label: "Signed In",
    optional: true,
  },
  signOutComments: {
    type: String,
    label: 'Sign Out Comments',
    optional: true,
  },
  signInComments: {
    type: String,
    label: 'Sign Out Comments',
    optional: true,
  },
  signOutComments: {
    type: String,
    label: 'Sign Out Comments',
    optional: true,
  },
});
Schemas.receipt = new SimpleSchema({
  upload: {
    label: 'Photo',
    type: String,
  },
  merchant: {
    label: 'Merchant',
    type: String,
  },
  purchaseDate: {
    label: 'Purchase Date',
    type: Date,
  },
  approvalCode: {
    label: 'Approval Code',
    type: String,
  },
  comment: {
    label: 'Comments',
    type: String,
    optional: true,
  },
  total: {
    label: "Receipt Total",
    type: Number,
    decimal: true,
  },
});

CardUsages = new Meteor.Collection("cardUsages", {
  schema: {
    name: {
      type: String,
      label: "Name",
      max: 200,
    },
    signedOut: {
      type: Date,
      label: "Signed Out",
      optional: false,
    }
  }

});
