Schemas.card = new SimpleSchema([Schemas.baseSchema,{
  name: {
    type: String,
    label: 'Card Name',
  }
}]);

Cards = new Meteor.Collection("cards", {
  schema: Schemas.card,
});
