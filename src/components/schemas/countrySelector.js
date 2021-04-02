export const schemaCountrySelector = {
  type: 'object',
  properties: {
    country_chooser: {
      title: ' ',
      type: 'object',
      properties: {
        your_country: {
          type: 'number',
          title: ' ',
          enumNames: ['UK', 'India', 'South Africa', 'Other'],
          enum: [0, 1, 2, 3],
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
