export const schemaMentalHealthExperience = {
  type: 'object',
  properties: {
    mentalHealthExperience: {
      type: 'array',
      title: ' ',
      items: {
        type: 'string',
        enum: [
          'My mental health has interfered with my daily life',
          'I have received support (outside my friends and family) for my mental health',
          'I could have benefited from support for my mental health.',
          'I have not experienced any significant mental health challenges',
        ],
      },
      uniqueItems: true,
    },
  },
}

export const uiSchemaMentalHealthExperience = {
  mentalHealthExperience: {
    'ui:widget': 'checkboxes',
  },
}
