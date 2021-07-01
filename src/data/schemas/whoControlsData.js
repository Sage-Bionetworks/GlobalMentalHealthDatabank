export const schemaWhoControlsData = {
  type: 'object',
  properties: {
    who_controls_data: {
      type: 'string',
      title: ' ',
      enumNames: [
        '<strong>Democracy</strong> <p> Study participants should vote on how researchers can use the study data. </p>',
        '<strong>Volunteer community review panel</strong> <p> A group of volunteer study participants should control use of the study data. </p>',
        '<strong>Professional review panel</strong> <p> A group of participants paid by the funder of the databank should control use of the study data </p>',
      ],
      enum: [
        'Democracy',
        'Volunteer community review panel',
        'Professional review panel',
      ],
    },
  },
}

export const uiSchemaWhoControlsData = {
  who_controls_data: {
    'ui:widget': 'radio',
  },
}
