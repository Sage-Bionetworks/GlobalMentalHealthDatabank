export const schemaDataSharing = {
  type: 'object',
  properties: {
    dataSharing: {
      title: ' ',
      type: 'object',
      properties: {
        dataSharingOptions: {
          type: 'string',
          title: ' ',
          enum: [
            'Results should be shared for free with the world.',
            'Results should be shared in an easy to understand way with participants.',
            'Both are important to me.',
            "I don't care how results are shared with participants.",
          ],
        },
      },
    },
  },
}

export const uiSchemaDataSharing = {
  dataSharing: {
    dataSharingOptions: {
      'ui:widget': 'radio',
    },
  },
}
