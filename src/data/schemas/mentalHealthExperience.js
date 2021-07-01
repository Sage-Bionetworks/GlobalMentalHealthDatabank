import { MENTAL_HEALTH_EXPERIENCE } from '../../constants/constants'

export const schemaMentalHealthExperience = {
  type: 'object',
  properties: {
    mentalHealthExperience: {
      type: 'array',
      title: ' ',
      items: {
        type: 'string',
        enum: [
          MENTAL_HEALTH_EXPERIENCE.HAS_INTERFERED,
          MENTAL_HEALTH_EXPERIENCE.RECEIVED_SUPPORT,
          MENTAL_HEALTH_EXPERIENCE.COULD_BENEFIT,
          MENTAL_HEALTH_EXPERIENCE.NOT_EXPERIENCED,
        ],
      },
      uniqueItems: true,
    },
  },
}

export const uiSchemaMentalHealthExperience = {
  mentalHealthExperience: {
    'ui:widget': 'checkboxes',
  },
}
