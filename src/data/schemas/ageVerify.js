import React from 'react'

export const schemaAgeVerify = {
  type: 'string',
}

export const uiSchemaAgeVerify = {
  'ui:widget': props => {
    return (
      <input
        type="number"
        placeholder="Input Age..."
        className="age-input"
        value={props.value}
        required={props.required}
        onChange={event => props.onChange(event.target.value)}
      />
    )
  },
}
