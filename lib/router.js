Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home',
    data: function() {
      return {
        title : 'Home',
      };
    }
  });
  this.route('profile', {
    path: '/profile',
    template: 'profile',
    data: function() {
      return {
        title: 'User Profile',
        user: Meteor.user(),
      };
    }
  });
});
