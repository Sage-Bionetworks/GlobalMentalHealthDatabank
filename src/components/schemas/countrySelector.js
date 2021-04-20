export const schemaCountrySelector = {
  type: 'object',
  properties: {
    country_chooser: {
      title: ' ',
      type: 'object',
      properties: {
        your_country: {
          type: 'string',
          title: ' ',
          enum: ['UK', 'India', 'South Africa', 'Other', 'US (Testing only)'],
        },
      },
    },
  },
}

export const uiSchemaCountrySelector = {
  country_chooser: {
    your_country: {
      'ui:widget': 'radio',
    },
  },
}
