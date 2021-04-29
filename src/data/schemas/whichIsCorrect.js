export const schemaWhichIsCorrect = {
  type: 'object',
  properties: {
    which_is_correct: {
      type: 'string',
      title: ' ',
      enum: [
        'If I start participating, I have to continue until the end.',
        'I can stop at any time.',
        'I will get a penalty if I leave the study.',
      ],
    },
  },
}

export const uiSchemaWhichIsCorrect = {
  which_is_correct: {
    'ui:widget': 'radio',
  },
}
