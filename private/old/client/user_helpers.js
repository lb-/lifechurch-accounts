UI.registerHelper( '_user', function( user, action ) {
  //console.log('helper _user called with:', user);
  var action = action || 'name';
  switch( action ) {
  case 'name':
    return utils.getUser(user).name();
  default:
    return thisMoment.toDate();
  }
})
