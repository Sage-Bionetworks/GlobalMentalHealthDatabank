export const schemaHowToParticipate = {
  type: 'object',
  properties: {
    how_to_participate: {
      title: ' ',
      type: 'object',
      properties: {
        participate_option: {
          type: 'string',
          title: ' ',
          enum: [
            'Answer survey questions',
            'Complete in-person visits',
            'Make Phone Calls',
          ],
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
