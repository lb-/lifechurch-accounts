_.toggle = function(array, element) {
  var array = array || [];
  if ( _.contains(array, element) ) {
    return _.without(array, element);
  }
  array.push(element);
  return array;
}
