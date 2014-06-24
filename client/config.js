Accounts.ui.config({
  requestOfflineToken: {
    google: true
  }
});

Meteor.startup(function() {
  return AccountsEntry.config({
    //logo: 'logo.png',
    //privacyUrl: '/privacy-policy',
    //termsUrl: '/terms-of-use',
    homeRoute: '/', // when sign out completed
    dashboardRoute: '/', //when sign in completed
    profileRoute: 'profile',
    //passwordSignupFields: 'EMAIL_ONLY',
    //showSignupCode: true
  });
});
