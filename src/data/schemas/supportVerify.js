export const schemaSupportVerify = {
  type: 'object',
  properties: {
    support_verify: {
      title: ' ',
      type: 'object',
      properties: {
        accept: {
          type: 'boolean',
          title: ' ',
          enumNames: ['Yes', 'No'],
        },
      },
    },
  },
}

export const uiSchemaSupportVerify = {
  support_verify: {
    accept: {
      'ui:widget': 'radio',
    },
  },
}
