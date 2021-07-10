export const schemaDataPayment = {
  type: 'object',
  properties: {
    dataPayment: {
      title: ' ',
      type: 'object',
      properties: {
        dataPaymentOptions: {
          type: 'string',
          title: ' ',
          enum: [
            'Only commercial companies should have to pay to use my data. ',
            'Nobody should have to pay to use my data.',
            "I don't care if people have to pay to use my data.",
          ],
        },
      },
    },
  },
}

export const uiSchemaDataPayment = {
  dataPayment: {
    dataPaymentOptions: {
      'ui:widget': 'radio',
    },
  },
}
