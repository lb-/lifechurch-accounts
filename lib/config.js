Config = {
  name: 'Life Church Accounts',
  version: '0.0.1',
}

Router.configure({
  layoutTemplate: 'main',
  waitOn: function() {
    return Meteor.subscribe( 'allUsers' );
  }
});


//https://github.com/aldeed/meteor-simple-schema#extending-the-schema-options
SimpleSchema.debug = true;
SimpleSchema.extendOptions({
  // index: Match.Optional(Match.OneOf(Number, String, Boolean)),
  // unique: Match.Optional(Boolean),
  addToEmail: Match.Optional(Boolean),
  includeInDefaultReport: Match.Optional(Boolean),
  //concept of extending the schema for automatic reporting
  //denyUpdate: Match.Optional(Boolean)
});

Schemas = {};

Schemas.baseSchema = new SimpleSchema({
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  createdAt: {
    type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      },
      denyUpdate: true
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  //Note this will probably not work like I think becuase
  //there is no 'current user' on the server
  // createdBy: {
  //   type: String,
  //   autoValue: function() {
  //     if (this.isInsert) {
  //       return Meteor.userId();
  //     } else if (this.isUpsert) {
  //       return {$setOnInsert: Meteor.userId()};
  //     } else {
  //       this.unset();
  //     }
  //   },
  //   denyUpdate: true
  // },
  // updatedBy: {
  //   type: String,
  //   autoValue: function() {
  //     if (this.isUpdate) {
  //       return Meteor.userId();
  //     }
  //   },
  //   denyInsert: true,
  //   optional: true
  // },
});
