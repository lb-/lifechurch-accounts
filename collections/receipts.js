Schemas.receipt = new SimpleSchema([Schemas.baseSchema,{
  upload: {
    label: 'Photo',
    type: String,
  },
  merchant: {
    label: 'Merchant',
    type: String,
  },
  purchaseDate: {
    label: 'Purchase Date',
    type: Date,
  },
  approvalCode: {
    label: 'Approval Code',
    type: String,
  },
  comment: {
    label: 'Comments',
    type: String,
    optional: true,
  },
  total: {
    label: "Receipt Total",
    type: Number,
    decimal: true,
  },
}]);
