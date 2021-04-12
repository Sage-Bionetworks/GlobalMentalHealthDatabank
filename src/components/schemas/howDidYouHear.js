export const schemaHowDidYouHear = {
  type: 'object',
  properties: {
    how_did_you_hear: {
      title: ' ',
      type: 'object',
      properties: {
        how_options: {
          type: 'number',
          title: ' ',
          enumNames: [
            'Social media advertisement',
            'School or University contact',
            'Referred by a friend',
            'Health clinic contact',
            'Paper flyer',
            'Web browser search',
            'Prefer not to say',
            'Other',
          ],
          enum: [0, 1, 2, 3, 4, 5, 6, 7],
        },
      },
    },
  },
}

export const uiSchemaHowDidYouHear = {
  how_did_you_hear: {
    how_options: {
      'ui:widget': 'radio',
    },
  },
}
