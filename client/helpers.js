UI.registerHelper('session', function(key) {
  return Session.get(key);
})

UI.registerHelper('S3url', function( fileObj ) {
  var fileObj = fileObj || this;
  // this is a hack but works for now
  // I should get the bucket URL from the settings
  var S3BucketUrl = 'https://s3-ap-southeast-2.amazonaws.com/accounts-receipts/';
  if ( fileObj.copies.receiptsS3 ) {
    return S3BucketUrl + fileObj.copies.receiptsS3.key;
  }
  return null;
});
