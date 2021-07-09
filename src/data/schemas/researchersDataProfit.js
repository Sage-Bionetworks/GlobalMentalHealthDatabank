export const schemaResearchersDataProfit = {
  type: 'object',
  properties: {
    researchersDataProfit: {
      title: ' ',
      type: 'object',
      properties: {
        researchersDataProfitOptions: {
          type: 'string',
          title: ' ',
          enum: [
            'Yes, my data can be used by researchers to make a profit.',
            'No, my data can NOT be used by researchers to make a profit.',
            "I don't care if my data is used by researchers to make a profit..",
          ],
        },
      },
    },
  },
}

export const uiSchemaResearchersDataProfit = {
  researchersDataProfit: {
    researchersDataProfitOptions: {
      'ui:widget': 'radio',
    },
  },
}
