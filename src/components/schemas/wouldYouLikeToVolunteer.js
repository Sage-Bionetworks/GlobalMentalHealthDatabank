export const schemaWouldYouLikeToVolunteer = {
  type: 'object',
  properties: {
    would_you_volunteer: {
      title: ' ',
      type: 'boolean',
      enumNames: ['Yes', 'No'],
    },
  },
}

export const uiSchemaWouldYouLikeToVolunteer = {
  would_you_volunteer: {
    'ui:widget': 'radio',
  },
}