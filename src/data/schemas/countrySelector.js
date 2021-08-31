import { isProductionEnv } from 'helpers/utility'

let enumNames = ['UK', 'India', 'South Africa', 'Other', 'US (Testing only)']
let enumValues = ['UK', 'IN', 'ZA', 'OTHER', 'US']

if (isProductionEnv()) {
  enumNames = ['UK', 'India', 'Other']
  enumValues = ['UK', 'IN', 'OTHER']
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
