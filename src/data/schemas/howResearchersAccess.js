export const schemaHowResearchersAccess = {
  type: 'object',
  properties: {
    how_researchers_access: {
      type: 'string',
      title: ' ',
      enum: [
        'Researchers should be allowed to download a copy of my data.',
        'Researchers should have to ask a data steward to run an analysis of my data and return the results to them.',
        'Researchers should only be allowed to see my data in a secure server, but cannot download my data.',
      ],
    },
  },
}

export const uiSchemaHowResearchersAccess = {
  how_researchers_access: {
    'ui:widget': 'radio',
  },
}
