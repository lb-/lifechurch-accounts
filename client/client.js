UI.registerHelper("config", Config);

UI.registerHelper("user", function() {
  var user = Meteor.user();
  //console.log(user);
  return user;
});

UI.registerHelper("Schemas", Schemas);

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

Template.card.events({
  'click .btn-action' : function( event, template ) {
    var cardId = this._id;
    var action;
    if ( this.available ) {
      action = 'sign-out';
    } else {
      action = 'sign-in';
    }
    var userId = Meteor.userId();
    Meteor.call( 'cardUseAction',
      action, cardId, userId, function( error, result  ) {
        if ( error ) {
          console.log( 'error', error );
        } else {
          Router.go( 'cardUse', { action: action , _id: result } );
        }
      })
  }
});

// Template.cardUse.events({
//   'click .add-receipt' : function( event, template ) {
//     console.log('add receipt', this, event, template);
//     var action = 'add-receipt'
//     var cardUseId = this.data.cardUse._id;
//     var userId = Meteor.userId();
//     Meteor.call( 'carUseAction', action, cardUseId, userId, function( error, result ) {
//       if ( error ) {
//         console.log( 'error', error );
//       }
//     });
//   },
// });
// Template.main.events({
//   'change #receipt-upload': function( event, template ) {
//     console.log(event);
//     FS.Utility.eachFile( event, function(file) {
//       console.log('file',file);
//       Receipts.insert( file, function( error, fileObj ) {
//         if (error) {
//           console.log('error', error);
//         } else {
//           console.log('file added', fileObj);
//         }
//         //If !err, we have inserted new doc with ID fileObj._id, and
//         //kicked off the data upload using HTTP
//       });
//     });
//   },
//   // 'change #receipt-dropzone' : function( event, template ) {
//   //   console.log('test');
//   // }
// });

Template.cardUse.created = function() {
  Dropzone.options.receiptDropzone = {
    init: function() {
      this.on("addedfile", function( file ) {
        console.log( file );
        Receipts.insert( file, function( error, fileObj ) {
          if (error) {
            console.log('error', error);
          } else {
            console.log('file added', fileObj);
          }
          //If !err, we have inserted new doc with ID fileObj._id, and
          //kicked off the data upload using HTTP
        });
      });
    }
  };
};

//   var dropzoneOptions = {
//     init: function() {
//       this.on("addedfile", function(file) { alert("Added file."); });
//     },
//   };
//   var receiptDropzone = new Dropzone( '#receipt-dropzone', {
//     url: '#',
//   });
//   //Dropzone.options = dropzoneOptions;
//   // $('#receipt-dropzone').dropzone({
//   //   init: function() {
//   //     this.on("addedfile", function(file) { alert("Added file."); });
//   //   },
//   // });
//   // window.Dropzone.discover();
//   // Dropzone.options.myAwesomeDropzone = {
//   // init: function() {
//   //   this.on("addedfile", function(file) { alert("Added file."); });
//   // }
// };
