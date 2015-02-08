if ( Meteor.isServer ) {
  receiptImagesS3 = new FS.Store.S3( 'receiptsS3', {
    region: Meteor.settings.S3.region,
    bucket: Meteor.settings.S3.bucket,
    accessKeyId: Meteor.settings.S3.accessKeyId,
    secretAccessKey: Meteor.settings.S3.secretAccessKey,
    ACL: Meteor.settings.S3.ACL,
  });
} else {
  receiptImagesS3 = new FS.Store.S3( 'receiptsS3', {bucket: 'client'});
}

Receipts = new FS.Collection( 'receipts', {
  stores: [ receiptImagesS3 ],
  filter: {
    allow: {
      contentTypes: ['image/*', 'application/pdf']
    }
  },
});

Receipts.allow({
  insert: function( userId, doc ) {
    if ( userId ) {
      return true;
    }
    return false;
  },
  update: function( userId, doc ) {
    if ( userId ) {
      return true;
    }
    return false;
  }
});

// Schemas.receipt = new SimpleSchema([Schemas.baseSchema,{
//   upload: {
//     label: 'Photo',
//     type: String,
//     optional: true,
//   },
//   merchant: {
//     label: 'Merchant',
//     type: String,
//     optional: true,
//   },
//   purchaseDate: {
//     label: 'Purchase Date',
//     type: Date,
//     optional: true,
//   },
//   approvalCode: {
//     label: 'Approval Code',
//     type: String,
//     optional: true,
//   },
//   comment: {
//     label: 'Comments',
//     type: String,
//     optional: true,
//   },
//   total: {
//     label: "Receipt Total",
//     type: Number,
//     decimal: true,
//   },
// }]);
