UI.registerHelper("config", Config);

UI.registerHelper("user", function() {
  var user = Meteor.user();
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
Template.cardUse.created = function() {
  Dropzone.options.receiptDropzone = {
    init: function() {
      this.on("addedfile", function( file ) {
        var self = this;
        var file = file;
        file.cardUse = 'joe';
        //change to 'uploading' by removing class
        file.previewElement.classList.remove('dz-success');
        Receipts.insert( file, function( error, fileObj ) {
          if (error) {
            //manually change to error & add error message
            var node, _i, _len, _ref, _results;
            var message = error.message;
            file.previewElement.classList.add('dz-error');
            _ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              node = _ref[_i];
              _results.push(node.textContent = message);
            }
          } else {
            file.previewElement.classList.add('dz-success');
            console.log('file added', fileObj);
          }
        });
      });
    }
  };
};
