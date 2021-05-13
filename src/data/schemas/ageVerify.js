import React from 'react'

export const schemaAgeVerify = {
  type: 'string',
}

export const uiSchemaAgeVerify = {
  'ui:widget': props => {
    return (
      <input
        type="number"
        min="0"
        placeholder="Input Age..."
        className="custom-input age"
        value={props.value}
        required={props.required}
        onChange={event => props.onChange(event.target.value)}
      />
    )
  },
}
