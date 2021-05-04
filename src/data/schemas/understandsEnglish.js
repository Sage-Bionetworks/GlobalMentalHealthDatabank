export const schemaUnderstandsEnglish = {
  type: 'object',
  properties: {
    understands_english: {
      title: ' ',
      type: 'object',
      properties: {
        understands_english_option: {
          type: 'boolean',
          title: ' ',
          enumNames: ['Yes', 'No'],
        },
      },
    },
  },
}

export const uiSchemaUnderstandsEnglish = {
  understands_english: {
    understands_english_option: {
      'ui:widget': 'radio',
    },
  },
}
