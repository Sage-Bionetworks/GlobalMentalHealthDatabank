export const schemaHowResearchersAccess = {
  type: 'object',
  properties: {
    how_researchers_access: {
      type: 'string',
      title: ' ',
      enum: [
        'Researchers should be allowed to download a copy (like onto a USB).',
        'Researchers should only be allowed to access the data in a secure server (like how you watch movies on Netflix or Hotstar).',
        'Researchers should only be allowed to see a recreated data set, not the real data. If researchers want to study the real data set, they have to ask the data steward to run their analysis for them. The steward only gives the researcher back the result, not the data. ',
      ],
    },
  },
}

export const uiSchemaHowResearchersAccess = {
  how_researchers_access: {
    'ui:widget': 'radio',
  },
}
