"use strict";

Template.registerHelper('titleize', function (str) {
  return _.titleize(str);
});
Template.registerHelper('formatMoney', function (amt) {
  return accounting.formatMoney(amt);
});
Template.registerHelper('formatDenomination', function (amt) {
  if (amt >= 1.0) {
    return accounting.formatMoney(amt).replace('.00', '');
  }
  return (amt * 100) + 'c';
});

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

Template.countSheet.helpers({
  'denominationType': function () {
    return [
      {key:'note', title: 'Notes'},
      {key:'coin', title: 'Coins'}
    ];
  },
  'total': function () {
    return 900.00;
  },
  'denominations': function () {
    var allDenominations = [
      {type: 'note', amount: 100.0},
      {type: 'note', amount: 50.0},
      {type: 'note', amount: 10.0},
      {type: 'note', amount: 5.0},
      {type: 'coin', amount: 2.0},
      {type: 'coin', amount: 1.0},
      {type: 'coin', amount: 0.50},
      {type: 'coin', amount: 0.20},
      {type: 'coin', amount: 0.10},
      {type: 'coin', amount: 0.05},
    ];
    return _.where(allDenominations, {type: this.key});
  },
});

Template.countDenomination.created = function () {
  this.quantity = new ReactiveVar();
};

Template.countDenomination.helpers({
  quantity: function () {
    return Template.instance().quantity.get();
  },
  total: function () {
    var quantity = Template.instance().quantity.get();
    if (quantity) {
      return quantity * this.amount;
    }
    return 0.0;
  }
});

Template.countDenomination.events({
  'change input[type="number"]': function (event, template) {
    var number = parseInt(event.target.value);
    if (_.isFinite(number)) {
      template.quantity.set(number);
    }
  }
});






//
