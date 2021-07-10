import { RESEARCHERS_DATA_USAGE } from '../../constants/constants'

export const schemaResearchersDataUsage = {
  type: 'object',
  properties: {
    researchersDataUsage: {
      type: 'string',
      title: ' ',
      enum: [
        RESEARCHERS_DATA_USAGE.RESEARCHERS_WILL_DECIDE,
        RESEARCHERS_DATA_USAGE.STUDY_PARTICIPANTS_DECIDE,
        RESEARCHERS_DATA_USAGE.GOVERMENT_DECIDE,
      ],
      uniqueItems: true,
    },
  },
}

export const uiSchemaResearchersDataUsage = {
  researchersDataUsage: {
    'ui:widget': 'radio',
  },
}
