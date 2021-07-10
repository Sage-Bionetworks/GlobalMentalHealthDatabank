import { RESEARCHERS_DATA_ACCESS } from '../../constants/constants'

export const schemaResearchersDataAccess = {
  type: 'object',
  properties: {
    researchersDataAccess: {
      type: 'string',
      title: ' ',
      enum: [
        RESEARCHERS_DATA_ACCESS.DOWNLOAD_THE_STUDY,
        RESEARCHERS_DATA_ACCESS.WILL_ONLY_VIEW_DATA,
        RESEARCHERS_DATA_ACCESS.WILL_RECEIVE_A_PRINT,
      ],
      uniqueItems: true,
    },
  },
}

export const uiSchemaResearchersDataAccess = {
  researchersDataAccess: {
    'ui:widget': 'radio',
  },
}
