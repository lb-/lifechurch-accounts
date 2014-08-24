Template.categories.filteredCategories = function () {
  Session.set('totalCategories', 'foo');
  return this.categories;
}
Template.categories.events({
  'keyup, change #search' : function (event) {
    var searchEntry = event.target.value;
    if ( ! Session.equals('search', searchEntry ) ) {
      Session.set( 'search', searchEntry );
    }
    console.log(Session.get('search'));
    //console.log(searchEntry);//this, event, target);
  }
});

// Template.categories.totalCategories = function () {
//   //This will have to be re-worked for future (when total changes)
//   return this.categories.length;
// }
