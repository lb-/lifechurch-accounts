"use strict";

Template.pageHeader.rendered = function () {
  $('[data-action="toggle-menu"]').sidr({
    name: 'main-menu',
    source: '#navigation',
    speed: 150,
  });
};

Template.pageHeader.events({
  'click [data-action="toggle-menu"]': function (event) {
    event.preventDefault();
    $.sidr('toggle', 'navigation');
  }
});
