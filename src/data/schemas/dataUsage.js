export const schemaDataUsage = {
  type: 'object',
  properties: {
    dataUsage: {
      title: ' ',
      type: 'object',
      properties: {
        dataUsageOptions: {
          type: 'string',
          title: ' ',
          enum: [
            'My data should only be available for mental health research.',
            'My data should be available for all types of health research. ',
            'My data should be available for broad research purposes.',
            "I don't care how my data is used.",
          ],
        },
      },
    },
  },
}

export const uiSchemaDataUsage = {
  dataUsage: {
    dataUsageOptions: {
      'ui:widget': 'radio',
    },
  },
}
