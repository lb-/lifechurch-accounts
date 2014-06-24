UI.registerHelper('momo', function( date, action ) {
  var thisMoment;
  if ( _.isDate( date ) ) {
    thisMoment = moment( date );
  } else if( moment.isMoment( date ) ) {
    thisMoment = date;
  } else {
    return 'None';
  }

  switch( action ) {
  case "fromNow":
    return thisMoment.fromNow();
  default:
    return thisMoment.toDate();
  }
})
