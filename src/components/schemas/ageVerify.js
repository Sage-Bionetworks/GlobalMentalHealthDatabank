export const schemaAgeVerify = {
  type: 'object',
  properties: {
    age_verify: {
      title: ' ',
      type: 'object',
      properties: {
        age_range: {
          type: 'boolean',
          title: ' ',
          enumNames: ['Yes', 'No'],
        },
      },
    },
  },
}

export const uiSchemaAgeVerify = {
  age_verify: {
    age_range: {
      'ui:widget': 'radio',
    },
  },
}
