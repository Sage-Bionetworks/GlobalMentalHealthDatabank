export const schemaAndroidVerify = {
  type: 'object',
  properties: {
    android_verify: {
      title: ' ',
      type: 'object',
      properties: {
        has_android: {
          type: 'boolean',
          title: ' ',
          enumNames: ['Yes', 'No'],
        },
      },
    },
  },
}

export const uiSchemaAndroidVerify = {
  android_verify: {
    has_android: {
      'ui:widget': 'radio',
    },
  },
}
