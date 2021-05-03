export const schemaGender = {
  type: 'object',
  properties: {
    gender: {
      type: 'array',
      title: ' ',
      items: {
        type: 'string',
        enum: [
          'Woman',
          'Man',
          'Third gender / Non-Binary',
          'Transgender',
          'Other',
          'Prefer not to say',
        ],
      },
      uniqueItems: true,
    },
  },
}

export const uiSchemaGender = {
  gender: {
    'ui:widget': 'checkboxes',
  },
}
