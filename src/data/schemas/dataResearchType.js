import { DATA_RESEARCH_TYPE } from '../../constants/constants'

export const schemaDataResearchType = {
  type: 'object',
  properties: {
    dataResearchType: {
      type: 'string',
      title: ' ',
      enum: [
        DATA_RESEARCH_TYPE.HEALTH_RESEARCH,
        DATA_RESEARCH_TYPE.MENTAL_HEALTH_RESEARCH,
        DATA_RESEARCH_TYPE.ALL_KIND_RESEARCH,
      ],
      uniqueItems: true,
    },
  },
}

export const uiSchemaDataResearchType = {
  dataResearchType: {
    'ui:widget': 'radio',
  },
}
