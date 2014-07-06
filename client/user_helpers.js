UI.registerHelper( '_user', function( user, action ) {
  var action = action || 'name';
  switch( action ) {
  case 'name':
    return utils.user( user ).name();
  default:
    return thisMoment.toDate();
  }
})
