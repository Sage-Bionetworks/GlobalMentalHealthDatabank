let enumNames = ['UK', 'India', 'South Africa', 'Other', 'US (Testing only)']
let enumValues = ['UK', 'IN', 'ZA', 'OTHER', 'US']

if (window.location.hostname === process.env.REACT_APP_PROD_DOMAIN) {
  enumNames = ['UK', 'Other']
  enumValues = ['UK', 'OTHER']
}

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
          enumNames,
          enum: enumValues,
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
