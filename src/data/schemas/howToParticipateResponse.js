export const schemaHowToParticipateResponse = {
  type: 'object',
  properties: {
    how_to_participate: {
      title: ' ',
      type: 'object',
      properties: {
        participate_option: {
          type: 'string',
          title: ' ',
          enumNames: [
            '<span class="radio-z-index">Answer survey questions</span>',
            '<span class="radio-z-index error-message">Complete in-person visits</span>',
            '<span class="radio-z-index error-message">Make Phone Calls</span>',
          ],
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

export const uiSchemaHowToParticipateResponse = {
  how_to_participate: {
    participate_option: {
      'ui:widget': 'radio',
    },
  },
}
