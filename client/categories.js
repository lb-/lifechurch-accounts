Template.categories.rendered = function() {
  Session.setDefault('excludedTypes',[]);
}
Template.categories.types = function() {
  var excludedTypes = Session.get('excludedTypes');
  var typePairs = _.pairs(
    _.countBy(this.categories, function(category) {
      return category.type;
    })
  );
  types = [];
  _.each(typePairs, function(typePair) {
    var type = {
      name: typePair[0],
      count: typePair[1],
      exclude: false,
    };
    if ( _.contains(excludedTypes, type.name) ) {
      type.exclude = true;
    }
    types.push(type);
  })
  return types;
}
Template.categories.filteredCategories = function () {
  var searchEntry = Session.get('searchEntry');
  var excludedTypes = Session.get('excludedTypes');
  var categories = _.filter(this.categories, function(category) {
    return ! _.contains(excludedTypes, category.type);
  });
  var fuseOptions = {
    keys: ['type', 'name'],
  }
  var result = [];
  if ( searchEntry ) {
    var categoriesFuse = new Fuse(categories, fuseOptions);
    result = categoriesFuse.search( searchEntry );
  } else  {
    result = categories;
  }
  return result;
}
Template.categories.events({
  'keyup, change #search' : function (event) {
    var searchEntry = event.target.value.trim();
    if ( ! Session.equals('searchEntry', searchEntry) ) {
      Session.set( 'searchEntry', searchEntry );
    }
  },
  'click .clear-search-entry' : function() {
    Session.set('searchEntry', null);
  },
  'click .toggle-type' : function (event) {
    var excludedTypes = Session.get('excludedTypes');
    Session.set('excludedTypes', _.toggle(excludedTypes, this.name));
  }
});
