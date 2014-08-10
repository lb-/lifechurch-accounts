Schemas.card = new SimpleSchema([Schemas.baseSchema,{
  designation: {
    type: String,
    label: 'Card Designation',
  },
  lastDigits: {
    type: String,
    label: 'Last Three Digits of Card',
  },
  description: {
    type: String,
    label: 'Description',
  },
}]);

Cards = new Meteor.Collection("cards", {
  schema: Schemas.card,
});
