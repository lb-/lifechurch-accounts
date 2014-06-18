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
