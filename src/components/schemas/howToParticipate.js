export const schemaHowToParticipate = {
  type: 'object',
  properties: {
    how_to_participate: {
      title: ' ',
      type: 'object',
      properties: {
        participate_option: {
          type: 'number',
          title: ' ',
          enumNames: [
            'Answer survey questions',
            'Complete in-person visits',
            'Make Phone Calls',
          ],
          enum: [0, 1, 2],
        },
      },
    },
  },
}

export const uiSchemaHowToParticipate = {
  how_to_participate: {
    participate_option: {
      'ui:widget': 'radio',
    },
  },
}
