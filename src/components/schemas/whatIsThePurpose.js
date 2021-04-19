export const schemaWhatIsThePurpose = {
  type: 'object',
  properties: {
    what_is_the_purpose: {
      type: 'string',
      title: ' ',
      enum: [
        'To participate in research',
        'To receive medical care',
        'To obtain medial insurance',
      ],
    },
  },
}

export const uiSchemaWhatIsThePurpose = {
  what_is_the_purpose: {
    'ui:widget': 'radio',
  },
}
